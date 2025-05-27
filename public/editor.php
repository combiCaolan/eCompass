<!DOCTYPE html>
<!--
    editor.php
    ----------------------------------------------------------------------------
    Main parameter editor page for the eCompass web application.
    - Loads the UI for editing/viewing truck parameters.
    - Includes dynamic tree navigation for different parameter sections.
    - Loads dialogs, headers, and supporting scripts.
    ----------------------------------------------------------------------------
-->
<html>
    <head>
        <!-- Include common <head> contents (meta tags, styles, scripts, etc.) -->
        <?php include_once('../src/includes/headContents.html'); ?>
    </head>
<body>
        <!-- Include modal dialogs for user interactions -->
        <?php include_once('../src/includes/Dialog.html'); ?>

        <!-- Loading screen shown while the app is initializing -->
        <div id="LoadingScreen">
            <div class="loader"></div>
        </div>

        <div id="Container">
            <!-- Main web header/navigation bar -->
            <?php include_once('../src/includes/WebHeader.html'); ?>

            <!-- Tree navigation for parameter sections -->
            <ul class="tree">
                <!-- Each <li> represents a collapsible section in the parameter tree -->
                <li id="Treetab" style="margin-top:81px;">
                    <input type="button" style="float:right;" id="DropDownMachineDetails" onclick="DropDownUni('A','DropDownMachineDetails');" value="&#x25bc;" />
                    <p onclick="DropDownUni('A','DropDownMachineDetails');" id="TruckDetailsID"></p>
                </li>
                <div id="A"></div>

                <li id="Treetab">
                    <input type="button" style="float:right;" id="FileDetails" onclick="DropDownUni('B','FileDetails');" value="&#x25bc;" />
                    <p onclick="DropDownUni('B','FileDetails');" id="FileDetailsID"></p>
                </li>
                <div id="B"></div>

                <li id="Treetab">
                    <input type="button" style="float:right;" id="Software" onclick="DropDownUni('C','Software');" value="&#x25bc;" />
                    <p onclick="DropDownUni('C','Software');" id="SoftwareID"></p>
                </li>
                <div id="C"></div>

                <li id="Treetab">
                    <input type="button" style="float:right;" id="Service" onclick="DropDownUni('D','Service');" value="&#x25bc;" />
                    <p onclick="DropDownUni('D','Service');" id="ServiceID"></p>
                </li>
                <div id="D"></div>

                <li id="Treetab">
                    <input type="button" style="float:right;" id="DropDownMoCAS" onclick="DropDownUni('E','DropDownMoCAS');" value="&#x25bc;" />
                    <p onclick="DropDownUni('E','DropDownMoCAS');" id="MoCASID"></p>
                </li>
                <div id="E"></div>

                <li id="Treetab">
                    <input type="button" style="float:right;" id="DropDownParameters" onclick="DropDownUni('F','DropDownParameters');" value="&#x25b2;"/>
                    <p onclick="DropDownUni('F','DropDownParameters');" id="ParametersID"></p>
                </li>
                <div id="F"></div>

                <li id="Treetab" class="GTreeTab">
                    <input type="button" style="float:right;" id="GDrop" onclick="DropDownUni('G','GDrop');" value="&#x25bc;"/>
                    <p onclick="DropDownUni('G','GDrop');" id="FactoryID"></p>
                </li>
                <div id="G"></div>

                <li id="Treetab" class="HTreeTab">
                    <input type="button" style="float:right;" id="HDrop" onclick="DropDownUni('H','HDrop');" value="&#x25bc;"/>
                    <p onclick="DropDownUni('H','HDrop');" id="DeveloperID"></p>
                </li>
                <div id="H"></div>

                <li id="Treetab" class="ITreeTab">
                    <input type="button" style="float:right;" id="IDrop" onclick="DropDownUni('I','IDrop');" value="&#x25bc;"/>
                    <p onclick="DropDownUni('I','IDrop');" id="NotAssignedID"></p>
                </li>
                <div id="I"></div>

                <li id="Treetab" class="JTreeTab">
                    <input type="button" style="float:right;" id="JDrop" onclick="DropDownUni('J','JDrop');" value="&#x25bc;"/>
                    <p onclick="DropDownUni('J','JDrop');" id="SpecialID"></p>
                </li>
                <div id="J"></div>
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

        <!-- List of available truck directories (for file selection/navigation) -->
        <?php include_once('../src/includes/ListTruckDir.php'); ?>

        <!-- Include all required JavaScript for the editor page -->
        <?php include_once('../src/includes/JsContents.html') ?>
</body>
</html>