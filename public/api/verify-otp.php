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

if (empty($data['email']) || empty($data['otp'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email and OTP required']);
    exit();
}

$email = sanitizeInput($data['email']);
$otp = sanitizeInput($data['otp']);

$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$dbuser = 'u931987027_zenithscs';
$dbpass = 'Zenith2025@#!';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT pr.id, pr.user_id, pr.otp, pr.expires_at, pr.used FROM password_resets pr JOIN admin_users u ON pr.user_id = u.id WHERE u.email = ? ORDER BY pr.created_at DESC LIMIT 1");
    $stmt->execute([$email]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'No OTP found']);
        exit();
    }

    if ($row['used']) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'OTP already used']);
        exit();
    }

    if (time() > strtotime($row['expires_at'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'OTP expired']);
        exit();
    }

    if (!hash_equals($row['otp'], $otp)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid OTP']);
        exit();
    }

    // Mark used
    $stmt = $pdo->prepare("UPDATE password_resets SET used = 1 WHERE id = ?");
    $stmt->execute([$row['id']]);

    echo json_encode(['success' => true, 'message' => 'OTP verified']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
    error_log('verify-otp error: ' . $e->getMessage());
}

?>
