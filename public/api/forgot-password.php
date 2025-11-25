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
        INDEX (user_id),
        INDEX (created_at)
    ) ENGINE=InnoDB CHARSET=utf8mb4");

    // Rate limiting: Check if user requested OTP in last 2 minutes
    $stmt = $pdo->prepare("SELECT created_at FROM password_resets WHERE user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 2 MINUTE) AND used = 0 ORDER BY created_at DESC LIMIT 1");
    $stmt->execute([$user['id']]);
    $recentRequest = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($recentRequest) {
        http_response_code(429);
        $waitTime = 120 - (time() - strtotime($recentRequest['created_at']));
        echo json_encode([
            'success' => false, 
            'message' => 'Please wait ' . ceil($waitTime) . ' seconds before requesting another OTP code.',
            'code' => 'RATE_LIMIT',
            'retry_after' => $waitTime
        ]);
        exit();
    }

    // Invalidate any previous unused OTPs for this user
    $stmt = $pdo->prepare("UPDATE password_resets SET used = 1 WHERE user_id = ? AND used = 0");
    $stmt->execute([$user['id']]);

    // Generate 6-digit OTP
    $otp = str_pad(strval(rand(0, 999999)), 6, '0', STR_PAD_LEFT);
    $expires = date('Y-m-d H:i:s', time() + 600); // 10 minutes

    // Insert new OTP (only one active OTP per user at a time)
    $stmt = $pdo->prepare("INSERT INTO password_resets (user_id, otp, expires_at) VALUES (?, ?, ?)");
    $stmt->execute([$user['id'], $otp, $expires]);

    // Send OTP via email with professional template (anti-spam optimized)
    $subject = 'Your Password Reset Code - Zenith Supply Chain Solutions';
    $userName = $user['full_name'] ? $user['full_name'] : $user['username'];
    $body = '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Password Reset Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 600px; width: 100%;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0A66FF; padding: 30px 20px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; line-height: 1.2;">Password Reset Request</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">Hello ' . htmlspecialchars($userName, ENT_QUOTES, 'UTF-8') . ',</p>
                            
                            <p style="margin: 0 0 25px; color: #555555; font-size: 15px; line-height: 1.6;">
                                We received a request to reset your password for your Zenith Supply Chain Solutions account. Use the verification code below to complete your password reset:
                            </p>
                            
                            <!-- OTP Box -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center" style="padding: 25px; background-color: #f8f9fa; border: 2px solid #0A66FF; border-radius: 8px;">
                                        <div style="font-size: 32px; font-weight: 700; color: #0A66FF; letter-spacing: 6px; font-family: \'Courier New\', Courier, monospace; line-height: 1.2;">
                                            ' . $otp . '
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 25px 0 15px; color: #666666; font-size: 14px; line-height: 1.6;">
                                <strong style="color: #333333;">This code will expire in 10 minutes.</strong> For your security, please do not share this code with anyone.
                            </p>
                            
                            <p style="margin: 0 0 20px; color: #666666; font-size: 14px; line-height: 1.6;">
                                If you did not request a password reset, please ignore this email. Your account remains secure and no changes have been made.
                            </p>
                            
                            <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #0A66FF;">Zenith Supply Chain Solutions Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 10px; color: #999999; font-size: 12px; line-height: 1.5;">
                                © ' . date('Y') . ' Zenith Supply Chain Solutions. All rights reserved.
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 11px; line-height: 1.5;">
                                This is an automated message. Please do not reply to this email.
                            </p>
                            <p style="margin: 10px 0 0; color: #999999; font-size: 11px;">
                                <a href="https://zenithscs.com.au" style="color: #0A66FF; text-decoration: none;">zenithscs.com.au</a>
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
    // Send OTP email
    $emailResult = sendOTPEmail($user['email'], $subject, $body);

    // Check if email was sent successfully
    if (!is_array($emailResult) || !isset($emailResult['success']) || !$emailResult['success']) {
        $errorMsg = isset($emailResult['error']) ? $emailResult['error'] : 'Failed to send email';
        error_log('OTP email send failed for ' . $user['email'] . '. Error: ' . $errorMsg);
        
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'message' => 'Failed to send email: ' . $errorMsg . '. Please try again or contact support.',
            'error_code' => isset($emailResult['httpCode']) ? $emailResult['httpCode'] : 'UNKNOWN'
        ]);
        exit();
    }

    echo json_encode(['success' => true, 'message' => 'OTP code has been sent to your email address.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
    error_log('forgot-password error: ' . $e->getMessage());
}

?>
