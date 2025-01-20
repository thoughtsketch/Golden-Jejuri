<?php
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
        $to = "ppatil6131@gmail.com";  // Replace with your email
        $subject = "New Form Submission - $project";
        $body = "Name: $name\n" .
                "Email: $email\n" .
                "Mobile: $mobile\n" .
                "Project: $project\n" .
                "Source: $source\n";

        // Headers
        $headers = "From: info@codenamegoldenjejuri.com" . "\r\n";
        // $headers .= "Reply-To: ppatil6131@gmail.com" . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";

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
