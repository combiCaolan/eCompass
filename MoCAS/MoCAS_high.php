<?php

$dbservername = 'localhost';
$dbusername = 'uy32hp2gce6t3';
$dbpassword = 'a7wxwt3asg3e';
$dbname = "dbscnrqy755s5p";




$serial = $_POST["SerialNumber"];
$model = $_POST["Model"];
$username = $_POST["Username"];
$useremail = $_POST["Useremail"];
$access_level = $_POST["AccessLevel"];
$module_id = $_POST["IndexNumber"];
$module = $_POST["Module"];
$comments= $_POST["Comments"];
$timewindow_new = $_POST["TimeWindow"];
$hilevel = $_POST["HiLevel"];
$dispatch = $_POST["Dispatch"];


$timewindow_mix = 0;
$validation_code=1;

define("b0",  0x1); // 2^0
define("b1",  0x2); // 2^1
define("b2",  0x4); // 2^2
define("b3",  0x8); // 2^3
define("b4",  0x10); // 2^4
define("b5",  0x20); // 2^5
define("b6",  0x40); // 2^6
define("b7",  0x80); // 2^7
define("b8",  0x100); // 2^8
define("b9",  0x200); // 2^9
define("b10", 0x400); // 2^10
define("b11", 0x800); // 2^11
define("b12", 0x1000); // 2^12
define("b13", 0x2000); // 2^13
define("b14", 0x4000); // 2^14
define("b15", 0x8000); // 2^15
define("b16", 0x10000); // 2^16
define("b17", 0x20000); // 2^17
define("b18", 0x40000); // 2^18
define("b19", 0x80000); // 2^19
define("b20", 0x100000); // 2^20
define("b21", 0x200000); // 2^21
define("b22", 0x400000); // 2^22
define("b23", 0x800000); // 2^23
define("b24", 0x1000000); // 2^24
define("b25", 0x2000000); // 2^25
define("b26", 0x4000000); // 2^26
define("b27", 0x8000000); // 2^27
define("b28", 0x10000000); // 2^28
define("b29", 0x20000000); // 2^29
define("b30", 0x40000000); // 2^30
define("b31", 0x80000000); // 2^31

$serial_b0 = $serial & b0;
$serial_b1 = $serial & b1;
$serial_b2 = $serial & b2;
$serial_b3 = $serial & b3;
$serial_b4 = $serial & b4;
$serial_b5 = $serial & b5;
$serial_b6 = $serial & b6;
$serial_b7 = $serial & b7;
$serial_b8 = $serial & b8;
$serial_b9 = $serial & b9;
$serial_b10 = $serial & b10;
$serial_b11 = $serial & b11;
$serial_b12 = $serial & b12;
$serial_b13 = $serial & b13;
$serial_b14 = $serial & b14;
$serial_b15 = $serial & b15;
$serial_b16 = $serial & b16;
$serial_b17 = $serial & b17;
$serial_b18 = $serial & b18;
$serial_b19 = $serial & b19;
$serial_b20 = $serial & b20;
$serial_b21 = $serial & b21;
$serial_b22 = $serial & b22;
$serial_b23 = $serial & b23;
$serial_b24 = $serial & b24;
$serial_b25 = $serial & b25;
$serial_b26 = $serial & b26;
$serial_b27 = $serial & b27;
$serial_b28 = $serial & b28;
$serial_b29 = $serial & b29;
$serial_b30 = $serial & b30;
$serial_b31 = $serial & b31;

