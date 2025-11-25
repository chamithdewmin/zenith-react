<?php
/**
 * Debug Email Sending
 * This will show detailed error information
 * 
 * Access: https://zenithscs.com.au/api/debug-email.php?email=your@email.com
 * 
 * IMPORTANT: Delete this file after debugging for security
 */

require_once 'auth-config.php';

header('Content-Type: application/json');

$testEmail = isset($_GET['email']) ? $_GET['email'] : 'logozodev@gmail.com';

if (empty($testEmail)) {
    echo json_encode(['error' => 'Please provide email parameter: ?email=your@email.com']);
    exit();
}

$subject = 'Test Email - Debug';
$body = '<h1>Test Email</h1><p>This is a test email from Brevo API.</p>';

$result = sendOTPEmail($testEmail, $subject, $body);

echo json_encode([
    'test_email' => $testEmail,
    'result' => $result,
    'timestamp' => date('Y-m-d H:i:s')
], JSON_PRETTY_PRINT);

?>

