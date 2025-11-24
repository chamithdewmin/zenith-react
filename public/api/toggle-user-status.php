<?php
require_once 'auth-config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://zenithscs.com.au');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Require admin privileges
requireAdmin();

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'User ID is required']);
        exit;
    }
    
    $userId = intval($input['id']);
    
    // Get current status
    $stmt = $pdo->prepare("SELECT is_active, role FROM admin_users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit;
    }
    
    // Toggle the status
    $newStatus = $user['is_active'] ? 0 : 1;
    
    $stmt = $pdo->prepare("UPDATE admin_users SET is_active = ? WHERE id = ?");
    $stmt->execute([$newStatus, $userId]);
    
    echo json_encode([
        'success' => true,
        'message' => $newStatus ? 'User activated successfully' : 'User blocked successfully',
        'is_active' => (bool)$newStatus
    ]);
    
} catch (Exception $e) {
    error_log("Toggle user status error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error occurred']);
}
