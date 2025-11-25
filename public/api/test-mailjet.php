<?php
/**
 * Mailjet Email Test Script
 * Use this to test if Mailjet is working correctly
 * 
 * Access: https://zenithscs.com.au/api/test-mailjet.php
 * 
 * IMPORTANT: Delete this file after testing for security
 */

$apiKey = '0b73581ecf415db678c8e88c3eb47bab';
$apiSecret = 'a6edd4d55fe1432c5f0599dd480a15a6';
$apiUrl = 'https://api.mailjet.com/v3.1/send';

// Test email - CHANGE THIS TO YOUR EMAIL
$testEmail = 'logozodev@gmail.com'; // Change to your email for testing

$payload = [
    'Messages' => [
        [
            'From' => [
                'Email' => 'noreply@zenithscs.com.au', // Try this first
                'Name' => 'Zenith Test'
            ],
            'To' => [
                [
                    'Email' => $testEmail,
                    'Name' => 'Test User'
                ]
            ],
            'Subject' => 'Mailjet Test Email',
            'HTMLPart' => '<h1>Test Email</h1><p>If you receive this, Mailjet is working!</p>',
            'TextPart' => 'Test Email - If you receive this, Mailjet is working!'
        ]
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_USERPWD, $apiKey . ':' . $apiSecret);
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
    'raw_response' => $response
];

echo json_encode($result, JSON_PRETTY_PRINT);

?>

