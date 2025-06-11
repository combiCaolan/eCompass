import { MenuParametersOnclick } from './Parameter-Types/FixedParameters.js';

/**
 * Utility functions to update parameter values in sessionStorage.
 * Each function updates a specific parameter field by line number.
 */

export function updateParameter(lineNumber, fieldIndex, newValue) {
    const parameters = (sessionStorage.getItem('Parameters') || '').split('\n');
    let updated = false;
    for (let i = 0; i < parameters.length; i++) {
        const fields = parameters[i].split(',');
        if (fields[0] === String(lineNumber)) {
            fields[fieldIndex] = newValue;
            parameters[i] = fields.join(',');
            updated = true;
            break;
        }
    }
    if (updated) {
        sessionStorage.setItem('Parameters', parameters.join('\n'));
        window.ChangesMadePreDownload = true;
    }
}

export function UpdateCurrentValue(lineNumber, newValue) {
    updateParameter(lineNumber, 1, newValue);
}

export function UpdateDefaultValue(lineNumber, newValue) {
    updateParameter(lineNumber, 2, newValue);
}

export function UpdateFactoryValue(lineNumber, newValue) {
    updateParameter(lineNumber, 3, newValue);
}

export function UpdateMinValue(lineNumber, newValue) {
    updateParameter(lineNumber, 4, newValue);
}

export function UpdateMaxValue(lineNumber, newValue) {
    updateParameter(lineNumber, 5, newValue);
}

/**
 * Updates the current value for a parameter using a dropdown and logs the change.
 * @param {string} parameterLine - The CSV line for the parameter.
 */
export function MocasUpdate(parameterLine) {
    const fields = parameterLine.split(',');
    const paramId = fields[0];
    const dropdown = document.getElementById('CurrentDropDownValue');
    if (!dropdown) return;

    const currentValue = dropdown.value.replace('\r', '');
    fields[1] = currentValue;
    const newLine = fields.join(',');

    // Log the change
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const changeTo = selectedOption ? selectedOption.innerHTML : currentValue;
    const parameterTitleElem = document.getElementById('WorkSpaceTitle');
    const parameterTitle = parameterTitleElem ? parameterTitleElem.innerHTML : '';
    const username = sessionStorage.getItem('loggedinusername') || 'Unknown user';
    const logLine = `${username} changed ${parameterTitle} [Current Value] to ${changeTo}\n`;
    const currentLogs = sessionStorage.getItem('UserMadeChanges') || '';
    sessionStorage.setItem('UserMadeChanges', currentLogs + logLine);

    // Update Parameters in sessionStorage
    const parameters = (sessionStorage.getItem('Parameters') || '').split('\n');
    for (let i = 0; i < parameters.length; i++) {
        if (parameters[i].replace(/\n/g, '') === parameterLine.replace(/\n/g, '')) {
            parameters[i] = newLine;
            break;
        }
    }
    sessionStorage.setItem('Parameters', parameters.join('\n'));
    window.ChangesMadePreDownload = true;

    // Update UI and trigger click
    const paramElem = document.getElementById(paramId);
    if (paramElem) {
        paramElem.onclick = function () { MenuParametersOnclick(newLine, this); };
        paramElem.click();
    }
}