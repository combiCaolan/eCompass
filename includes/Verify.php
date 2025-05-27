<?php
//Load Wordpress variables below and paths
// include_once('../wp-load.php');
include_once('../includes/Path.php');

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

// $current_user = wp_get_current_user();

$full_name = "Caolán";

$logged_user_email = "caolanmichaelmaguire@gmail.com";


return '';

//If user is not logged in redirect them
if (!is_user_logged_in()) {
	echo ('user is not logged in');
	//	#header('Location: ' . $WebPath . 'https://support.combilift.net/login-selection/'); // /wp-login.php?redirect_to=%2Fecompass%2F');
	#header('Location: https://support.combilift.net/login-selection/');
} else {

	$current_user = wp_get_current_user();

	$full_name = $current_user->first_name;

	$logged_user_email = $current_user->user_email;

	//Set session Variable with users email
	echo '<script> sessionStorage.setItem("loggedinusername","' . $full_name . '"); sessionStorage.setItem("loggedinemail","' . $logged_user_email . '"); </script>';

	if ($logged_user_email == "caolan.maguire@combilift.com" || $logged_user_email == "andrew.moffett@combilift.com" || $logged_user_email == "antonio.patacho@combilift.com") {
		echo ('<script> var AccessLevelForUser = "8"; sessionStorage.setItem("AccessLevel","8");</script>');
	} else {
		echo ('<script> var AccessLevelForUser = "' . display_user_roles() . '"; sessionStorage.setItem("AccessLevel","' . display_user_roles() . '");</script>');
	}
}



?>