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

$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$dbuser = 'u931987027_zenithscs';
$dbpass = 'Zenith2025@#!';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prevent deleting self
    if (isset($_SESSION['admin_id']) && intval($_SESSION['admin_id']) === $id) {
        echo json_encode(['success' => false, 'message' => 'Cannot delete your own account']);
        exit();
    }

    // Prevent deleting admin role accounts
    $roleCheck = $pdo->prepare("SELECT role FROM admin_users WHERE id = ?");
    $roleCheck->execute([$id]);
    $target = $roleCheck->fetch(PDO::FETCH_ASSOC);
    if (!$target) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit();
    }
    if ($target['role'] === 'admin') {
        echo json_encode(['success' => false, 'message' => 'Cannot delete admin users. Block them instead.']);
        exit();
    }

    $stmt = $pdo->prepare("DELETE FROM admin_users WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true, 'message' => 'User deleted']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
    error_log('delete-user error: ' . $e->getMessage());
}

?>
