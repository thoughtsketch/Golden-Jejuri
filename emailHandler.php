<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $mobile = isset($_POST['mobile']) ? htmlspecialchars($_POST['mobile']) : '';
    $project = isset($_POST['project']) ? htmlspecialchars($_POST['project']) : '';
    $source = isset($_POST['source']) ? htmlspecialchars($_POST['source']) : '';

    // Validate required fields
    if (empty($name) || empty($email) || empty($mobile) || empty($project) || empty($source)) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    // Email details
    $to = "info@codenamegoldenjejuri.com";  // Replace with your email
    $subject = "New Form Submission - $project";
    $body = "
    <html>
    <head>
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
                max-width: 600px;
                margin: auto;
                font-family: Arial, sans-serif;
            }
            th, td {
                text-align: left;
                padding: 8px;
                border: 1px solid #ddd;
            }
            th {
                background-color: #f4f4f4;
                font-weight: bold;
            }
            tr:nth-child(even) {
                background-color: #f9f9f9;
            }
            h2{
                text-align:center;
            }
        </style>
    </head>
    <body>
        <h2>New Enquiry</h2>
        <table>
            <tr>
                <th>Field</th>
                <th>Details</th>
            </tr>
            <tr>
                <td>Name</td>
                <td>$name</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>$email</td>
            </tr>
            <tr>
                <td>Mobile</td>
                <td>$mobile</td>
            </tr>
            <tr>
                <td>Project</td>
                <td>$project</td>
            </tr>
            <tr>
                <td>Source</td>
                <td>$source</td>
            </tr>
        </table>
    </body>
    </html>
    ";

    // Headers
    $headers = "From: sales@codenamegoldenjejuri.com" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Thank you for your submission!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: Unable to send your message. Please try again later."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
