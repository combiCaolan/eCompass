// -----------------------------------------------------------------------------
// UnsupportedBrowserCheck.js
// -----------------------------------------------------------------------------
// Checks if the user is running Internet Explorer and displays an alert if so.
// This script helps ensure users are aware that eCompass may not function
// correctly in unsupported browsers.
// -----------------------------------------------------------------------------

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");

// If Internet Explorer is detected, show an alert to the user
if (msie > 0) {
    alert("It seems you're using Internet Explorer - please use another browser to view eCompass as certain functions will not work on this browser.");
}