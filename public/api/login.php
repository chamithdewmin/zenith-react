<?php
require_once 'auth-config.php';

// Enable CORS
header('Access-Control-Allow-Origin: https://zenithscs.com.au');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

startSecureSession();

// Rate limiting
checkRateLimit($_SERVER['REMOTE_ADDR']);

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input - use username for admin login
if (empty($data['username']) || empty($data['password'])) {
    recordFailedAttempt();
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Username and password are required'
    ]);
    exit();
}

$login_username = sanitizeInput($data['username']);
$password = $data['password'];

// Database configuration
$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$db_username = 'u931987027_zenithscs';
$db_password = 'Zenith2025@#!';

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $db_username, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if admin users table exists, if not create it (add username column)
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
    
    // Check if default admin exists
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM admin_users");
    $stmt->execute();
    $count = $stmt->fetchColumn();
    
    // Create default admin if no users exist
    if ($count == 0) {
        $default_password_hash = hashPassword('zenith@#!132');
        $stmt = $pdo->prepare("INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute(['zenithlog', 'logozodev@gmail.com', $default_password_hash, 'Administrator', 'admin']);
    }
    
    // Fetch user from database by username
    $stmt = $pdo->prepare("SELECT id, username, email, password_hash, full_name, role, is_active FROM admin_users WHERE username = ?");
    $stmt->execute([$login_username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        recordFailedAttempt();
        
        // Add delay to prevent timing attacks
        sleep(1);
        
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password'
        ]);
        exit;
    }
    
    // Check if user account is blocked
    if (!$user['is_active']) {
        recordFailedAttempt();
        sleep(1);
        
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'Your account has been blocked. Please contact administrator.'
        ]);
        exit();
    }
    
    // Verify password
    if (!verifyPassword($password, $user['password_hash'])) {
        recordFailedAttempt();
        
        // Add delay to prevent timing attacks
        sleep(1);
        
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password'
        ]);
        exit();
    }
    
    // Successful login
    clearLoginAttempts();
    
    // Regenerate session ID to prevent session fixation
    session_regenerate_id(true);
    
    // Set session variables
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_id'] = $user['id'];
    $_SESSION['admin_username'] = $user['username'];
    $_SESSION['admin_email'] = $user['email'];
    $_SESSION['admin_name'] = $user['full_name'];
    $_SESSION['admin_role'] = $user['role'];
    $_SESSION['ip_address'] = $_SERVER['REMOTE_ADDR'];
    $_SESSION['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
    $_SESSION['last_activity'] = time();
    $_SESSION['created'] = time();
    
    // Update last login time
    $stmt = $pdo->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?");
    $stmt->execute([$user['id']]);
    
    // Generate CSRF token
    $csrf_token = generateCSRFToken();
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'name' => $user['full_name'],
            'role' => $user['role']
        ],
        'csrf_token' => $csrf_token
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error occurred'
    ]);
    error_log('Login error: ' . $e->getMessage());
}
?>
