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

if (empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email required']);
    exit();
}

$email = sanitizeInput($data['email']);

$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$dbuser = 'u931987027_zenithscs';
$dbpass = 'Zenith2025@#!';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Find user by email
    $stmt = $pdo->prepare("SELECT id, email, username FROM admin_users WHERE email = ? AND is_active = TRUE");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Email not found']);
        exit();
    }

    // Create password_resets table
    $pdo->exec("CREATE TABLE IF NOT EXISTS password_resets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        otp VARCHAR(10) NOT NULL,
        expires_at DATETIME NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX (user_id)
    ) ENGINE=InnoDB CHARSET=utf8mb4");

    // Generate 6-digit OTP
    $otp = str_pad(strval(rand(0, 999999)), 6, '0', STR_PAD_LEFT);
    $expires = date('Y-m-d H:i:s', time() + 600); // 10 minutes

    $stmt = $pdo->prepare("INSERT INTO password_resets (user_id, otp, expires_at) VALUES (?, ?, ?)");
    $stmt->execute([$user['id'], $otp, $expires]);

    // Send OTP via email with professional template
    $subject = 'Your OTP Code - Zenith SCS';
    $body = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Your OTP Code</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px; color: #333333; font-size: 14px; line-height: 1.6;">Hello,</p>
                            
                            <p style="margin: 0 0 30px; color: #666666; font-size: 14px; line-height: 1.6;">
                                Your One-Time Password (OTP) for account verification is:
                            </p>
                            
                            <!-- OTP Box -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                                        <div style="font-size: 36px; font-weight: 700; color: #667eea; letter-spacing: 8px; font-family: \'Courier New\', monospace;">
                                            ' . $otp . '
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0 10px; color: #666666; font-size: 13px; line-height: 1.6;">
                                This OTP is valid for <strong style="color: #667eea;">2 minutes</strong>. Please do not share this code with anyone.
                            </p>
                            
                            <p style="margin: 0 0 20px; color: #666666; font-size: 13px; line-height: 1.6;">
                                If you didn\'t request this code, please ignore this email.
                            </p>
                            
                            <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
                                Thank you for using our service!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 10px; color: #999999; font-size: 12px;">
                                © 2024 Zenith SCS. All rights reserved.
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 11px;">
                                Powered by <a href="https://logozodev.com" style="color: #667eea; text-decoration: none; font-weight: 600;">LogozoDev</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    ';
    $sent = sendOTPEmail($user['email'], $subject, $body);

    // If mail fails, return OTP in response for testing (remove in production)
    if (!$sent) {
        error_log('OTP email send failed for ' . $user['email']);
        echo json_encode(['success' => true, 'message' => 'OTP generated (mail may not be configured)', 'otp' => $otp]);
        exit();
    }

    echo json_encode(['success' => true, 'message' => 'OTP sent to email']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
    error_log('forgot-password error: ' . $e->getMessage());
}

?>
