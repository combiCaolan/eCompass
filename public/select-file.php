<?php
// -----------------------------------------------------------------------------
// frontpage.php
// -----------------------------------------------------------------------------
// Landing page for the eCompass web application.
// - Verifies user authentication and loads available truck directories.
// - Displays a welcome message and prompts the user to open a parameter file.
// - Includes all necessary UI components and scripts for the front page.
// -----------------------------------------------------------------------------

// include_once('../src/includes/Verify.php');      // User verification and session setup
header("Access-Control-Allow-Origin: *");
include_once('../src/includes/ListTruckDirectories.php'); // List available truck directories
?>

<!DOCTYPE html>
<html>

<head>
	<!-- Include common <head> contents (meta tags, styles, scripts, etc.) -->
	<?php include_once('../src/includes/HeadIncludes.html'); ?>
</head>

<body>
	<!-- Include modal dialogs for user interactions -->
	<?php include_once('../src/includes/DialogTemplates.html'); ?>
	<!-- Main web header/navigation bar -->
	<?php include_once('../src/includes/MainHeader.html'); ?>

	<div id="row_usr">
		<div id="right_row">
			<!-- Welcome message and username display -->
			<h1 style="font-weight:100;" id="WelcomeBack">
				Welcome Back,
				<h1 style="font-weight:100;" id="ConcatName"></h1>
			</h1>
			<!-- Prompt to open a parameter file -->
			<h1 id="PleaseOpenMessage" style="font-weight:100; font-size:17px;">
				Please open a combilift parameters file(.clp file).
			</h1>
		</div>
	</div>

	<!-- Bottom area for browser alerts -->
	<div id="bottom" style="bottom:0;"></div>

	<script>
		/**
		 * Show a warning if the user is using Internet Explorer.
		 */
		if (window.document.documentMode != undefined) {
			const AlertBox = document.createElement('div');
			const AlertBoxText = document.createElement('p');
			AlertBox.appendChild(AlertBoxText);
			AlertBox.setAttribute('style', 'background:red; color:white; font-weight:800; bottom:0; position:fixed; width:100%; padding:10px;');
			AlertBoxText.innerHTML = 'This browser needs to be updated - ecompass may not work properly on this browser';
			document.getElementById('bottom').appendChild(AlertBox);
		}

		/**
		 * Display the logged-in username if available in sessionStorage.
		 */
		if (sessionStorage.getItem('loggedinusername') != null) {
			document.getElementById('ConcatName').innerHTML += sessionStorage.getItem('loggedinusername');
		}
	</script>

	<!-- Load additional JavaScript modules for front page functionality -->
	<script src="../assets/js/add-missing-parameters.js"></script>
	<script src="../assets/js/LanguageLogic/dynamic-language.js"></script>
	<script src="../assets/js/Dialog.js"></script>
	<script src="../assets/js/Api-Logic/Api-Change.js"></script>
	<script src="../assets/js/menu-button-functions.js"></script>
	<script src="../assets/js/menu-logic.js"></script>
	<script src="../assets/js/LanguageLogic/set-elements-for-language.js"></script>

	<script>
		/**
		 * If the app was opened in a new tab, handle any required path logic.
		 */
		if (localStorage.getItem('OpenInNewTab') != null) {
			const Path = localStorage.getItem('OpenInNewTab');
			// Optionally open a dialog or handle the new tab event here
			localStorage.removeItem('OpenInNewTab');
		}
	</script>
</body>

</html>