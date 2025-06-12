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
    const title = document.createElement('h5');
    title.id = 'WorkSpaceTitle';
    title.className = 'mb-3';
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

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'mb-3';
    const descriptionP = document.createElement('p');
    descriptionP.id = 'description';
    descriptionP.className = 'text-muted';
    descriptionP.innerHTML = descriptionText;
    descriptionDiv.appendChild(descriptionP);
    topDefineTable.appendChild(descriptionDiv);

    // Serial number input or display (Bootstrap form-group)
    const formGroup = document.createElement('div');
    formGroup.className = 'mb-3';

    const serialLabel = document.createElement('label');
    serialLabel.id = 'ReadTitle';
    serialLabel.className = 'form-label fw-bold';
    serialLabel.innerHTML = LanguageDict["TruckSerialNumber"];

    formGroup.appendChild(serialLabel);

    if (Number(writePermissionDict[serialId]) <= Number(sessionStorageService.get('AccessLevel'))) {
        const serialInput = document.createElement('input');
        serialInput.id = 'SerialInput';
        serialInput.type = 'number';
        serialInput.className = 'form-control w-auto d-inline-block ms-2';
        serialInput.style.textAlign = 'right';
        serialInput.value = lineArr[3];
        serialInput.onchange = () => updateSerialNumber(lineArr);

        formGroup.appendChild(serialInput);
    } else {
        const serialValue = document.createElement('span');
        serialValue.id = 'ReadResult';
        serialValue.className = 'ms-2';
        serialValue.innerHTML = lineArr[3];
        formGroup.appendChild(serialValue);
    }

    topDefineTable.appendChild(formGroup);

    // Optionally, add a Bootstrap card for further UI if needed
    const serialDiv = document.createElement('div');
    serialDiv.className = 'card my-3';
    const serialCardBody = document.createElement('div');
    serialCardBody.className = 'card-body p-2';
    const serialTable = document.createElement('table');
    serialTable.className = 'table table-sm mb-0';
    const serialTR = document.createElement('tr');
    serialTable.appendChild(serialTR);
    serialCardBody.appendChild(serialTable);
    serialDiv.appendChild(serialCardBody);
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
        serialInput.classList.add('bg-primary', 'text-white');
    }
}