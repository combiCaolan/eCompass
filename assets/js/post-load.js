/**
 * PostLoad.js
 * 
 * Handles post-load UI setup, menu closing, parameter integrity checks, and search functionality for eCompass.
 * Uses best practices for variable naming, code structure, and documentation.
 */

/**
 * Updates Bit label buttons with their current values.
 */
function BitLabelChecker() {
    try {
        const ACV1000 = ["220", "238", "256", "274", "292", "310", "328", "346", "364", "382", "400"];
        let ACVCounter1000 = 0;
        while (ACV1000[ACVCounter1000] !== undefined) {
            const TabId = document.getElementById(ACV1000[ACVCounter1000]).parentNode.id.replace('out', '').replace('in', '');
            const CurrentValue = UserParametersFileDict[ACV1000[ACVCounter1000]].split(',')[1];
            const MidVal = CurrentValue & 255;
            const FinalVal = DropDownOptionsDict['11_' + MidVal];
            const headTitleElem = document.getElementById('HeadTitle' + TabId);
            if (headTitleElem.innerHTML.includes('+')) {
                headTitleElem.innerHTML = '+ ' + FinalVal;
            } else {
                headTitleElem.innerHTML = '- ' + FinalVal;
            }
            ACVCounter1000++;
        }
    } catch (err) {
        // console.log('1000 Tag Append - ERROR');
    }
}

// Normalize Parameters line endings and build ParametersPresent array
let Parameters = sessionStorage.getItem('Parameters');
if (Parameters.includes('\r')) {
    Parameters = Parameters.replace(/\r/g, '\n');
}
let ParametersPresent = [];
let counter = 0;
let PostCheckFile = '';
while (Parameters.split('\n')[counter] !== undefined) {
    ParametersPresent.push(Parameters.split('\n')[counter].split(',')[0]);
    PostCheckFile += '\n' + Parameters.split('\n')[counter];
    counter++;
}
sessionStorage.setItem('Parameters', PostCheckFile);

/**
 * Closes all menu sections in the UI.
 */
function CloseMenus() {
    const menuIds = [
        "A","B","C","D","E","F","G","H","I","J",
        "G1","G2","G21","G22","G23","G231","G24","G240a","G240b","G240c","G240d","G25","G251","G26","G261","G27","G3","G31","G32","G33","G34","G4","G41","G41in","G41out","G42","G42in","G42out","G43","G43in","G43out","G44","G44in","G44out","G45","G45in","G45out","G46","G46in","G46out","G47","G47in","G47out","G48","G48in","G48out","G49","G49in","G49out","G410","G410in","G410out","G411","G411in","G411out","G5","G6","G7","G8","G81","G82","G83","G831","G832","G84","G85","G851","G86","G87","G9","G91","G92","G93","G94","G95","G96","G97","G98","G941","G942","G943","G944","G945","G946","G912","G913","G911","G241","G242","G243","G244","G245","G246","G247","G248","G10","G101","G102","G103","G104","G105","G106","G11","G12","G13","GG1","GG2","GG3","GG4","GG5","GG6","GG7","GG8","GG9","GH1","GH2"
    ];
    menuIds.forEach(id => $("#" + id).slideUp());
}

/**
 * Runs after the menu and UI are loaded, hides Bit parameters, and builds ParameterMainDict.
 */
function PostLoadedRun() {
    CloseMenus();
    $("#F").slideDown();

    try {
        let Style999Counter = 0;
        while (BitParameters999[Style999Counter] !== undefined && BitParameters999[Style999Counter] !== "undefined" && BitParameters999[Style999Counter] !== null) {
            document.getElementById(BitParameters999[Style999Counter]).setAttribute('style', 'display:none;');
            TreeViewClick(document.getElementById(BitParameters999[Style999Counter]), BitParameters999[Style999Counter], 'START');
            Style999Counter++;
        }
    } catch (err) {}

    try {
        let Style1000Counter = 0;
        while (BitParameters1000[Style1000Counter] !== undefined && BitParameters1000[Style1000Counter] !== "undefined" && BitParameters1000[Style1000Counter] !== null) {
            document.getElementById(BitParameters1000[Style1000Counter]).setAttribute('style', 'display:none;');
            TreeViewClick(document.getElementById(BitParameters1000[Style1000Counter]), BitParameters1000[Style1000Counter], 'START');
            Style1000Counter++;
        }
    } catch (err) {}

    ParameterMainDict = {};
    let counter = 0;
    while (parameterMain.split('\n')[counter] !== undefined) {
        ParameterMainDict[parameterMain.split('\n')[counter].split(',')[0]] = parameterMain.split('\n')[counter];
        counter++;
    }
}

