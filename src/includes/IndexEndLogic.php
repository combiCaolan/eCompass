<?php
	$dir = "Settings-files";
	echo "<script> APIAvailableToUsers = []; </script>";
	// Open a directory, and read its contents
	if (is_dir($dir)){
		if ($dh = opendir($dir)){
			while (($file = readdir($dh)) !== false){
				if($file == '.' || $file == '..' || $file == ''){
				}else{
					echo "<script>APIAvailableToUsers.push('" . $file . "'); </script>";
				}
			}
			closedir($dh);
		}
	}
	echo "<script>returntimes = APIAvailableToUsers.length; counter = 0; while(counter != returntimes){ console.log('return ' + returntimes); console.log('counter ' + counter); link = document.createElement('a'); link.innerHTML = APIAvailableToUsers[counter]; link.setAttribute('onclick','ApiOnChange(`' + APIAvailableToUsers[counter] + '`)'); document.getElementById('APIListArea').appendChild(link); counter++; }</script>";

	$dir = "Settings-files/API-2/";
	echo "<script> LanguageFilesAvailableUnderCLP = []; </script>";
	// Open a directory, and read its contents
	if (is_dir($dir)){
		if ($dh = opendir($dir)){
			while (($file = readdir($dh)) !== false){
				if($file == '.' || $file == '..' || $file == '' || $file == 'notes.txt'){
				}else{
					echo "<script>LanguageFilesAvailableUnderCLP.push('" . $file . "'); </script>";
				}
			}
			closedir($dh);
		}
	}
	echo "<script>returntimes = LanguageFilesAvailableUnderCLP.length; counter = 0; while(counter != returntimes){ link = document.createElement('a'); link.innerHTML = LanguageFilesAvailableUnderCLP[counter]; link.setAttribute('href','#'); document.getElementById('LanguageList').appendChild(link); counter++; }</script>";
?>