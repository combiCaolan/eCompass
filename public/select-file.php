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
	<!--
	headContents.html
	----------------------------------------------------------------------------
	Common <head> contents for the eCompass web application.
	Includes meta tags, external stylesheets, JavaScript libraries, favicon links,
	and the main application stylesheet. This file is included in all main pages
	to ensure consistent resources and branding.
	----------------------------------------------------------------------------
-->


	<!-- Responsive viewport settings -->
	<meta name='viewport' content='width=device-width, initial-scale=1'>

	<!-- jQuery UI base theme stylesheet -->
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<!-- <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script> -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	<!-- External resources: FontAwesome, jQuery, jQuery UI -->
	<!-- <script src='https://kit.fontawesome.com/a076d05399.js'></script> -->
	<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"> -->
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

	<!-- Temporary: Local jQuery UI framework and duplicate jQuery for compatibility -->
	<meta charset="utf-8">
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<!-- <script src="../assets/js/framework/jquery-ui.js"></script> -->

	<!-- Favicon links for various devices -->
	<link rel="apple-touch-icon" sizes="180x180" href="assets/Favicons/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="assets/Favicons/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="assets/Favicons/favicon-16x16.png">

	<!-- Bootstrap CSS -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
	<!-- Optionally, Bootstrap JS (for modals, dropdowns, etc.) -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

	<!-- Application title and main stylesheet -->
	<title>E-Compass</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="../assets/css/Merged.css" />
	<meta charset="utf-8">
</head>

<body>
	<!-- Include modal dialogs for user interactions -->
	<?php include_once('../src/includes/DialogTemplates.html'); ?>
	<!-- Main web header/navigation bar -->
	<?php include_once('../src/includes/MainHeader.html'); ?>

	<div id="row_usr">
		<div id="right_row">
			<!-- Welcome message and username display -->
			<div class="my-4">
				<h1 class="display-5 fw-light" id="WelcomeBack">
					Welcome Back, <span id="ConcatName"></span>
				</h1>
			</div>
			<!-- Prompt to open a parameter file -->
			<p id="PleaseOpenMessage" class="lead">
				Please open a Combilift parameters file (.clp file).
			</p>


		</div>
	</div>

	<!-- Bottom area for browser alerts -->
	<div id="bottom" style="bottom:0;"></div>

	<script>
		/**
		 * Show a warning if the user is using Internet Explorer.
		 */
		if (window.document.documentMode != undefined) {
			// const AlertBox = document.createElement('div');
			// const AlertBoxText = document.createElement('p');
			// AlertBox.appendChild(AlertBoxText);
			// AlertBox.setAttribute('style', 'background:red; color:white; font-weight:800; bottom:0; position:fixed; width:100%; padding:10px;');
			// AlertBoxText.innerHTML = 'This browser needs to be updated - ecompass may not work properly on this browser';
			// document.getElementById('bottom').appendChild(AlertBox);

			const AlertBox = document.createElement('div');
			AlertBox.className = 'alert alert-danger fixed-bottom mb-0 text-center fw-bold';
			AlertBox.role = 'alert';
			AlertBox.innerHTML = 'This browser needs to be updated - eCompass may not work properly on this browser';
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
	<!-- <script src="../assets/js/Api-Logic/Api-Change.js"></script> -->
	<script type="module" src="../assets/js/menu-button-functions.js"></script>
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