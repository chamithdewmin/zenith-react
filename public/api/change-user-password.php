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

startSecureSession();
requireAdmin();

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (empty($data['id']) || empty($data['new_password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'User ID and new password required']);
    exit();
}

$id = intval($data['id']);
$new_password = $data['new_password'];

$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$dbuser = 'u931987027_zenithscs';
$dbpass = 'Zenith2025@#!';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $hash = hashPassword($new_password);
    $stmt = $pdo->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?");
    $stmt->execute([$hash, $id]);

    echo json_encode(['success' => true, 'message' => 'Password updated']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
    error_log('change-user-password error: ' . $e->getMessage());
}

?>
