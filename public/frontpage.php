<?php include_once('../src/includes/Verify.php'); ?>
<?php include_once('../src/includes/ListTruckDir.php'); ?>

<!DOCTYPE html>
<html>

<head>
	<?php include_once('../src/includes/headContents.html'); ?>
</head>

<body>
	<?php include_once('../src/includes/Dialog.html'); ?>
	<?php include_once('../src/includes/WebHeader.html'); ?>
	<div id="row_usr">
		<div id="right_row">
			<h1 style="font-weight:100;" id="WelcomeBack">Welcome Back,<h1 style="font-weight:100;" id="ConcatName">
				</h1>
			</h1>
			<h1 id="PleaseOpenMessage" style="font-weight:100; font-size:17px;">Please open a combilift parameters
				file(.clp file).</h1>
		</div>
	</div>

	<div id="bottom" style="bottom:0;">
	</div>
	<script>
		if (window.document.documentMode != undefined) {

			AlertBox = document.createElement('div');
			AlertBoxText = document.createElement('p');
			AlertBox.appendChild(AlertBoxText);

			AlertBox.setAttribute('style', 'background:red; color:white; font-weight:800; bottom:0; position:fixed; width:100%; padding:10px;');

			AlertBoxText.innerHTML = 'This browser needs to be updated - ecompass may not work properly on this browser';

			document.getElementById('bottom').appendChild(AlertBox);
		}

		if (sessionStorage.getItem('loggedinusername') != null) {
			document.getElementById('ConcatName').innerHTML = document.getElementById('ConcatName').innerHTML + sessionStorage.getItem('loggedinusername');
		}
	</script>
	<script src="../assets/js/AddMissingParameters.js"></script>
	<!--<script src="assets/js/ListTruckDir.js"></script>-->
	<script src="../UnsupportedBrowserCheck.js"></script>
	<script src="../assets/js/LanguageLogic/DynamicLanguage.js"></script>
	<script src="../assets/js/Dialog.js"></script>




	<!--<script src="assets/js/InitialStart/LanguageSet.js"></script>-->
	<script src="../assets/js/Api-Logic/Api-Change.js"></script>
	<script src="../assets/js/AllMenuButtonFunctions.js"></script>
	<script src="../assets/js/MenuLogic.js"></script>
	<script src="../assets/js/LanguageLogic/SetElementsForLanguage.js"></script>
	<script>
		if (localStorage.getItem('OpenInNewTab') != null) {
			Path = localStorage.getItem('OpenInNewTab');
			//OpenNewTabDialog
			//$("#OpenNewTabDialog").dialog();
			localStorage.removeItem('OpenInNewTab');
		}
	</script>

</body>

</html>