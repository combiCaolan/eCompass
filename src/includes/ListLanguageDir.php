<script>
	list = [];
	res = 'API-1';
</script>

<?php
	$ApiPath =  "<script>document.writeln(sessionStorage.getItem('APIV'));</script>";

	$FinalPath = '../Settings-files/' . $ApiPath;	

	echo"<script> TruckDefaultDir = []; </script>";
	if ($handle = opendir('../Settings-files/API-1/')) {
	    while (false !== ($entry = readdir($handle))) {
	        if ($entry != "." && $entry != "..") {
			if($entry !== 'index.php'){
		    		echo "<script> list.push('" . $entry . "');</script>";
			}
       	 }
    	}
	    closedir($handle);
	}
?>