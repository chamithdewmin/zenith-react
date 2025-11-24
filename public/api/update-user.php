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

if (empty($data['id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit();
}

$id = intval($data['id']);
$name = isset($data['name']) ? sanitizeInput($data['name']) : null;
$email = isset($data['email']) ? sanitizeInput($data['email']) : null;
$role = isset($data['role']) && in_array($data['role'], ['admin','user']) ? $data['role'] : null;

$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$dbuser = 'u931987027_zenithscs';
$dbpass = 'Zenith2025@#!';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $fields = [];
    $values = [];
    if ($name !== null) { $fields[] = 'full_name = ?'; $values[] = $name; }
    if ($email !== null) { $fields[] = 'email = ?'; $values[] = $email; }
    if ($role !== null) { $fields[] = 'role = ?'; $values[] = $role; }

    if (count($fields) === 0) {
        echo json_encode(['success' => false, 'message' => 'No fields to update']);
        exit();
    }

    $values[] = $id;
    $sql = "UPDATE admin_users SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($values);

    echo json_encode(['success' => true, 'message' => 'User updated']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
    error_log('update-user error: ' . $e->getMessage());
}

?>
