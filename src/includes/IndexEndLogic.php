<?php
/*
    IndexEndLogic.php
    ----------------------------------------------------------------------------
    Dynamically generates JavaScript arrays and UI links for available APIs and
    language files in the eCompass web application. This script:
    - Scans the "Settings-files" directory for available API versions and exposes
      them to the frontend via the APIAvailableToUsers JavaScript array.
    - Scans a specific API directory ("Settings-files/API-2/") for available
      language files, excluding certain files, and exposes them via the
      LanguageFilesAvailableUnderCLP JavaScript array.
    - Dynamically creates and appends <a> elements for each API and language file
      to the UI, allowing users to select them.
    ----------------------------------------------------------------------------
*/

// Scan the Settings-files directory for available APIs
$dir = "Settings-files";
echo "<script> APIAvailableToUsers = []; </script>";
if (is_dir($dir)){
    if ($dh = opendir($dir)){
        while (($file = readdir($dh)) !== false){
            if($file == '.' || $file == '..' || $file == ''){
                continue;
            }
            echo "<script>APIAvailableToUsers.push('" . $file . "'); </script>";
        }
        closedir($dh);
    }
}

// Render API links in the UI
echo "<script>
    returntimes = APIAvailableToUsers.length;
    counter = 0;
    while(counter != returntimes){
        console.log('return ' + returntimes);
        console.log('counter ' + counter);
        link = document.createElement('a');
        link.innerHTML = APIAvailableToUsers[counter];
        link.setAttribute('onclick','ApiOnChange(`' + APIAvailableToUsers[counter] + '`)');
        document.getElementById('APIListArea').appendChild(link);
        counter++;
    }
</script>";

// Scan a specific API directory for available language files
$dir = "Settings-files/API-2/";
echo "<script> LanguageFilesAvailableUnderCLP = []; </script>";
if (is_dir($dir)){
    if ($dh = opendir($dir)){
        while (($file = readdir($dh)) !== false){
            if($file == '.' || $file == '..' || $file == '' || $file == 'notes.txt'){
                continue;
            }
            echo "<script>LanguageFilesAvailableUnderCLP.push('" . $file . "'); </script>";
        }
        closedir($dh);
    }
}

// Render language file links in the UI
echo "<script>
    returntimes = LanguageFilesAvailableUnderCLP.length;
    counter = 0;
    while(counter != returntimes){
        link = document.createElement('a');
        link.innerHTML = LanguageFilesAvailableUnderCLP[counter];
        link.setAttribute('href','#');
        document.getElementById('LanguageList').appendChild(link);
        counter++;
    }
</script>";
?>