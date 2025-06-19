<?php
$serial = $_POST["SerialNumber"];
$username = $_POST["Username"];
$access_level = $_POST["AccessLevel"];
$module_id = $_POST["IndexNumber"];
$module = $_POST["Module"];

?>

<html>

<body>
	<div id="HeaderMockup" />
	<?php
	echo ("Serial Number" . $serial);
	$newParametersValue = 'helloworld';

	echo ('<script> NewVarCaolan = ' . $module_id . '</script>');
	?>
	</div>
	<input type="submit" value="Finished" onclick="ChangeModules()" />
	<script>
		function ChangeModules() {
			ToFind = NewVarCaolan.toString();

			counter = 0;
			Parameters = sessionStorage.getItem('Parameters');
			while (Parameters.split('\n')[counter] != undefined) {
				if (Parameters.split('\n')[counter].split(',')[0] == ToFind) {
					OldLine = Parameters.split('\n')[counter];
					ParameterLine = Parameters.split('\n')[counter].split(',');
					NewLine = ParameterLine[0] + ',' + '1' + ',' + '1' + ',' + ParameterLine[3] + ',' + ParameterLine[4] + ',' + ParameterLine[5] + ',' + ParameterLine[6] + ',' + ParameterLine[7] + ',' + ParameterLine[8] + ',' + ParameterLine[9] + ',' + ParameterLine[10];
					console.log(NewLine);
					NewSession = sessionStorage.getItem('Parameters').replace(OldLine, NewLine);
					sessionStorage.setItem('Parameters', NewSession);
					location.href = '../parameter-editor.html';
					break;
				} else {
					counter++;
				}
			}
		}

	</script>
</body>

</html>