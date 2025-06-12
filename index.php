<?php
/*
    index.php
    ----------------------------------------------------------------------------
    Entry point for the eCompass web application.
    - Handles test mode for local development.
    - Integrates with WordPress for authentication and user role management.
    - Sets session and local storage variables for user info and access level.
    - Loads initial JavaScript for application startup.
    ----------------------------------------------------------------------------
*/

// Enable test mode by setting this to true
$test_mode = true; // Set to true for test mode

header("Access-Control-Allow-Origin: *");
session_start();

$user_data = [
    "mode" => $test_mode ? "test" : "prod"
];

if ($test_mode) {
    // Test credentials and data for local development
    $user_data["full_name"] = "Caolán Maguire";
    $user_data["logged_user_email"] = "caolan.maguire@combilift.com";
    $user_data["access_level"] = "8";
    $user_data["language"] = "English";
    $user_data["server_path"] = "http://localhost:8000";

    // Set PHP session variables for verification and access level
    $_SESSION["verify"] = "True";
    $_SESSION["TrueAccessLevel"] = $user_data["access_level"];

    // Output user data as a JSON script tag
    echo '<script id="user-data" type="application/json">'.json_encode($user_data).'</script>';

    sleep(1);

    // Load main JavaScript module
    echo '<script type="module" src="assets/js/InitialStart/on-startup.js" defer></script>';

    // Optionally, return or exit to prevent running the rest of the code
    return;
}

// Include WordPress and path configuration
include_once('../wp-load.php');
include_once('includes/Path.php');

/**
 * Returns the user's access level based on their WordPress roles and email.
 */
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

    if (strpos($user_roles_raw, $string_kb) == true) {
        if (strpos($user_email_test, $string_combi) == true) {
            $user_roles = '7';
        } else {
            $user_roles = '6';
        }
    } else {
        $user_roles = '0';
    }

    return $user_roles;
}

// Check if user is logged in to WordPress CMS
if (!is_user_logged_in()) {
    header('location: https://support.combilift.net/login-selection/');
} else {
    global $current_user;
    $current_user = wp_get_current_user();
    $full_name = $current_user->first_name . ' ' . $current_user->last_name;
    $logged_user_email = $current_user->user_email;
    $WebPath = isset($WebPath) ? $WebPath : '';

    // Prepare user data for JS
    $user_data["full_name"] = $full_name;
    $user_data["logged_user_email"] = $logged_user_email;
    $user_data["server_path"] = $WebPath;
    $user_data["language"] = "English";
    if (
        $logged_user_email == "caolan.maguire@combilift.com" ||
        $logged_user_email == "andrew.moffett@combilift.com" ||
        $logged_user_email == "antonio.patacho@combilift.com"
    ) {
        $user_data["access_level"] = "8";
    } else {
        $user_data["access_level"] = display_user_roles();
    }

    // Set PHP session variables for verification and access level
    $_SESSION["verify"] = "True";
    $_SESSION["TrueAccessLevel"] = $user_data["access_level"];

    // Output user data as a JSON script tag
    echo '<script id="user-data" type="application/json">'.json_encode($user_data).'</script>';

    // Load main JavaScript module
    echo '<script type="module" src="assets/js/InitialStart/OnStartup.js"></script>';
}
?>