/**
 * Utility functions to update parameter values in sessionStorage.
 * Each function updates a specific parameter field by line number.
 */

function UpdateCurrentValue(LineNumber, NewValue) {
    updateParameter(LineNumber, 1, NewValue);
}

function UpdateDefaultValue(LineNumber, NewValue) {
    updateParameter(LineNumber, 2, NewValue);
}

function UpdateFactoryValue(LineNumber, NewValue) {
    updateParameter(LineNumber, 3, NewValue);
}

function UpdateMinValue(LineNumber, NewValue) {
    updateParameter(LineNumber, 4, NewValue);
}

function UpdateMaxValue(LineNumber, NewValue) {
    updateParameter(LineNumber, 5, NewValue);
}

// Generic parameter update helper
function updateParameter(LineNumber, fieldIndex, NewValue) {
    const parameters = sessionStorage.getItem('Parameters').split('\n');
    for (let i = 0; i < parameters.length; i++) {
        const fields = parameters[i].split(',');
        if (fields[0] === String(LineNumber)) {
            fields[fieldIndex] = NewValue;
            const newLine = fields.join(',');
            const newSession = sessionStorage.getItem('Parameters').replace(parameters[i], newLine);
            sessionStorage.setItem('Parameters', newSession);
            break;
        }
    }
}

/**
 * Updates the current value for a parameter using a dropdown and logs the change.
 */
function MocasUpdate(ParameterLine) {
    const NumberToFind = Number(ParameterLine.split(',')[0]);
    const currentValue = document.getElementById('CurrentDropDownValue').value.replace('\r', '');
    const fields = ParameterLine.split(',');
    fields[1] = currentValue;
    const NewLine = fields.join(',');

    const ChangeTo = document.getElementById('CurrentDropDownValue').options[
        document.getElementById('CurrentDropDownValue').selectedIndex
    ].innerHTML;

    const CurrentParameterTitle = document.getElementById('WorkSpaceTitle').innerHTML;
    const LogLine = `${sessionStorage.getItem('loggedinusername')} changed ${CurrentParameterTitle} [Current Value] to ${ChangeTo}\n`;
    const CurrentLogs = sessionStorage.getItem('UserMadeChanges');
    sessionStorage.setItem('UserMadeChanges', CurrentLogs + LogLine);

    const New = sessionStorage.getItem('Parameters').replace(ParameterLine.replace(/\n/g, ''), NewLine.replace(/\n/g, ''));
    sessionStorage.setItem('Parameters', New);
    window.ChangesMadePreDownload = true;

    const paramElem = document.getElementById(NumberToFind.toString());
    if (paramElem) {
        paramElem.setAttribute('onclick', 'MenuParametersOnclick(`' + NewLine + '`,this)');
        paramElem.click();
    }
}

function UpdateMocasPermission() {
    alert('Update Mocas Permission');
}