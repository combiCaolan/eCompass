/**
 * Compare.js
 * 
 * Provides functionality to compare two parameter files (.clp) and display differences.
 * Also allows users to add missing parameters found in one file but not the other.
 * 
 * Best practices:
 * - Uses let/const for variable declarations
 * - Adds docstrings and inline comments
 * - Uses descriptive variable names
 * - Handles errors gracefully
 */

let LabelDict = {};

/**
 * Opens a file dialog to select a .clp file for comparison.
 * Stores the file content in sessionStorage and updates the UI.
 */
function PostCompareFile() {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            const data = readerEvent.target.result;
            sessionStorage.setItem("CompareParametersFile", data);
            document.getElementById('ContentDiv').style.display = "block";
            document.getElementById('SecondFileName').innerHTML = input.value;
            document.getElementById('FirstFileName').innerHTML = sessionStorage.getItem('ParametersFileName');
            if (!data) return;
        };
    };

    input.click();
}

/**
 * Compares the loaded parameter file with the one selected for comparison.
 * Displays differences and missing parameters in the UI.
 */
function Compare() {
    let missingParameters = [];
    let linesInLeft = 0;
    let linesInRight = 0;

    const fileOne = sessionStorage.getItem('Parameters');
    const fileTwo = sessionStorage.getItem('CompareParametersFile');

    if (!fileOne || !fileTwo) {
        alert('There seems to be a problem here - function not working.');
        return;
    }

    if (fileOne === fileTwo) {
        document.getElementById('results').innerHTML += '<p class="identicalTag">Files Are Identical</p>';
        return;
    }

    const linesOne = fileOne.split('\n');
    const linesTwo = fileTwo.split('\n');

    // Get parameter IDs from both files
    const paramsOne = linesOne.map(line => line.split(',')[0]);
    const paramsTwo = linesTwo.map(line => line.split(',')[0]);
    linesInLeft = paramsOne.length;
    linesInRight = paramsTwo.length;

    // Find parameters not present in both files
    missingParameters = [
        ...paramsOne.filter(id => !paramsTwo.includes(id)),
        ...paramsTwo.filter(id => !paramsOne.includes(id))
    ];

    // Remove lines with missing parameters from both files for comparison
    const filteredLinesOne = linesOne.filter(line => !missingParameters.includes(line.split(',')[0]));
    const filteredLinesTwo = linesTwo.filter(line => !missingParameters.includes(line.split(',')[0]));

    // Compare remaining lines by parameter ID
    const fieldNames = [
        'LineNumber', 'Unused', 'Unused2', 'Label', 'ValueCurrent', 'Default', 'Factory', 'Min', 'Max', 'Units', 'Scale', 'UserRead', 'UserWrite'
    ];
    for (let i = 0; i < Math.min(filteredLinesOne.length, filteredLinesTwo.length); i++) {
        const partsOne = filteredLinesOne[i].split(',');
        const partsTwo = filteredLinesTwo[i].split(',');
        const paramId = partsOne[0];

        if (paramId === partsTwo[0]) {
            for (let d = 0; d < Math.max(partsOne.length, partsTwo.length); d++) {
                if (partsOne[d] !== partsTwo[d]) {
                    let fieldLabel = '';
                    switch (d) {
                        case 4: fieldLabel = 'Current Value'; break;
                        case 5: fieldLabel = 'Default Value'; break;
                        case 6: fieldLabel = 'Factory Value'; break;
                        case 7: fieldLabel = 'Min Value'; break;
                        case 8: fieldLabel = 'Max Value'; break;
                        default: continue;
                    }
                    document.getElementById('results').innerHTML +=
                        `<p onclick="TreeViewClick(document.getElementById('${paramId}'),'${paramId}')"
                                class="DifferentTag">[On Line ${paramId}] ${LabelDict[paramId] || ''} the ${fieldLabel} is different</p>`;
                }
            }
        }
    }

    // Show missing parameters and provide option to add them
    if (missingParameters.length > 0) {
        document.getElementById('AddParametersQuery').setAttribute('style', 'overflow:auto; height:200px; background:whitesmoke;');
        for (const paramId of missingParameters) {
            document.getElementById('AddParametersQuery').innerHTML +=
                `<input type="submit" onclick="AddParameter(${paramId})" value="${LabelDict[paramId] || paramId}"/> <br/><br/>`;
        }
        document.getElementById('results').innerHTML += ' Missing These Parameters ' + missingParameters.join(', ');
    }
}

/**
 * Clears the comparison results and missing parameters UI.
 */
function Clear() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('AddParametersQuery').innerHTML = '';
}

/**
 * Populate LabelDict with parameter labels from sessionStorage.
 */
try {
    const parameterMain = sessionStorage.getItem('ParameterMain');
    if (parameterMain) {
        const parameterLines = parameterMain.split('\n');
        for (const line of parameterLines) {
            const parts = line.split(',');
            if (parts.length > 3) {
                LabelDict[parts[0]] = parts[3];
            }
        }
    }
} catch (err) {
    // Handle errors silently or log if needed
}