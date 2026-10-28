<?php
/**
 * RVR Imperial EXIM — optional PHP mail handler for cPanel / PHP hosting.
 * To use it: set  formProvider: 'php'  in assets/js/config.js.
 * Sends every submission to BOTH addresses below. For best deliverability,
 * create the mailbox no-reply@rvrimperial.com in cPanel (or use SMTP).
 */
header('Content-Type: application/json; charset=utf-8');

$TO   = 'info@rvrimperial.com, rupali.jahagirdar@rvrimperial.com';
$FROM = 'no-reply@rvrimperial.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}
// Honeypot
if (!empty($_POST['_honey'])) { echo json_encode(['success' => true]); exit; }

$clean = function ($v) { return trim(str_replace(["\r", "\n"], ' ', strip_tags((string)$v))); };

$subject = $clean($_POST['_subject'] ?? 'New website enquiry — rvrimperial.com');
$email   = filter_var($_POST['Email'] ?? '', FILTER_VALIDATE_EMAIL);

$lines = [];
foreach ($_POST as $key => $value) {
    if ($key === '' || $key[0] === '_') continue;
    $lines[] = $clean($key) . ': ' . trim(strip_tags((string)$value));
}
if (count($lines) < 2) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Empty submission']);
    exit;
}
$body  = "New enquiry from www.rvrimperial.com\n\n" . implode("\n", $lines) . "\n";
$headers  = "From: RVR Imperial EXIM Website <{$FROM}>\r\n";
if ($email) $headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$ok = @mail($TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
http_response_code($ok ? 200 : 500);
echo json_encode(['success' => (bool)$ok]);
