<?php
require_once 'auth-config.php';

// Enable CORS
header('Access-Control-Allow-Origin: https://zenithscs.com.au');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Require authentication
requireAuth();

// Database configuration - SAME AS contact.php
$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$username = 'u931987027_zenithscs';
$password = 'Zenith2025@#!';

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Optional: Add basic authentication check
    // You can add Bearer token validation here for security
    
    // Get query parameters for pagination and search
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    
    $offset = ($page - 1) * $limit;
    
    // Build query with search
    if (!empty($search)) {
        $sql = "SELECT id, name as sender, email, phone, subject, message, created_at as date 
                FROM contact_submissions 
                WHERE name LIKE :search 
                OR email LIKE :search 
                OR subject LIKE :search 
                OR message LIKE :search
                ORDER BY created_at DESC 
                LIMIT :limit OFFSET :offset";
        $stmt = $pdo->prepare($sql);
        $searchTerm = "%{$search}%";
        $stmt->bindParam(':search', $searchTerm, PDO::PARAM_STR);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    } else {
        $sql = "SELECT id, name as sender, email, phone, subject, message, created_at as date 
                FROM contact_submissions 
                ORDER BY created_at DESC 
                LIMIT :limit OFFSET :offset";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    }
    
    $stmt->execute();
    $emails = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Get total count for pagination
    if (!empty($search)) {
        $countSql = "SELECT COUNT(*) as total FROM contact_submissions 
                     WHERE name LIKE :search 
                     OR email LIKE :search 
                     OR subject LIKE :search 
                     OR message LIKE :search";
        $countStmt = $pdo->prepare($countSql);
        $countStmt->bindParam(':search', $searchTerm, PDO::PARAM_STR);
    } else {
        $countSql = "SELECT COUNT(*) as total FROM contact_submissions";
        $countStmt = $pdo->prepare($countSql);
    }
    
    $countStmt->execute();
    $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Format dates
    foreach ($emails as &$email) {
        $email['date'] = date('Y-m-d', strtotime($email['date']));
        $email['id'] = (int)$email['id'];
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $emails,
        'total' => (int)$totalCount,
        'page' => $page,
        'limit' => $limit,
        'totalPages' => ceil($totalCount / $limit)
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
