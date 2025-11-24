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

if (empty($data['username']) || empty($data['password']) || empty($data['name']) || empty($data['email']) || empty($data['role'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit();
}

$username = sanitizeInput($data['username']);
$email = sanitizeInput($data['email']);
$name = sanitizeInput($data['name']);
$role = in_array($data['role'], ['admin','user']) ? $data['role'] : 'user';
$password = $data['password'];

$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$dbuser = 'u931987027_zenithscs';
$dbpass = 'Zenith2025@#!';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check existing username or email
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM admin_users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    if ($stmt->fetchColumn() > 0) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
        exit();
    }

    $hash = hashPassword($password);
    $stmt = $pdo->prepare("INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$username, $email, $hash, $name, $role]);

    echo json_encode(['success' => true, 'message' => 'User created']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
    error_log('create-user error: ' . $e->getMessage());
}

?>
