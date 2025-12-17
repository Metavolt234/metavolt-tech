<?php
// Allow CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    // Extract form data
    $name = htmlspecialchars($data['name'] ?? '');
    $email = htmlspecialchars($data['email'] ?? '');
    $phone = htmlspecialchars($data['phone'] ?? '');
    $service = htmlspecialchars($data['service'] ?? 'General Inquiry');
    $date = htmlspecialchars($data['date'] ?? 'Not specified');
    $message = htmlspecialchars($data['message'] ?? 'No additional message');
    
    // Validation
    if (empty($name) || empty($email) || empty($phone)) {
        echo json_encode(['success' => false, 'error' => 'All required fields must be filled']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit;
    }
    
    // Email settings
    $to = "nelsonsabastian94@gmail.com";
    $subject = "New Appointment Request: $name - Nzuri Care";
    
    $body = "
============================================
NEW APPOINTMENT REQUEST - NZURI CARE LLC
============================================

CONTACT INFORMATION:
-------------------
Name: $name
Email: $email
Phone: $phone
Service: $service
Preferred Date: $date

MESSAGE:
--------
$message

ADDITIONAL INFO:
----------------
IP Address: {$_SERVER['REMOTE_ADDR']}
Request Time: " . date('F j, Y, g:i a') . "
User Agent: {$_SERVER['HTTP_USER_AGENT']}

============================================
Please respond to this inquiry within 24 hours.
    ";
    
    // Email headers
    $headers = "From: Nzuri Care Website <website@nzuricare.com>\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Send email
    if (mail($to, $subject, $body, $headers)) {
        // Also save to a local file for backup
        $logData = [
            'timestamp' => date('Y-m-d H:i:s'),
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'service' => $service,
            'date' => $date
        ];
        file_put_contents('form-submissions.log', json_encode($logData) . "\n", FILE_APPEND);
        
        echo json_encode(['success' => true, 'message' => 'Appointment request sent successfully!']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to send email. Please check server configuration.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method. Use POST.']);
}
?>