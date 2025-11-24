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

// Send email using SMTP
function sendOTPEmail($to, $subject, $body, $fromName = 'Zenith Support', $fromEmail = 'logozodev@gmail.com') {
    $smtpHost = 'smtp.gmail.com';
    $smtpPort = 587;
    $smtpUsername = 'logozodev@gmail.com';
    $smtpPassword = 'csts jqmj rerg gmji';
    
    try {
        $socket = @fsockopen($smtpHost, $smtpPort, $errno, $errstr, 30);
        if (!$socket) {
            error_log("SMTP Connection failed: $errstr ($errno)");
            return false;
        }
        
        // Read greeting
        $response = fgets($socket, 515);
        
        // Send EHLO
        fputs($socket, "EHLO " . $_SERVER['SERVER_NAME'] . "\r\n");
        $response = fgets($socket, 515);
        
        // Start TLS
        fputs($socket, "STARTTLS\r\n");
        $response = fgets($socket, 515);
        
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            error_log("SMTP TLS failed");
            fclose($socket);
            return false;
        }
        
        // Send EHLO again after TLS
        fputs($socket, "EHLO " . $_SERVER['SERVER_NAME'] . "\r\n");
        $response = fgets($socket, 515);
        
        // Authenticate
        fputs($socket, "AUTH LOGIN\r\n");
        $response = fgets($socket, 515);
        
        fputs($socket, base64_encode($smtpUsername) . "\r\n");
        $response = fgets($socket, 515);
        
        fputs($socket, base64_encode($smtpPassword) . "\r\n");
        $response = fgets($socket, 515);
        
        if (substr($response, 0, 3) !== '235') {
            error_log("SMTP Authentication failed: $response");
            fclose($socket);
            return false;
        }
        
        // Send MAIL FROM
        fputs($socket, "MAIL FROM: <{$fromEmail}>\r\n");
        $response = fgets($socket, 515);
        
        // Send RCPT TO
        fputs($socket, "RCPT TO: <{$to}>\r\n");
        $response = fgets($socket, 515);
        
        // Send DATA
        fputs($socket, "DATA\r\n");
        $response = fgets($socket, 515);
        
        // Generate unique message ID to prevent spam
        $messageId = '<' . md5(uniqid(time())) . '@zenithscs.com.au>';
        
        // Send headers and body with anti-spam measures
        $message = "From: {$fromName} <{$fromEmail}>\r\n";
        $message .= "To: {$to}\r\n";
        $message .= "Subject: {$subject}\r\n";
        $message .= "Message-ID: {$messageId}\r\n";
        $message .= "Date: " . date('r') . "\r\n";
        $message .= "MIME-Version: 1.0\r\n";
        $message .= "Content-Type: text/html; charset=UTF-8\r\n";
        $message .= "Content-Transfer-Encoding: 8bit\r\n";
        $message .= "X-Mailer: Zenith SCS\r\n";
        $message .= "X-Priority: 1\r\n";
        $message .= "Importance: High\r\n";
        $message .= "\r\n";
        $message .= $body . "\r\n";
        $message .= ".\r\n";
        
        fputs($socket, $message);
        $response = fgets($socket, 515);
        
        // Send QUIT
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        
        return true;
    } catch (Exception $e) {
        error_log("SMTP Error: " . $e->getMessage());
        return false;
    }
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
