import sessionStorageService from "../../modules/sessionStorageService.js";

/**
 * Handles parameter changes in the workspace UI.
 * Cleans up UI, validates, scales, and updates session storage.
 */
export function parameterchange(lineNumber, parameterType, oldValue, line) {
    let newLine = null;
    let logMsgParType;
    const currentLineSplit = line.split(',');
    const scale = Number(currentLineSplit[7]);
    const scaled = scale !== 1;

    // Helper to get and style an input by id
    function highlightInput(id) {
        const el = document.getElementById(id);
        if (el) {
            el.style.background = 'blue';
            el.style.color = 'white';
            return el.value;
        }
        return '';
    }

    // Highlight and get value based on parameterType
    switch (parameterType) {
        case "CurrentValue":
            logMsgParType = highlightInput('WorkSpaceCurrentValue');
            break;
        case "MaxValue":
            logMsgParType = highlightInput('WorkSpaceMaxValue');
            break;
        case "MinValue":
            logMsgParType = highlightInput('WorkSpaceMinValue');
            break;
        case "DefaultValue":
            logMsgParType = highlightInput('WorkSpaceDefaultValue');
            break;
        case "FactoryValue":
            logMsgParType = highlightInput('WorkSpaceFactoryValue');
            break;
        default:
            logMsgParType = '';
    }

    // Apply scaling if needed
    if (scaled) {
        logMsgParType = logMsgParType * scale;
    }

    // Log the change
    const logMsg = `${sessionStorage.getItem('loggedinusername')} changed ${parameterType} from ${oldValue} to ${logMsgParType}`;
    const userLogMsg = sessionStorage.getItem('UserMadeChanges') || '';
    sessionStorage.setItem('UserMadeChanges', userLogMsg + '\n' + logMsg);

    // Validate empty values
    function checkEmpty(id, idx, msg) {
        const el = document.getElementById(id);
        if (el && el.value === "") {
            ErrorMessageDialog('Update Issue', msg);
            el.value = currentLineSplit[idx];
            return true;
        }
        return false;
    }

    if (Number(sessionStorageService.get('AccessLevel')) === 8) {
        // if (checkEmpty('WorkSpaceCurrentValue', 1, ErrorMessageUpdateIssue)) return;
        if (checkEmpty('WorkSpaceMaxValue', 5, 'Max Value is empty? Setting Back to Previous Value')) return;
        if (checkEmpty('WorkSpaceMinValue', 4, 'Min Value is empty? Setting Back to Previous Value')) return;
        if (checkEmpty('WorkSpaceDefaultValue', 2, 'Default Value is empty? Setting Back to Previous Value')) return;
        if (checkEmpty('WorkSpaceFactoryValue', 3, 'Factory Value is empty? Setting Back to Previous Value')) return;
    } else {
        if (checkEmpty('WorkSpaceCurrentValue', 1, 'Current Value is empty? Setting Back to Previous Value')) return;
    }

    // Out of scale checks
    function checkScale(type, idx, msg) {
        const el = document.getElementById(type);
        if (!el) return false;
        let value = Number(el.value);
        if (scaled) value *= scale;
        if (value > Number(currentLineSplit[5])) {
            ErrorMessageDialog('Scale Issue', `You cannot make your ${msg} larger than your maximum value`);
            el.value = currentLineSplit[idx];
            return true;
        }
        if (value < Number(currentLineSplit[4])) {
            ErrorMessageDialog('Scale Issue', `You cannot make your ${msg} smaller than your minimum value`);
            el.value = currentLineSplit[idx];
            return true;
        }
        return false;
    }

    if (parameterType === "CurrentValue" && checkScale('WorkSpaceCurrentValue', 1, 'current value')) return;
    if (parameterType === "DefaultValue" && checkScale('WorkSpaceDefaultValue', 2, 'Default value')) return;
    if (parameterType === "FactoryValue" && checkScale('WorkSpaceFactoryValue', 3, 'Factory value')) return;

    // Not a number checks
    function checkNaN(id, idx, msg) {
        const el = document.getElementById(id);
        if (el && isNaN(el.value)) {
            ErrorMessageDialog('Not Number Value', msg);
            el.value = currentLineSplit[idx];
            return true;
        }
        return false;
    }

    if (parameterType === "CurrentValue" && checkNaN('WorkSpaceCurrentValue', 1, 'A non number has been placed in the current value input')) return;
    if (parameterType === "MinValue" && checkNaN('WorkSpaceMinValue', 4, 'A non number has been placed in the min value input')) return;
    if (parameterType === "MaxValue" && checkNaN('WorkSpaceMaxValue', 5, 'A non number has been placed in the max value input')) return;
    if (parameterType === "DefaultValue" && checkNaN('WorkSpaceDefaultValue', 2, 'A non number has been placed in the Default value input')) return;
    if (parameterType === "FactoryValue" && checkNaN('WorkSpaceFactoryValue', 3, 'A non number has been placed in the Factory value input')) return;

    // Build new line
    function buildLine(values) {
        return JSON.stringify(values.join(','));
    }

    if (Number(sessionStorageService.get('AccessLevel')) === 8) {
        switch (parameterType) {
            case 'CurrentValue':
                newLine = buildLine([
                    currentLineSplit[0],
                    scaled ? Number(document.getElementById('WorkSpaceCurrentValue').value) * scale : document.getElementById('WorkSpaceCurrentValue').value,
                    currentLineSplit[2],
                    currentLineSplit[3],
                    currentLineSplit[4],
                    currentLineSplit[5],
                    currentLineSplit[6],
                    currentLineSplit[7],
                    currentLineSplit[8],
                    currentLineSplit[9],
                    currentLineSplit[10].replace('\r', '')
                ]);
                break;
            case 'MaxValue':
                newLine = buildLine([
                    currentLineSplit[0],
                    currentLineSplit[1],
                    currentLineSplit[2],
                    currentLineSplit[3],
                    currentLineSplit[4],
                    scaled ? document.getElementById('WorkSpaceMaxValue').value * scale : document.getElementById('WorkSpaceMaxValue').value,
                    currentLineSplit[6],
                    currentLineSplit[7],
                    currentLineSplit[8],
                    currentLineSplit[9],
                    currentLineSplit[10].replace('\r', '')
                ]);
                break;
            case 'MinValue':
                newLine = buildLine([
                    currentLineSplit[0],
                    currentLineSplit[1],
                    currentLineSplit[2],
                    currentLineSplit[3],
                    scaled ? document.getElementById('WorkSpaceMinValue').value * scale : document.getElementById('WorkSpaceMinValue').value,
                    currentLineSplit[5],
                    currentLineSplit[6],
                    currentLineSplit[7],
                    currentLineSplit[8],
                    currentLineSplit[9],
                    currentLineSplit[10].replace('\r', '')
                ]);
                break;
            case 'DefaultValue':
                newLine = buildLine([
                    currentLineSplit[0],
                    currentLineSplit[1],
                    scaled ? document.getElementById('WorkSpaceDefaultValue').value * scale : document.getElementById('WorkSpaceDefaultValue').value,
                    currentLineSplit[3],
                    currentLineSplit[4],
                    currentLineSplit[5],
                    currentLineSplit[6],
                    currentLineSplit[7],
                    currentLineSplit[8],
                    currentLineSplit[9],
                    currentLineSplit[10].replace('\r', '')
                ]);
                break;
            case 'FactoryValue':
                newLine = buildLine([
                    currentLineSplit[0],
                    currentLineSplit[1],
                    currentLineSplit[2],
                    scaled ? document.getElementById('WorkSpaceFactoryValue').value * scale : document.getElementById('WorkSpaceFactoryValue').value,
                    currentLineSplit[4],
                    currentLineSplit[5],
                    currentLineSplit[6],
                    currentLineSplit[7],
                    currentLineSplit[8],
                    currentLineSplit[9],
                    currentLineSplit[10].replace('\r', '')
                ]);
                break;
        }
    } else if (parameterType === 'CurrentValue') {
        newLine = buildLine([
            currentLineSplit[0],
            scaled ? Number(document.getElementById('WorkSpaceCurrentValue').value) * scale : document.getElementById('WorkSpaceCurrentValue').value,
            currentLineSplit[2],
            currentLineSplit[3],
            currentLineSplit[4],
            currentLineSplit[5],
            currentLineSplit[6],
            currentLineSplit[7],
            currentLineSplit[8],
            currentLineSplit[9],
            currentLineSplit[10].replace('\r', '')
        ]);
    }

    // Update session storage
    if (newLine) {
        const newLineStr = newLine.replace(/"/g, '');
        let parameters = sessionStorage.getItem('Parameters');
        parameters = parameters.replace(line, newLineStr);
        sessionStorage.setItem('Parameters', parameters);

        if (sessionStorage.getItem('Parameters') === parameters) {
            window.ChangesMadePreDownload = true;
        }
    }
}