$module_b0 = $module_id & b0;
$module_b1 = $module_id & b1;
$module_b2 = $module_id & b2;
$module_b3 = $module_id & b3;
$module_b4 = $module_id & b4;
$module_b5 = $module_id & b5;
$module_b6 = $module_id & b6;
$module_b7 = $module_id & b7;
$module_b8 = $module_id & b8;
$module_b9 = $module_id & b9;
$module_b10 = $module_id & b10;
$module_b11 = $module_id & b11;
$module_b12 = $module_id & b12;
$module_b13 = $module_id & b13;
$module_b14 = $module_id & b14;
$module_b15 = $module_id & b15;
$module_b16 = $module_id & b16;
$module_b17 = $module_id & b17;
$module_b18 = $module_id & b18;
$module_b19 = $module_id & b19;
$module_b20 = $module_id & b20;
$module_b21 = $module_id & b21;
$module_b22 = $module_id & b22;
$module_b23 = $module_id & b23;
$module_b24 = $module_id & b24;
$module_b25 = $module_id & b25;
$module_b26 = $module_id & b26;
$module_b27 = $module_id & b27;
$module_b28 = $module_id & b28;
$module_b29 = $module_id & b29;
$module_b30 = $module_id & b30;
$module_b31 = $module_id & b31;


$validation_code = $validation_code + ($serial_b4 >> 3);
$validation_code = $validation_code + ($serial_b3 >> 1);
$validation_code = $validation_code + $module_b3;
$validation_code = $validation_code + ($module_b1 << 3);
$validation_code = $validation_code + ($serial_b2 << 3);
$validation_code = $validation_code + ($serial_b1 << 5);
$validation_code = $validation_code + ($module_b2 << 5);
$validation_code = $validation_code + ($module_b0 << 8);
$validation_code = $validation_code + ($serial_b0 << 9);
$validation_code = $validation_code + ($serial_b5 << 5);
$validation_code = $validation_code + ($module_b0 << 11);
$validation_code = $validation_code + ($module_b0 << 12);
$validation_code = $validation_code + b13;

// Creating the time window mixed value for the clp file

$timewindow_new_b0 = $timewindow_new & b0;
$timewindow_new_b1 = $timewindow_new & b1;
$timewindow_new_b2 = $timewindow_new & b2;
$timewindow_new_b3 = $timewindow_new & b3;
$timewindow_new_b4 = $timewindow_new & b4;
$timewindow_new_b5 = $timewindow_new & b5;
$timewindow_new_b6 = $timewindow_new & b6;
$timewindow_new_b7 = $timewindow_new & b7;
$timewindow_new_b8 = $timewindow_new & b8;
$timewindow_new_b9 = $timewindow_new & b9;
$timewindow_new_b10 = $timewindow_new & b10;
$timewindow_new_b11 = $timewindow_new & b11;
$timewindow_new_b12 = $timewindow_new & b12;
$timewindow_new_b13 = $timewindow_new & b13;
$timewindow_new_b14 = $timewindow_new & b14;
$timewindow_new_b15 = $timewindow_new & b15;
$timewindow_new_b16 = $timewindow_new & b16;
$timewindow_new_b17 = $timewindow_new & b17;
$timewindow_new_b18 = $timewindow_new & b18;
$timewindow_new_b19 = $timewindow_new & b19;
$timewindow_new_b20 = $timewindow_new & b20;
$timewindow_new_b21 = $timewindow_new & b21;
$timewindow_new_b22 = $timewindow_new & b22;
$timewindow_new_b23 = $timewindow_new & b23;
$timewindow_new_b24 = $timewindow_new & b24;
$timewindow_new_b25 = $timewindow_new & b25;
$timewindow_new_b26 = $timewindow_new & b26;
$timewindow_new_b27 = $timewindow_new & b27;
$timewindow_new_b28 = $timewindow_new & b28;
$timewindow_new_b29 = $timewindow_new & b29;
$timewindow_new_b30 = $timewindow_new & b30;
$timewindow_new_b31 = $timewindow_new & b31;


$timewindow_mix = $timewindow_mix + $timewindow_new_b0;
$timewindow_mix = $timewindow_mix + ($timewindow_new_b10 >> 9);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b9 >> 7);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b8 >> 5);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b7 >> 3);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b6 >> 1);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b5 << 1);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b4 << 3);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b3 << 5);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b2 << 7);
$timewindow_mix = $timewindow_mix + ($timewindow_new_b1 << 9);
$timewindow_mix = $timewindow_mix + $timewindow_new_b11 + $timewindow_new_b12 + $timewindow_new_b13 + $timewindow_new_b14 + $timewindow_new_b15;