// Build DropDownOptionsDict from DropDownlist in sessionStorage
let DropDownFile = sessionStorage.getItem('DropDownlist');
let DropDownLineNum = 0;
let DropDownOptionsDict = {};
let CurrentDropDownId = undefined;
try {
    while (DropDownFile.split('\n')[DropDownLineNum] !== undefined) {
        if (DropDownFile.split('\n')[DropDownLineNum][0] === '#') {
            CurrentDropDownId = DropDownFile.split('\n')[DropDownLineNum].replace('#', '');
        } else {
            const parts = DropDownFile.split('\n')[DropDownLineNum].split(',');
            DropDownOptionsDict[CurrentDropDownId + '_' + parts[1]] = parts[0];
        }
        DropDownLineNum++;
    }
} catch (err) {}

// Set access level variables
let AccessLevel = sessionStorage.getItem('AccessLevel');
let AccessLevelForUser = sessionStorage.getItem('AccessLevel');

// Hide certain menu sections for non-admin users
if (Number(AccessLevel) !== 8) {
    ['G', 'H', 'I', 'J'].forEach(id => {
        const elem = document.getElementById(id);
        if (elem) elem.remove();
    });
    ['GTreeTab', 'HTreeTab', 'ITreeTab', 'JTreeTab'].forEach(className => {
        const elems = document.getElementsByClassName(className);
        if (elems.length > 0) elems[0].remove();
    });
}

// Set document title based on file name
let FileTitle;
if (sessionStorage.getItem('ParametersFileName').includes(sessionStorage.getItem('ServerPath'))) {
    FileTitle = sessionStorage.getItem('ParametersFileName').split('/');
    document.title = FileTitle[FileTitle.length - 1];
} else {
    FileTitle = sessionStorage.getItem('ParametersFileName').split('\\');
    document.title = FileTitle[FileTitle.length - 1];
}

/**
 * Checks parameter file integrity and alerts user if issues are found.
 */
function IntegrityCheckOnStartup() {
    if (ParametersPresent.includes('1') && ParametersPresent.includes('1500')) {
        let Parameters = sessionStorage.getItem('Parameters');
        let counter = 0;
        while (Parameters.split('\n')[counter] !== undefined) {
            if (Parameters.split('\n')[counter] !== '') {
                const CheckerLineOne = Parameters.split('\n')[counter].replace(/,/g, '');
                if (CheckerLineOne.includes('.')) {
                    alert('There was an unknown parameter loaded in this file, redirecting now (Either a decimal or value over 1500)');
                    location.href = 'index.php';
                    break;
                }
                if (Number(Parameters.split('\n')[counter].split(',')[0]) > 1500 || !Number.isInteger(Number(Parameters.split('\n')[counter].split(',')[0]))) {
                    alert('There was an unknown parameter loaded in this file, redirecting now (Either a decimal or value over 1500)');
                    location.href = 'index.php';
                    break;
                }
                if (isNaN(Number(Parameters.split('\n')[counter].replace(/,/g, '').replace(/-/g, '')))) {
                    alert('There were some illegal characters in this clp file, redirecting now');
                    location.href = 'index.php';
                    break;
                }
                if (Parameters.split('\n')[counter].includes(',') && Parameters.split('\n')[counter].split(',').length !== 11) {
                    alert('This file has a line without 11 values');
                    location.href = 'index.php';
                    break;
                }
            }
            counter++;
        }
    } else {
        alert('Necessary Parameters for basic operation are not included in this file - will not allow changes to be made');
    }
    const NecessaryParameters = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];
    let Missingtwentytwoparameters = [];
    let counter = 0;
    while (NecessaryParameters[counter] !== undefined) {
        if (!ParametersPresent.includes(NecessaryParameters[counter])) {
            Missingtwentytwoparameters.push(LabelDict[Number(NecessaryParameters[counter])]);
        }
        counter++;
    }
    if (Missingtwentytwoparameters.length > 0) {
        alert('You are missing the following parameters in your pre 22 parameters - ' + Missingtwentytwoparameters);
    }
}

