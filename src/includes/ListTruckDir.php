<?php
	echo"<script> TruckDefaultDir = []; </script>";
	if ($handle = opendir('../src/truck-default-files')) {
	    while (false !== ($entry = readdir($handle))) {
	        if ($entry != "." && $entry != "..") {
			if($entry !== 'index.php'){
		    		echo"<script> TruckDefaultDir.push('" . $entry . "')</script>";
			}
       	 }
    	}
	    closedir($handle);
	}
?>