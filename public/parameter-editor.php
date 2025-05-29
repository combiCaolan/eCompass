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
    <?php include_once('../src/includes/HeadIncludes.html'); ?>
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
    <?php include_once('../src/includes/GlobalScripts.html'); ?>
    <script>
        // Ensure language and bit labels are set after all resources are loaded
        window.onload = function () {
            SetLanguage();
            updateBitLabels();
        };
    </script>
</body>

</html>