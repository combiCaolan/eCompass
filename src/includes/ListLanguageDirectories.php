<?php
/*
    ListLanguageDir.php
    ----------------------------------------------------------------------------
    Scans the language directory for a specific API (default: API-1) and exposes
    the available language files to the frontend via a JavaScript array.
    This script is used to dynamically populate language file options in the UI.
    ----------------------------------------------------------------------------
*/

echo "
<script>
    // Initialize an empty list to hold language files and set default API
    list = [];
    res = 'API-1';
</script>";


    // Attempt to get the API path from sessionStorage (not effective server-side)
    $ApiPath =  "<script>document.writeln(sessionStorage.getItem('APIV'));</script>";

    // Build the final path to the API's language directory
    $FinalPath = '../Settings-files/' . $ApiPath;    

    // Initialize a JavaScript array for truck default directories
    echo"<script> TruckDefaultDir = []; </script>";

    // Open the default API-1 directory and list its files
    if ($handle = opendir('../Settings-files/API-1/')) {
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                if($entry !== 'index.php'){
                    // Add each valid entry to the JS list array
                    echo "<script> list.push('" . $entry . "');</script>";
                }
            }
        }
        closedir($handle);
    }
?>