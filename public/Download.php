<?php
// -----------------------------------------------------------------------------
// Download.php
// -----------------------------------------------------------------------------
// This page handles the download of the current parameter file (COMBI_PAR.clp)
// for the eCompass web application. It verifies the user, displays a download
// button, and triggers the download using JavaScript. It also logs the download
// action for auditing purposes.
// -----------------------------------------------------------------------------

// Include user verification and session setup
include_once('../src/includes/Verify.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<!-- Include common <head> contents (meta tags, styles, scripts, etc.) -->
	<?php include_once('../src/includes/headContents.html'); ?>
</head>

<body>
	<!-- Include a minimal web header (likely a placeholder or branding) -->
	<?php include_once('../src/includes/EmptyWebHeader.html'); ?>

	<div id="row_usr">
		<div id="right_row">
			<!-- Company Logo -->
			<img id="LogoHead"
				src="https://support.combilift.net/wp-content/uploads/2020/09/Combilift-Master-logo-opt.png"
				alt="Combilift Logo">
			<br />
			<!-- File Name Heading -->
			<h1 style="font-weight:100;" id="WelcomeBack">
				COMBI_PAR.clp
				<h1 style="font-weight:100;" id="ConcatName"></h1>
			</h1>
			<br /><br />
			<!-- Download Button -->
			<button id="$start">Download file</button>
		</div>
	</div>

	<script>
		/**
		 * Build a dictionary of user parameters from sessionStorage.
		 * Each line in the 'Parameters' sessionStorage item is split by comma,
		 * and the first value is used as the key.
		 */
		const UserParametersFileDict = {};
		let counter = 0;
		const parameters = sessionStorage.getItem('Parameters');
		if (parameters) {
			const lines = parameters.split('\n');
			while (lines[counter] !== undefined) {
				const key = lines[counter].split(',')[0];
				UserParametersFileDict[key] = lines[counter];
				counter++;
			}
		}

		// Create a hidden div for possible form submission/logging
		const EmptyDiv = document.createElement('div');
		EmptyDiv.setAttribute('style', 'display:none;');
		// (You may want to append this to the DOM if needed)
	</script>

	<!-- Download helper script (assumed to provide a 'download' function) -->
	<script src="../assets/js/download.js"></script>

	<script>
		/**
		 * Handles the download button click event.
		 * - Creates a Blob from the 'Parameters' sessionStorage item.
		 * - Triggers the download as "COMBI_PAR.clp".
		 * - Submits a hidden form for logging the download action.
		 */
		$start.onclick = () => {
			// Remove empty lines before creating the Blob
			const parameters = sessionStorage.getItem('Parameters').replace(/^\s*[\r\n]/gm, '');
			const blob = new Blob([parameters], { type: 'text/plain' });

			// Trigger file download
			download(blob, "COMBI_PAR.clp", "text/plain");

			// Submit the hidden form for logging (assumes SubmitForm exists)
			if (typeof SubmitForm !== 'undefined') {
				SubmitForm.click();
			}
		}
	</script>
</body>

</html>