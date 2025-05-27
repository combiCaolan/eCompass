<?php
	echo"<script> TruckDefaultDir = []; </script>";
	if ($handle = opendir('../Truck_Default_Files')) {
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