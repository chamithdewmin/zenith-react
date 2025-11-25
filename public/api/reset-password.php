<?php
require_once 'auth-config.php';

header('Access-Control-Allow-Origin: https://zenithscs.com.au');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (empty($data['email']) || empty($data['new_password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email and new password required']);
    exit();
}

$email = sanitizeInput($data['email']);
$new_password = $data['new_password'];

// Validate password strength
if (strlen($new_password) < 8) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters long']);
    exit();
}

$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$dbuser = 'u931987027_zenithscs';
$dbpass = 'Zenith2025@#!';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Find user by email
    $stmt = $pdo->prepare("SELECT id FROM admin_users WHERE email = ? AND is_active = TRUE LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit();
    }

    // Verify that OTP was used (verified) within last 10 minutes
    $stmt = $pdo->prepare("SELECT id FROM password_resets WHERE user_id = ? AND used = 1 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1");
    $stmt->execute([$user['id']]);
    $otpRecord = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$otpRecord) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'OTP verification required. Please verify your OTP first.']);
        exit();
    }

    // Update password
    $hash = hashPassword($new_password);
    $stmt = $pdo->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?");
    $stmt->execute([$hash, $user['id']]);

    // Clean up old password reset records for this user
    $stmt = $pdo->prepare("DELETE FROM password_resets WHERE user_id = ?");
    $stmt->execute([$user['id']]);

    echo json_encode(['success' => true, 'message' => 'Password reset successful']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
    error_log('reset-password error: ' . $e->getMessage());
}

?>