// Search bar filtering for parameters
$(document).ready(function () {
    $("#SEARCHBAR").on("keyup", function () {
        const value = $(this).val().toLowerCase();
        $("#ParametersSearchList a").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

/**
 * Opens the menu and tree view for a given parameter index.
 * @param {string|number} Index - The parameter index to open.
 */
function DynamicMenuOpenTool(Index) {
    CloseMenus();
    $("#F").slideDown();
    const ToOpen = ParameterMainDict[Index].split(',')[1].split(' ');
    let counter = 1;
    while (ToOpen[counter] !== undefined) {
        InvertSymbolStyle(ToOpen[counter].toString());
        counter++;
    }
    if (ParameterMainDict[Index].split(',')[2] !== '999' && ParameterMainDict[Index].split(',')[2] !== '1000') {
        document.getElementById(Index.toString()).click();
    }
}

/**
 * Populates the search dialog with parameter options.
 */
function SearchFunctionOptions() {
    document.getElementById('ParametersSearchList').innerHTML = '';
    let counter = 0;
    while (sessionStorage.getItem('ParameterMain').split('\n')[counter] !== undefined) {
        const CurrentLine = sessionStorage.getItem('ParameterMain').split('\n')[counter];
        if (CurrentLine.split(',')[2] !== '999' && CurrentLine.split(',')[2] !== '1000') {
            const Option = document.createElement('a');
            if (Number(CurrentLine.split(',')[0]) > 64) {
                Option.setAttribute('onclick', 'DynamicMenuOpenTool(' + Number(CurrentLine.split(',')[0]) + '); TreeViewClick(document.getElementById(`' + CurrentLine.split(',')[0] + '`),' + Number(CurrentLine.split(',')[0]) + ');');
            }
            Option.setAttribute('id', 'SearchDialogMessageOption');
            Option.innerHTML = CurrentLine.split(',')[3] + '	';
            if (Number(CurrentLine.split(',')[0]) > 64) {
                document.getElementById('ParametersSearchList').appendChild(Option);
            }
        }
        counter++;
    }

    // Bit999 search options
    counter = 0;
    let CurrentIndex = undefined;
    while (sessionStorage.getItem('Bit999').split('\n')[counter] !== undefined) {
        const CurrentLine = sessionStorage.getItem('Bit999').split('\n')[counter];
        if (CurrentLine[0] === '#') {
            CurrentIndex = CurrentLine.replace('#', '');
        } else {
            const Option = document.createElement('a');
            Option.setAttribute('onclick', 'document.getElementById("constant' + CurrentIndex + '").childNodes[0].childNodes[' + CurrentLine.split(",")[0] + '].childNodes[0].click(); DynamicMenuOpenTool(' + Number(CurrentIndex) + ')');
            Option.setAttribute('id', 'SearchDialogMessageOption');
            Option.innerHTML = CurrentLine.split(',')[2] + '	';
            document.getElementById('ParametersSearchList').appendChild(Option);
        }
        counter++;
    }

    // Bit1000 search options
    counter = 0;
    CurrentIndex = undefined;
    let thirdCounter = 1;
    let secondCounter = 0;
    while (sessionStorage.getItem('Bit1000').split('\n')[counter] !== undefined) {
        const CurrentLine = sessionStorage.getItem('Bit1000').split('\n')[counter];
        if (CurrentLine[0] === '#') {
            CurrentIndex = CurrentLine.replace('#', '');
            secondCounter = 0;
            thirdCounter++;
        } else {
            const Option = document.createElement('a');
            Option.setAttribute('onclick', 'document.getElementById("constant' + CurrentIndex + '").childNodes[0].childNodes[' + secondCounter + '].childNodes[0].click(); DynamicMenuOpenTool(' + Number(CurrentIndex) + ')');
            Option.setAttribute('id', 'SearchDialogMessageOption');
            Option.innerHTML = 'Hyd ' + Math.floor((thirdCounter + 1) / 3) + ' | ' + CurrentLine.split(',')[3] + '	';
            document.getElementById('ParametersSearchList').appendChild(Option);
            secondCounter++;
        }
        counter++;
    }
}