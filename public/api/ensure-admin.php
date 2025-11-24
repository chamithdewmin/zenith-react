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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Simple safety confirmation for one-off run
$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!isset($data['confirm']) || $data['confirm'] !== 'RUN') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Confirmation missing. Send {"confirm":"RUN"}.']);
    exit();
}

$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$db_username = 'u931987027_zenithscs';
$db_password = 'Zenith2025@#!';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $db_username, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255),
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        role ENUM('admin','user') DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        is_active BOOLEAN DEFAULT TRUE,
        INDEX idx_username (username),
        INDEX idx_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $username = 'zenithlog';
    $passwordHash = hashPassword('zenith@#!132');
    $email = 'logozodev@gmail.com';
    $full_name = 'Administrator';

    $stmt = $pdo->prepare('SELECT id FROM admin_users WHERE username = ?');
    $stmt->execute([$username]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        $upd = $pdo->prepare('UPDATE admin_users SET password_hash = ?, role = ?, is_active = 1 WHERE id = ?');
        $upd->execute([$passwordHash, 'admin', $existing['id']]);
        echo json_encode(['success' => true, 'message' => 'Admin user updated', 'username' => $username]);
    } else {
        $ins = $pdo->prepare('INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active) VALUES (?, ?, ?, ?, ?, 1)');
        $ins->execute([$username, $email, $passwordHash, $full_name, 'admin']);
        echo json_encode(['success' => true, 'message' => 'Admin user created', 'username' => $username]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
    error_log('ensure-admin error: ' . $e->getMessage());
}
?>
