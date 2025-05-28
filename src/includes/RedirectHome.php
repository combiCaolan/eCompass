<?php
/*
	Redirect.php
	----------------------------------------------------------------------------
	Handles unauthorized access attempts in the eCompass web application.
	- Displays an "access not permitted" message.
	- Clears localStorage and sessionStorage on the client side for security.
	- (Optional) Redirects the user to the main index page (currently commented out).
	----------------------------------------------------------------------------
*/

// Display access denied message
echo ('access not permitted');

// Clear browser storage for security
echo '<script type="text/javascript"> localStorage.clear(); </script>';
echo '<script type="text/javascript"> sessionStorage.clear(); </script>';

// Optionally redirect to the main index page (uncomment to enable)
// Header("Location: https://www.support.combilift.net/wptest/ecompass/index.php");
?>