<?php

// Enable test mode by setting this to true
$test_mode = true; // Set to true for test mode

header("Access-Control-Allow-Origin: *");

session_start();

if ($test_mode) {
    // Test credentials and data
    $full_name = "Caolán Maguire";
    $logged_user_email = "caolan.maguire@combilift.com";
    $access_level = "8";

    echo"<script>sessionStorage.setItem('ServerPath','http://localhost:8000');</script>";

    echo '<script> sessionStorage.setItem("loggedinusername","' . $full_name . '"); sessionStorage.setItem("loggedinemail","' . $logged_user_email . '"); sessionStorage.setItem("AccessLevel","' . $access_level . '"); </script>';

    $_SESSION["verify"] = "True";
    $_SESSION["TrueAccessLevel"] = $access_level;
	echo ('<script> var AccessLevelForUser = "8"; sessionStorage.setItem("AccessLevel","8");</script>');
    echo ('<script src="assets/js/InitialStart/OnStartup.js"></script>');
    // Optionally, return or exit to prevent running the rest of the code
    return;
}

//include wordpress load file
include_once('../wp-load.php');
include_once('includes/Path.php');

//function to return user role
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

    if (strpos($user_roles_raw, $string_kb) == true){
        if (strpos($user_email_test, $string_combi) == true){
            $user_roles = '7';
        }else {
            $user_roles = '6';
        }   
    }else {
        $user_roles = '0';
    }   
    
    return $user_roles;
}

//Check if user is logged in to wordpress CMS
if (!is_user_logged_in()) {
    header('location: https://support.combilift.net/login-selection/');
} else {
    echo '<script> sessionStorage.setItem("ServerPatah","' . $WebPath . '"); </script>';
    global $current_user;
    $current_user = wp_get_current_user();
    $full_name = $current_user->first_name . ' ' . $current_user->last_name;
    $logged_user_email = $current_user->user_email;

    echo '<script> sessionStorage.setItem("loggedinusername","' . $full_name . '"); sessionStorage.setItem("loggedinemail","' . $logged_user_email . '"); </script>';

    if ($logged_user_email == "caolan.maguire@combilift.com" || $logged_user_email == "andrew.moffett@combilift.com" || $logged_user_email == "antonio.patacho@combilift.com") {
        echo ('<script> var AccessLevelForUser = "8"; sessionStorage.setItem("AccessLevel","8");</script>');
    } else {
        echo ('<script> var AccessLevelForUser = "' . display_user_roles() . '"; sessionStorage.setItem("AccessLevel","' . display_user_roles() . '");</script>');
    }   

    $_SESSION["verify"] = "True";
    $_SESSION["TrueAccessLevel"] = display_user_roles();
    echo ('<script src="assets/js/InitialStart/OnStartup.js"></script>');
}
?>