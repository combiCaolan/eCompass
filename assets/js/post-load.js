/**
 * PostLoad.js
 * Handles post-load UI setup, menu closing, parameter integrity checks, and search functionality for eCompass.
 * Uses best practices for variable naming, code structure, and documentation.
 */

/**
 * Updates Bit label buttons with their current values.
 */
function BitLabelChecker() {
    try {
        const ACV1000 = ["220", "238", "256", "274", "292", "310", "328", "346", "364", "382", "400"];
        ACV1000.forEach(id => {
            const elem = document.getElementById(id);
            if (!elem) return;
            const tabId = elem.parentNode.id.replace('out', '').replace('in', '');
            const currentValue = UserParametersFileDict[id]?.split(',')[1];
            if (currentValue === undefined) return;
            const midVal = currentValue & 255;
            const finalVal = DropDownOptionsDict['11_' + midVal] || '';
            const headTitleElem = document.getElementById('HeadTitle' + tabId);
            if (!headTitleElem) return;
            headTitleElem.innerHTML = (headTitleElem.innerHTML.includes('+') ? '+ ' : '- ') + finalVal;
        });
    } catch (err) {
        // Optionally log error
    }
}

// Normalize Parameters line endings and build ParametersPresent array
let Parameters = sessionStorage.getItem('Parameters') || '';
Parameters = Parameters.replace(/\r/g, '\n');
const ParametersLines = Parameters.split('\n').filter(line => line.trim() !== '');
const ParametersPresent = ParametersLines.map(line => line.split(',')[0]);
sessionStorage.setItem('Parameters', '\n' + ParametersLines.join('\n'));

/**
 * Closes all menu sections in the UI.
 */
function CloseMenus() {
    const menuIds = [
        "A","B","C","D","E","F","G","H","I","J",
        "G1","G2","G21","G22","G23","G231","G24","G240a","G240b","G240c","G240d","G25","G251","G26","G261","G27","G3","G31","G32","G33","G34","G4","G41","G41in","G41out","G42","G42in","G42out","G43","G43in","G43out","G44","G44in","G44out","G45","G45in","G45out","G46","G46in","G46out","G47","G47in","G47out","G48","G48in","G48out","G49","G49in","G49out","G410","G410in","G410out","G411","G411in","G411out","G5","G6","G7","G8","G81","G82","G83","G831","G832","G84","G85","G851","G86","G87","G9","G91","G92","G93","G94","G95","G96","G97","G98","G941","G942","G943","G944","G945","G946","G912","G913","G911","G241","G242","G243","G244","G245","G246","G247","G248","G10","G101","G102","G103","G104","G105","G106","G11","G12","G13","GG1","GG2","GG3","GG4","GG5","GG6","GG7","GG8","GG9","GH1","GH2"
    ];
    menuIds.forEach(id => {
        const elem = document.getElementById(id);
        if (elem) $(elem).slideUp();
    });
}

/**
 * Runs after the menu and UI are loaded, hides Bit parameters, and builds ParameterMainDict.
 */
function PostLoadedRun() {
    CloseMenus();
    $("#F").slideDown();

    // Hide BitParameters999
    if (Array.isArray(bitParameters999)) {
        bitParameters999.forEach(id => {
            const elem = document.getElementById(id);
            if (elem) {
                elem.style.display = 'none';
                treeViewClick(elem, id, 'START');
            }
        });
    }

    // Hide BitParameters1000
    if (Array.isArray(bitParameters1000)) {
        bitParameters1000.forEach(id => {
            const elem = document.getElementById(id);
            if (elem) {
                elem.style.display = 'none';
                treeViewClick(elem, id, 'START');
            }
        });
    }

    // Build ParameterMainDict
    window.ParameterMainDict = {};
    const parameterMain = sessionStorage.getItem('ParameterMain') || '';
    parameterMain.split('\n').forEach(line => {
        if (line.trim() !== '') {
            const parts = line.split(',');
            window.ParameterMainDict[parts[0]] = line;
        }
    });
}

// Build DropDownOptionsDict from DropDownlist in sessionStorage
const DropDownFile = sessionStorage.getItem('DropDownlist') || '';
const DropDownLines = DropDownFile.split('\n');
const DropDownOptionsDict = {};
let CurrentDropDownId = undefined;
DropDownLines.forEach(line => {
    if (line[0] === '#') {
        CurrentDropDownId = line.replace('#', '');
    } else if (CurrentDropDownId && line.trim() !== '') {
        const parts = line.split(',');
        DropDownOptionsDict[CurrentDropDownId + '_' + parts[1]] = parts[0];
    }
});

