<?php
/*
    ListTruckDir.php
    ----------------------------------------------------------------------------
    Scans the truck default files directory and exposes the available truck
    directories/files to the frontend via a JavaScript array.
    This script is used to dynamically populate truck file options in the UI.
    ----------------------------------------------------------------------------
*/

// Initialize a JavaScript array for truck default directories
echo "<script> TruckDefaultDir = []; </script>";

// Open the truck-default-files directory and list its files/directories
if ($handle = opendir('../src/truck-default-files')) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            if ($entry !== 'index.php') {
                // Add each valid entry to the JS TruckDefaultDir array
                echo "<script> TruckDefaultDir.push('" . $entry . "')</script>";
            }
        }
    }
    closedir($handle);
}
?>