<?php
// Authentication Configuration
// This file contains security settings and helper functions

// Start session with secure settings
function startSecureSession() {
    if (session_status() === PHP_SESSION_NONE) {
        // Session security settings
        ini_set('session.cookie_httponly', 1);
        ini_set('session.cookie_secure', 1); // Only send cookie over HTTPS
        ini_set('session.use_strict_mode', 1);
        ini_set('session.cookie_samesite', 'Strict');
        ini_set('session.use_only_cookies', 1);
        
        // Regenerate session ID periodically
        session_start();
        
        // Regenerate session ID to prevent fixation attacks
        if (!isset($_SESSION['created'])) {
            $_SESSION['created'] = time();
        } else if (time() - $_SESSION['created'] > 1800) { // 30 minutes
            session_regenerate_id(true);
            $_SESSION['created'] = time();
        }
    }
}

// Check if user is authenticated
function isAuthenticated() {
    startSecureSession();
    
    // Check if user is logged in
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        return false;
    }
    
    // Check session timeout (2 hours)
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 7200)) {
        session_unset();
        session_destroy();
        return false;
    }
    
    // Update last activity timestamp
    $_SESSION['last_activity'] = time();
    
    // Verify IP address hasn't changed (security measure)
    if (isset($_SESSION['ip_address']) && $_SESSION['ip_address'] !== $_SERVER['REMOTE_ADDR']) {
        session_unset();
        session_destroy();
        return false;
    }
    
    return true;
}

// Require authentication (use in protected endpoints)
function requireAuth() {
    if (!isAuthenticated()) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Unauthorized. Please login.',
            'code' => 'AUTH_REQUIRED'
        ]);
        exit();
    }
}

// Hash password securely
function hashPassword($password) {
    return password_hash($password, PASSWORD_ARGON2ID, [
        'memory_cost' => 65536,
        'time_cost' => 4,
        'threads' => 3
    ]);
}

// Verify password
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// Rate limiting for login attempts
function checkRateLimit($identifier) {
    startSecureSession();
    
    $max_attempts = 5;
    $lockout_time = 900; // 15 minutes
    
    if (!isset($_SESSION['login_attempts'])) {
        $_SESSION['login_attempts'] = [];
    }
    
    // Clean old attempts
    $_SESSION['login_attempts'] = array_filter(
        $_SESSION['login_attempts'],
        function($timestamp) use ($lockout_time) {
            return (time() - $timestamp) < $lockout_time;
        }
    );
    
    // Check if locked out
    if (count($_SESSION['login_attempts']) >= $max_attempts) {
        $oldest_attempt = min($_SESSION['login_attempts']);
        $time_remaining = $lockout_time - (time() - $oldest_attempt);
        
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Too many login attempts. Please try again in ' . ceil($time_remaining / 60) . ' minutes.',
            'code' => 'RATE_LIMIT',
            'retry_after' => $time_remaining
        ]);
        exit();
    }
}

// Record failed login attempt
function recordFailedAttempt() {
    startSecureSession();
    
    if (!isset($_SESSION['login_attempts'])) {
        $_SESSION['login_attempts'] = [];
    }
    
    $_SESSION['login_attempts'][] = time();
}

// Clear login attempts on successful login
function clearLoginAttempts() {
    startSecureSession();
    $_SESSION['login_attempts'] = [];
}

// Sanitize input
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Generate CSRF token
function generateCSRFToken() {
    startSecureSession();
    
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    
    return $_SESSION['csrf_token'];
}

// Verify CSRF token
function verifyCSRFToken($token) {
    startSecureSession();
    
    if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid CSRF token',
            'code' => 'CSRF_INVALID'
        ]);
        exit();
    }
}

// Send email using Brevo (Sendinblue) API
function sendOTPEmail($to, $subject, $body, $fromName = 'Zenith Supply Chain Solutions', $fromEmail = null) {
    $apiKey = 'GHsPYBg4m2x08FcA';
    $apiUrl = 'https://api.brevo.com/v3/smtp/email';
    
    // Use sender email - Brevo verified email
    if ($fromEmail === null) {
        $fromEmail = 'logozodev@gmail.com'; // Use verified sender email
    }
    
    // Brevo API expects JSON payload
    $payload = [
        'sender' => [
            'name' => $fromName,
            'email' => $fromEmail
        ],
        'to' => [
            [
                'email' => $to,
                'name' => ''
            ]
        ],
        'subject' => $subject,
        'htmlContent' => $body,
        'textContent' => strip_tags($body),
        'replyTo' => [
            'email' => $fromEmail,
            'name' => $fromName
        ]
    ];
    
    // Log the payload for debugging (remove sensitive data in production)
    error_log("Brevo API Request - To: $to, From: $fromEmail");
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'api-key: ' . $apiKey,
        'Accept: application/json'
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    $curlInfo = curl_getinfo($ch);
    curl_close($ch);
    
    // Log detailed error information
    if ($error) {
        error_log("Brevo cURL Error: " . $error);
        return ['success' => false, 'error' => 'Connection error: ' . $error];
    }
    
    // Parse response
    $responseData = json_decode($response, true);
    
    // Log response for debugging
    error_log("Brevo Response - HTTP Code: $httpCode, Response: " . substr($response, 0, 1000));
    
    if ($httpCode === 201) {
        // Brevo returns 201 Created on success
        if (isset($responseData['messageId'])) {
            error_log("Brevo email sent successfully to: $to, Message ID: " . $responseData['messageId']);
            return ['success' => true, 'messageId' => $responseData['messageId']];
        }
        // Sometimes Brevo returns success without messageId
        if (empty($responseData) || (isset($responseData['messageId']) && $responseData['messageId'])) {
            error_log("Brevo email sent successfully to: $to");
            return ['success' => true];
        }
    }
    
    // Handle errors with detailed messages
    $errorMessage = 'Unknown error';
    if ($httpCode === 401) {
        $errorMessage = 'Authentication failed. Check API key.';
        error_log("Brevo Authentication failed. Check API key.");
    } elseif ($httpCode === 400) {
        if (isset($responseData['message'])) {
            $errorMessage = $responseData['message'];
        } elseif (isset($responseData['code'])) {
            $errorMessage = 'Bad Request: ' . $responseData['code'];
        } else {
            $errorMessage = 'Bad Request. Check sender email and payload.';
        }
        error_log("Brevo Bad Request: " . json_encode($responseData));
    } elseif ($httpCode === 402) {
        $errorMessage = 'Payment required. Check your Brevo account credits.';
        error_log("Brevo Payment required.");
    } elseif ($httpCode === 403) {
        $errorMessage = 'Forbidden. Check API permissions.';
        error_log("Brevo Forbidden.");
    } elseif ($httpCode === 404) {
        $errorMessage = 'API endpoint not found.';
        error_log("Brevo API endpoint not found.");
    } else {
        $errorMessage = "API error (HTTP $httpCode)";
        if (isset($responseData['message'])) {
            $errorMessage = $responseData['message'];
        }
        error_log("Brevo API failed. HTTP Code: $httpCode, Response: " . substr($response, 0, 1000));
    }
    
    return ['success' => false, 'error' => $errorMessage, 'httpCode' => $httpCode, 'response' => $responseData];
}

// Require admin role for certain endpoints
function requireAdmin() {
    startSecureSession();
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit();
    }
    if (!isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Forbidden']);
        exit();
    }
}
?>