// Set access level variables
const AccessLevel = sessionStorage.getItem('AccessLevel');
const AccessLevelForUser = sessionStorage.getItem('AccessLevel');

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
const ParametersFileName = sessionStorage.getItem('ParametersFileName') || '';
const ServerPath = sessionStorage.getItem('ServerPath') || '';
let FileTitleArr;
if (ParametersFileName.includes(ServerPath)) {
    FileTitleArr = ParametersFileName.split('/');
} else {
    FileTitleArr = ParametersFileName.split('\\');
}
document.title = FileTitleArr[FileTitleArr.length - 1] || 'eCompass';

/**
 * Checks parameter file integrity and alerts user if issues are found.
 */
function IntegrityCheckOnStartup() {
    if (ParametersPresent.includes('1') && ParametersPresent.includes('1500')) {
        for (const line of ParametersLines) {
            if (line !== '') {
                const checkerLineOne = line.replace(/,/g, '');
                if (checkerLineOne.includes('.')) {
                    alert('There was an unknown parameter loaded in this file, redirecting now (Either a decimal or value over 1500)');
                    location.href = 'index.php';
                    return;
                }
                const paramId = Number(line.split(',')[0]);
                if (paramId > 1500 || !Number.isInteger(paramId)) {
                    alert('There was an unknown parameter loaded in this file, redirecting now (Either a decimal or value over 1500)');
                    location.href = 'index.php';
                    return;
                }
                if (isNaN(Number(checkerLineOne.replace(/-/g, '')))) {
                    alert('There were some illegal characters in this clp file, redirecting now');
                    location.href = 'index.php';
                    return;
                }
                if (line.includes(',') && line.split(',').length !== 11) {
                    alert('This file has a line without 11 values');
                    location.href = 'index.php';
                    return;
                }
            }
        }
    } else {
        alert('Necessary Parameters for basic operation are not included in this file - will not allow changes to be made');
    }
    const NecessaryParameters = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];
    const MissingParams = NecessaryParameters.filter(param => !ParametersPresent.includes(param));
    if (MissingParams.length > 0) {
        alert('You are missing the following parameters in your pre 22 parameters - ' + MissingParams.map(id => LabelDict[Number(id)]).join(', '));
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
    for (let i = 1; i < ToOpen.length; i++) {
        InvertSymbolStyle(ToOpen[i].toString());
    }
    const paramType = ParameterMainDict[Index].split(',')[2];
    if (paramType !== '999' && paramType !== '1000') {
        const elem = document.getElementById(Index.toString());
        if (elem) elem.click();
    }
}

/**
 * Populates the search dialog with parameter options.
 */
function SearchFunctionOptions() {
    const searchList = document.getElementById('ParametersSearchList');
    if (!searchList) return;
    searchList.innerHTML = '';

    // Main parameters
    const parameterMain = sessionStorage.getItem('ParameterMain') || '';
    parameterMain.split('\n').forEach(line => {
        const parts = line.split(',');
        if (parts[2] !== '999' && parts[2] !== '1000' && Number(parts[0]) > 64) {
            const option = document.createElement('a');
            option.setAttribute('onclick', `DynamicMenuOpenTool(${Number(parts[0])}); treeViewClick(document.getElementById('${parts[0]}'),${Number(parts[0])});`);
            option.id = 'SearchDialogMessageOption';
            option.innerHTML = parts[3] + '\t';
            searchList.appendChild(option);
        }
    });

    // Bit999 search options
    let CurrentIndex;
    (sessionStorage.getItem('Bit999') || '').split('\n').forEach(line => {
        if (line[0] === '#') {
            CurrentIndex = line.replace('#', '');
        } else if (CurrentIndex) {
            const option = document.createElement('a');
            option.setAttribute('onclick', `document.getElementById("constant${CurrentIndex}").childNodes[0].childNodes[${line.split(",")[0]}].childNodes[0].click(); DynamicMenuOpenTool(${Number(CurrentIndex)})`);
            option.id = 'SearchDialogMessageOption';
            option.innerHTML = line.split(',')[2] + '\t';
            searchList.appendChild(option);
        }
    });

    // Bit1000 search options
    let thirdCounter = 1;
    let secondCounter = 0;
    CurrentIndex = undefined;
    (sessionStorage.getItem('Bit1000') || '').split('\n').forEach(line => {
        if (line[0] === '#') {
            CurrentIndex = line.replace('#', '');
            secondCounter = 0;
            thirdCounter++;
        } else if (CurrentIndex) {
            const option = document.createElement('a');
            option.setAttribute('onclick', `document.getElementById("constant${CurrentIndex}").childNodes[0].childNodes[${secondCounter}].childNodes[0].click(); DynamicMenuOpenTool(${Number(CurrentIndex)})`);
            option.id = 'SearchDialogMessageOption';
            option.innerHTML = `Hyd ${Math.floor((thirdCounter + 1) / 3)} | ${line.split(',')[3]}\t`;
            searchList.appendChild(option);
            secondCounter++;
        }
    });
}