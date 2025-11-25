<?php
/**
 * Brevo Email Test Script
 * Use this to test if Brevo is working correctly
 * 
 * Access: https://zenithscs.com.au/api/test-brevo.php
 * 
 * IMPORTANT: Delete this file after testing for security
 */

$apiKey = 'GHsPYBg4m2x08FcA';
$apiUrl = 'https://api.brevo.com/v3/smtp/email';

// Test email - CHANGE THIS TO YOUR EMAIL
$testEmail = 'logozodev@gmail.com'; // Change to your email for testing

$payload = [
    'sender' => [
        'name' => 'Zenith Test',
        'email' => 'logozodev@gmail.com'
    ],
    'to' => [
        [
            'email' => $testEmail,
            'name' => 'Test User'
        ]
    ],
    'subject' => 'Brevo Test Email',
    'htmlContent' => '<h1>Test Email</h1><p>If you receive this, Brevo is working!</p>',
    'textContent' => 'Test Email - If you receive this, Brevo is working!',
    'replyTo' => [
        'email' => 'logozodev@gmail.com',
        'name' => 'Zenith Test'
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'api-key: ' . $apiKey
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

header('Content-Type: application/json');

$result = [
    'http_code' => $httpCode,
    'curl_error' => $error ?: null,
    'response' => json_decode($response, true),
    'raw_response' => $response,
    'success' => ($httpCode === 201)
];

echo json_encode($result, JSON_PRETTY_PRINT);

?>

