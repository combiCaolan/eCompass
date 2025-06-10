import sessionStorageService from "../modules/sessionStorageService.js";

/**
 * Display and handle the serial number parameter UI.
 * @param {Array} lineArr - The parameter line array.
 * @param {HTMLElement} object - The DOM element (not used, always gets id '4').
 */
export function SerialNumberFunction(lineArr, object) {
    const serialId = '4';
    const topDefineTable = document.getElementById('topDefineTable');
    topDefineTable.innerHTML = ''; // Clear previous content

    const serialElem = document.getElementById(serialId);
    if (!serialElem) return;

    // Title
    const title = document.createElement('p');
    title.id = 'WorkSpaceTitle';
    title.innerHTML = serialElem.innerHTML;
    topDefineTable.appendChild(title);

    // Description
    let descriptionText = '';
    const descriptionDirectory = sessionStorage.getItem('DescriptionMain') || '';
    const descLines = descriptionDirectory.split('\n');
    for (let i = 0; i < descLines.length; i++) {
        if (descLines[i][0] === '#' && descLines[i].replace('#', '').replace('\r', '') === lineArr[0]) {
            descriptionText = descLines[i + 1] || '';
            break;
        }
    }

    const trDescription = document.createElement('tr');
    const descriptionDiv = document.createElement('div');
    const descriptionP = document.createElement('p');
    descriptionP.id = 'description';
    descriptionP.innerHTML = descriptionText;
    descriptionDiv.appendChild(descriptionP);
    trDescription.appendChild(descriptionDiv);
    topDefineTable.appendChild(trDescription);

    // Serial number input or display
    const serialLabel = document.createElement('p');
    serialLabel.id = 'ReadTitle';
    serialLabel.innerHTML = `${LanguageDict["TruckSerialNumber"]}<br/>`;

    if (Number(writePermissionDict[serialId]) <= Number(sessionStorageService.get('AccessLevel'))) {
        const serialInput = document.createElement('input');
        serialInput.id = 'SerialInput';
        serialInput.type = 'number';
        serialInput.style.float = 'left';
        serialInput.style.textAlign = 'right';
        serialInput.value = lineArr[3];
        serialInput.onchange = () => updateSerialNumber(lineArr);

        topDefineTable.appendChild(serialLabel);
        topDefineTable.appendChild(serialInput);
    } else {
        const serialValue = document.createElement('p');
        serialValue.id = 'ReadResult';
        serialValue.innerHTML = lineArr[3];
        topDefineTable.appendChild(serialLabel);
        topDefineTable.appendChild(serialValue);
    }

    // Optionally, add a container for further UI if needed
    const serialDiv = document.createElement('div');
    serialDiv.style.margin = '10px';
    serialDiv.style.padding = '15px';
    const serialTable = document.createElement('table');
    const serialTR = document.createElement('tr');
    serialTable.appendChild(serialTR);
    serialDiv.appendChild(serialTable);
    topDefineTable.appendChild(serialDiv);
}

/**
 * Update the serial number in sessionStorage and refresh the UI.
 * @param {Array|string} lineArr - The parameter line array or CSV string.
 */
function updateSerialNumber(lineArr) {
    // Accept both array and string input for backward compatibility
    const line = Array.isArray(lineArr) ? lineArr : (typeof lineArr === 'string' ? lineArr.split(',') : []);
    if (line.length < 11) return;

    // Build new line with updated serial number
    const newSerial = document.getElementById('SerialInput').value.replace(/[^0-9.]/g, "");
    const newLine = [
        line[0], line[1], line[2], newSerial,
        line[4], line[5], line[6], line[7], line[8], line[9], line[10]
    ].join(',');

    // Replace old line in Parameters
    const parameters = sessionStorage.getItem('Parameters') || '';
    const oldLine = line.join(',');
    const newParameters = parameters.replace(oldLine, newLine);
    sessionStorage.setItem('Parameters', newParameters);

    // Refresh the serial number UI
    const serialElem = document.getElementsByName('4')[0];
    if (serialElem) {
        TreeViewClick(serialElem, "4");
    }

    // Highlight the input box to indicate change
    const serialInput = document.getElementById('SerialInput');
    if (serialInput) {
        serialInput.style.backgroundColor = 'blue';
        serialInput.style.color = 'white';
    }
}