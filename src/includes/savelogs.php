<?php
/*
    savelogs.php
    ----------------------------------------------------------------------------
    Handles logging of user changes in the eCompass web application.
    - Checks if logging is active.
    - Verifies user authentication via WordPress.
    - Writes user changes to a log file in a user-specific directory under /Logs.
    - Creates directories as needed.
    - Redirects to the Download page after logging.
    ----------------------------------------------------------------------------
*/

include_once('../../wp-load.php');
include_once('Path.php');

$ActiveLogs = False; // Set to True to enable logging

if ($ActiveLogs == True) {
    if (!is_user_logged_in()) {
        // Redirect to login if user is not authenticated
        header('Location: ' . $WebPath . '/wp-login.php');
    } else {
        wp_get_current_user();
        global $current_user;
        echo $current_user->user_login;

        // Get the changes made from POST data
        $ChangesMade = stripslashes($_POST["ChangesValues"]);
        echo $ChangesMade;

        // Sanitize username for directory name
        $NotAloud = array(" ",".","@","php","combilift","com","txt","html");
        $UserLogDir = str_replace($NotAloud, "", $current_user->user_login);

        // Ensure /Logs and user directory exist, then write log
        if (is_dir('../../../../Logs/')) {
            if (is_dir('../../../../Logs/' . $UserLogDir)) {
                $myfile = fopen('../../../../Logs/' . $UserLogDir . '/log.txt', "a") or die("Unable to open file!");
                fwrite($myfile, stripslashes($ChangesMade));
                fclose($myfile);
            } else {
                mkdir('../../../../Logs/' . $UserLogDir);
                $myfile = fopen('../../../../Logs/' . $UserLogDir . '/log.txt', "w") or die("Unable to open file!");
                fwrite($myfile, stripslashes($ChangesMade));
                fclose($myfile);
            }
        } else {
            mkdir('../../../../Logs/');
            echo('Created Logging Directory');
            if (is_dir('../../../../Logs/' . $UserLogDir)) {
                $myfile = fopen('../../../../Logs/' . $UserLogDir . '/log.txt', "a") or die("Unable to open file!");
                fwrite($myfile, stripslashes($ChangesMade));
                fclose($myfile);
            } else {
                mkdir('../../../../Logs/' . $UserLogDir);
                $myfile = fopen('../../../../Logs/' . $UserLogDir . '/log.txt', "w") or die("Unable to open file!");
                fwrite($myfile, stripslashes($ChangesMade));
                fclose($myfile);
            }
        }
    }
} else {
    echo("Logging System Not Activated");
}

// Redirect to the Download page after logging
header('Location: ../Download.php');
?>