// Create connection to database
//$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);
// Check connection
//if ($conn->connect_error) {
//  die("Connection failed: " . $conn->connect_error);
//}


//$sql = "INSERT INTO mocas_main ". "(timestamp,serial,model,username,user_email,access_level,module_id,module,hilevel,dispatch,timewindow_new,validation_code,comments) ". "VALUES(NOW(),'$serial','$model','$username','$useremail','$access_level','$module_id','$module','$hilevel','$dispatch','$timewindow_new','$validation_code','$comments')";

//if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
//} else {
//  echo "Error: " . $sql . "<br>" . $conn->error;
//}

//$conn->close();


	
?>


<html>
<head>
		<style>
			body,html{
				margin:0;
				padding:0;
				background:ghostwhite;
				padding-top:3%;
			}
			
			#TopBar{
				top: 0;
				z-index: 3;
				background-color: rgb(13, 105, 56);
				width: 100%;
				position: fixed;
			}
			
			#LogoHead{
				float:right;
			}
			
			#ActivationModule{
				font-family:sans-serif;
				margin:10px;
				font-size:15px;
			}
			
			#Title,#returnButton{
				font-family:sans-serif;
				margin:10px;
			}
		</style>
</head>
	<body>
		<div id="TopBar"><img id="LogoHead" src="https://support.combilift.net/ecompass/assets/ecompassLogo.png"></div>
		<h1 id="Title">MoCAS - HiLevel Update</h1>
		<div id="ActivationModule"/>

			<?php
				echo ("Serial Number:" . $serial . "<br>");
				echo ("Module:" . $module . "<br>");
				echo ("Hi Level Request:" . $hilevel . "<br>");
				echo ("Dispatch Status:" . $dispatch . "<br>");
				echo ("Time window in sec:" . $timewindow_new . "<br>");
				echo ("Validation Code:" . $validation_code . "<br>");

				echo('<script> Validation_Code = ' . $validation_code . '</script>');
				echo('<script> VarModuleID = ' . $module_id . '</script>');
				echo('<script> TimeWindow = ' . $timewindow_new . '</script>');
				echo('<script> TimeWindow_mix = ' . $timewindow_mix . '</script>');
				echo('<script> HiLevel = ' . $hilevel . '</script>');
				echo('<script> Dispatch = ' . $dispatch . '</script>');

			?>
		</div>
			<input type="submit" value="Return to editor" onclick="ChangeModules()"/>
		<script>
			function ChangeModules(){
				ToFind = VarModuleID.toString();
				Validation_Code_str = Validation_Code.toString();
				HiLevel_str = HiLevel.toString();
				Dispatch_str = Dispatch.toString();
				TimeWindow_str = TimeWindow.toString();
				TimeWindow_mix_str = TimeWindow_mix.toString();
				counter = 0;
				Parameters = sessionStorage.getItem('Parameters');
				while(Parameters.split('\n')[counter] != undefined){
					if(Parameters.split('\n')[counter].split(',')[0] == ToFind){
						OldLine = Parameters.split('\n')[counter];
						ParameterLine = Parameters.split('\n')[counter].split(',');
						NewLine = ParameterLine[0] + ',' +  HiLevel_str + ',' + '0' + ',' + '1' + ',' + Dispatch_str + ','+ TimeWindow_str + ','+ TimeWindow_mix_str + ','+ Validation_Code_str + ','+ ParameterLine[8] + ','+ ParameterLine[9] + ','+ ParameterLine[10];
						NewSession = sessionStorage.getItem('Parameters').replace(OldLine,NewLine);
						sessionStorage.setItem('Parameters',NewSession);
						location.href = '../editor.php';
						break;
					}else{
						counter++;
					}
				}
			}

</script>
	</body>
</html>