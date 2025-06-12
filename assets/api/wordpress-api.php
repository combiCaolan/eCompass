<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");

$test_mode = true; // Set to true for testing purposes, false for production

if ($test_mode) {
    // Return test user data for development/testing
    $user_data = [
        "full_name" => "Test User",
        "logged_user_email" => "test.user@example.com",
        "server_path" => "http://localhost:8000",
        "language" => "English",
        "access_level" => "8"
    ];
    echo json_encode($user_data);
    exit;
}

require_once('../wp-load.php'); // Adjust path as needed

function display_user_roles()
{
    $user_id = get_current_user_id();
    $user_info = get_userdata($user_id);
    $user_roles_raw = implode(' , ', $user_info->roles);
    $user_roles_all = explode(' , ', $user_roles_raw);
    $user_roles = $user_roles_all[0];

    $localcurrent_user = wp_get_current_user();
    $user_email_test = $localcurrent_user->user_email;

    $string_kb = "nowledgebase";
    $string_combi = "ombilift.";

    if (strpos($user_roles_raw, $string_kb) !== false) {
        if (strpos($user_email_test, $string_combi) !== false) {
            $user_roles = '7';
        } else {
            $user_roles = '6';
        }
    } else {
        $user_roles = '0';
    }

    return $user_roles;
}

if (!is_user_logged_in()) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

global $current_user;
$current_user = wp_get_current_user();
$full_name = $current_user->first_name . ' ' . $current_user->last_name;
$logged_user_email = $current_user->user_email;
$WebPath = isset($WebPath) ? $WebPath : '';
$user_data = [
    "full_name" => $full_name,
    "logged_user_email" => $logged_user_email,
    "server_path" => $WebPath,
    "language" => "English"
];

if (
    $logged_user_email == "caolan.maguire@combilift.com" ||
    $logged_user_email == "andrew.moffett@combilift.com" ||
    $logged_user_email == "antonio.patacho@combilift.com"
) {
    $user_data["access_level"] = "8";
} else {
    $user_data["access_level"] = display_user_roles();
}

echo json_encode($user_data);
exit;
?>