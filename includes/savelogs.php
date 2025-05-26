<?php
	include_once('../../wp-load.php');
	include_once('Path.php');

	$ActiveLogs = False;
	
	if($ActiveLogs == True){
		if(!is_user_logged_in()){
			header('Location: ' . $WebPath . '/wp-login.php');
		}else{
			wp_get_current_user();
			global $current_user;
			echo $current_user->user_login;
			$ChangesMade = stripslashes($_POST["ChangesValues"]);
			
			echo $ChangesMade;
			
			$NotAloud = array(" ",".","@","php","combilift","com","txt","html");
			$UserLogDir = str_replace($NotAloud,"",$current_user->user_login);
			if(is_dir('../../../../Logs/')){
				if(is_dir('../../../../Logs/' . $UserLogDir)){
					$myfile = fopen('../../../../Logs/' . $UserLogDir . '/' . "log.txt", "a") or die("Unable to open file!");
					fwrite($myfile, stripslashes($ChangesMade));
					fclose($myfile);
				}else{
					mkdir('../../../../Logs/' . $UserLogDir);
					$myfile = fopen('../../../../Logs/' . $UserLogDir . '/' . "log.txt", "w") or die("Unable to open file!");
					fwrite($myfile, stripslashes($ChangesMade));
					fclose($myfile);
				}
			}else{
				mkdir('../../../../Logs/');
				echo('Created Logging Directory');
				if(is_dir('../../../../Logs/' . $UserLogDir)){
					$myfile = fopen('../../../../Logs/' . $UserLogDir . '/' . "log.txt", "a") or die("Unable to open file!");
					fwrite($myfile, stripslashes($ChangesMade));
					fclose($myfile);
				}else{
					mkdir('../../../../Logs/' . $UserLogDir);
					$myfile = fopen('../../../../Logs/' . $UserLogDir . '/' . "log.txt", "w") or die("Unable to open file!");
					fwrite($myfile, stripslashes($ChangesMade));
					fclose($myfile);
				}
			}
		}
	}else{
		echo("Logging Sytem Not Activated");
	}
	
	header('Location: ../Download.php');
?>