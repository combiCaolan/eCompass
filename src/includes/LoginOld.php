<?php
	// session_start();
	// $_SESSION["ServerPath"] = "http://178.62.29.217";
	// echo'<script> sessionStorage.setItem("ServerPath","' . $_SESSION["ServerPath"] . '"); </script>';

	// include_once('../wp-load.php');

	// if(!is_user_logged_in()){
	// 	header('Location: '  . $_SESSION["ServerPath"] . ' /wp-login.php');
	// }else{
	// 	wp_get_current_user();
	// 	global $current_user;
	// 	echo'<script> sessionStorage.setItem("loggedinusername","' . $current_user->user_login . '"); </script>';

	// 	function display_user_roles() {
	// 		$user_id = get_current_user_id();
	// 		$user_info = get_userdata($user_id);
	// 		$user_roles = implode(' , ', $user_info->roles);
	// 		if($user_roles == 'control_systems' || $user_roles == 'administrator'){
	// 			$user_roles = '8';
	// 		}

	// 		if($user_roles == 'combilift'){
	// 			$user_roles = '7';
	// 		}

	// 		if($user_roles == 'dealer'){
	// 			$user_roles = '6';
	// 		}

	// 		if($user_roles == 'Manager' || $user_roles == 'contributor'){
	// 			$user_roles = '5';
	// 		}

	// 		if($user_roles == 'low_tech'){
	// 			$user_roles = '4';
	// 		}

	// 		if($user_roles == 'Operator_high'){
	// 			$user_roles = '3';
	// 		}

	// 		if($user_roles == 'Operator_std'){
	// 			$user_roles = '2';
	// 		}

	// 		if($user_roles == 'operator_low' || $user_roles == 'subscriber'){
	// 			$user_roles = '1';
	// 		}

	// 		if($user_roles == 'author' || $user_roles == 'generic_user'){
	// 			$user_roles = '0';
	// 		}
	// 		return $user_roles;
	// 	}

	// 	echo'<script> sessionStorage.setItem("AccessLevel","' . display_user_roles() . '"); </script> ';
	// 	$_SESSION["verify"] = "True";
	// 	$_SESSION["TrueAccessLevel"] = display_user_roles();

	// 	include_once('WebServerSide/VerifyCheck.php');
	// 	include_once('WebServerSide/ListTruckDir.php');
	// 	echo('<script> var AccessLevelForUser = "' . display_user_roles() . '";</script>');
	// }

?>