<!DOCTYPE html>
<!--
    parameter-editor.php
    ----------------------------------------------------------------------------
    Main parameter editor page for the eCompass web application.
    - Loads the UI for editing/viewing truck parameters.
    - Includes dynamic tree navigation for different parameter sections.
    ----------------------------------------------------------------------------
-->
<html lang="en">

<head>
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

    <!-- Application title and main stylesheet -->
    <title>E-Compass</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../assets/css/Merged.css" />
    <meta charset="utf-8">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <title>Parameter Editor - eCompass</title>
</head>

<body>
    <?php include_once('../src/includes/DialogTemplates.html'); ?>

    <div id="LoadingScreen">
        <div class="loader"></div>
    </div>

    <!-- Mobile Device Alert -->
    <div id="MobileAlert">
        <h1>Device Screen too small</h1>
        <p>eCompass is designed to work on a bigger resolution.</p>
        <p>Please use a larger resolution.</p>
        <p>If viewing in a mobile device, choose view "Desktop Site" in the browser settings.</p>
    </div>

    <div id="Container">
        <?php include_once('../src/includes/MainHeader.html'); ?>

        <!-- Tree navigation for parameter sections -->
        <ul class="tree">
            <?php
            // Define tree sections as an array for maintainability
            $treeSections = [
                ['A', 'DropDownMachineDetails', 'TruckDetailsID'],
                ['B', 'FileDetails', 'FileDetailsID'],
                ['C', 'Software', 'SoftwareID'],
                ['D', 'Service', 'ServiceID'],
                ['E', 'DropDownMoCAS', 'MoCASID'],
                ['F', 'DropDownParameters', 'ParametersID', '&#x25b2;'],
                ['G', 'GDrop', 'FactoryID', '&#x25bc;', 'GTreeTab'],
                ['H', 'HDrop', 'DeveloperID', '&#x25bc;', 'HTreeTab'],
                ['I', 'IDrop', 'NotAssignedID', '&#x25bc;', 'ITreeTab'],
                ['J', 'JDrop', 'SpecialID', '&#x25bc;', 'JTreeTab'],
            ];
            foreach ($treeSections as $section) {
                $letter = $section[0];
                $buttonId = $section[1];
                $labelId = $section[2];
                $arrow = $section[3] ?? '&#x25bc;';
                // $extraClass = $section[4] ?? '';
                echo "<li id='Treetab'" . ($letter === 'A' ? " style='margin-top:81px;'" : "") . ">";
                echo "<input type='button' style='float:right;' id='{$buttonId}' onclick=\"DropDownUni('{$letter}','{$buttonId}');\"> </button>";
                echo "<p onclick=\"DropDownUni('{$letter}','{$buttonId}');\" id='{$labelId}'></span>";
                echo "</li>";
                echo "<div id='{$letter}'></div>";
            }
            ?>
        </ul>

        <!-- Main parameter viewer/editor area -->
        <div id="viewer">
            <div id="topDefine">
                <table id="topDefineTable"></table>
                <table id="topDefineDescription"></table>
            </div>
        </div>

        <!-- Error reporting area -->
        <div id="ErrorReport">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        </div>
    </div>

    <?php include_once('../src/includes/ListTruckDirectories.php'); ?>

    <!--
    JsContents.html
    ----------------------------------------------------------------------------
    Includes all main JavaScript files and styles required for the eCompass
    application's editor and main parameter pages. This ensures that all
    necessary scripts for parameter logic, UI, language handling, error
    handling, and menu actions are loaded in the correct order.
    ----------------------------------------------------------------------------
