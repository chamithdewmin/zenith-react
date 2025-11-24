<?php
require_once 'auth-config.php';

// Enable CORS
header('Access-Control-Allow-Origin: https://zenithscs.com.au');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

startSecureSession();

if (isAuthenticated()) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'authenticated' => true,
        'user' => [
            'id' => $_SESSION['admin_id'] ?? null,
            'username' => $_SESSION['admin_username'] ?? null,
            'email' => $_SESSION['admin_email'] ?? null,
            'name' => $_SESSION['admin_name'] ?? null,
            'role' => $_SESSION['admin_role'] ?? null
        ],
        'csrf_token' => generateCSRFToken()
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'authenticated' => false,
        'message' => 'Not authenticated'
    ]);
}
?>