-->

    <!-- Set available APIs (example: API 100) -->
    <script>AvailableAPI = ['100'];</script>

    <!-- FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Core application scripts and modules -->
    <script src="../assets/js/special-blocks.js"></script>
    <script src="../assets/js/description-dictionary.js"></script>
    <script src="../assets/js/add-missing-parameters.js"></script>
    <!--<script src="assets/js/ListTruckDir.js"></script>-->
    <script src="../assets/js/Parameter-Types/RegularParameter.js"></script>
    <script src="../assets/js/Parameter-Types/dropdown.js"></script>
    <script src="../assets/js/LanguageLogic/dynamic-language.js"></script>
    <script src="../assets/js/post-load.js"></script>
    <!-- <script src="../assets/js/Compare.js"></script> -->
    <script src="../assets/js/Dialog.js"></script>
    <!--<script src="assets/js/Javascript-Style/MenuShowHideLogic.js"></script>-->
    <!-- <script src="../assets/js/Parameter-Types/HydInOut.js"></script> -->
    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/Parameter-Manipulation/remove-parameter.js"></script>
    <script src="../assets/js/Parameter-Manipulation/add-parameters.js"></script>
    <!-- <script src="../assets/js/Parameter-Types/password.js"></script> -->
    <script src="../assets/js/Parameter-Manipulation/UpdateParameters/parameter-change.js"></script>
    <script src="../assets/js/Parameter-Types/bit900.js"></script>
    <script src="../assets/js/Parameter-Types/bit1000.js"></script>
    <script src="../assets/js/Parameter-Types/SerialNumberLogic.js"></script>
    <script src="../assets/js/parameters-view.js"></script>
    <script>
        /*START OF COLLAPSEDIV.JS*/

        // Toggle a div and update the toggle button's arrow direction
        function DropDownUni(DivID, DivToToggle) {
            const div = document.getElementById(DivID);
            const toggle = document.getElementById(DivToToggle);
            if (div && toggle) {
                $("#" + DivID).slideToggle();
                toggle.value = (div.style.display === 'none') ? '\u25B2' : '\u25BC';
            }
        }

        // Universal dropdown for parameter divs
        function UniversalDropDown(ID) {
            $("#ParametersDiv" + ID).slideToggle();
        }

        /*END OF COLLAPSEDIV.JS*/

    </script>
    <script src="../assets/js/Parameter-Types/FixedParameters.js"></script>
    <script src="../assets/js/parameters-menu.js"></script>
    <script src="../assets/js/Parameter-Manipulation/UpdateParameters/update-parameters.js"></script>
    <script src="../assets/js/Parameter-Manipulation/UpdateParameters/change-build-date.js"></script>
    <!-- <script src="../assets/js/LanguageLogic/implement.js"></script> -->
    <script src="../assets/js/LanguageLogic/set-elements-for-language.js"></script>
    <!-- <script src="../assets/js/Api-Logic/Api-Change.js"></script> -->
    <script src="../assets/js/menu-button-functions.js"></script>
    <script src="../assets/js/Error.js"></script>
    <script src="../assets/js/menu-logic.js"></script>

    <script>
        // Initialize the tree view and perform integrity checks on startup
        treeViewClick(document.getElementById('2'), 2);
        IntegrityCheckOnStartup();
    </script>

    <!--
    The following scripts are commented out but may be used for additional features:
    <script src="assets/js/framework/jquery-1.12.4.js"></script>
    <script src="assets/js/framework/jquery-ui.js"></script>
    <script src="assets/js/Hydraulic-Parameters/HydInOutChange.js"></script>
    <script src="assets/js/Export/Download.js"></script>
    <script src="assets/js/SetAccesLevel.js"></script>
    <script src="assets/js/Export/export.js"></script>
    <script src="assets/js/MenuFunctionality/MenuFunctionality.js"></script>
    <script src="assets/js/PostLoad/IntegrityPerParameterCheck.js"></script>
    <script src="assets/js/IntegrityChecks/IntegrityCheck.js"></script>
    <script src="assets/js/PostLoad/reloadOrigParState.js"></script>
-->

    <script>
        // Ensure language and bit labels are set after all resources are loaded
        window.onload = function () {
            SetLanguage();
            updateBitLabels();
        };
    </script>
</body>

</html>