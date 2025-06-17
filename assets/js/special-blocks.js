// --- Pure Utility Functions ---

/**
 * Parse parameters from a string.
 */
export function parseParameters(paramStr) {
    return paramStr.split('\n').filter(Boolean).map(line => line.split(','));
}

/**
 * Serialize parameters back to string.
 */
export function serializeParameters(paramArr) {
    return paramArr.map(arr => arr.join(',')).join('\n') + '\n';
}

/**
 * Set all current values to default for parameters.
 */
export function setDefaults(paramArr) {
    return paramArr.map(parts => {
        if (Number(parts[0]) > 99) return parts;
        // [id, current, default, ...]
        parts[1] = parts[2];
        return parts;
    });
}

/**
 * Set all current values to factory for parameters.
 */
export function setFactory(paramArr) {
    return paramArr.map(parts => {
        if (Number(parts[0]) > 99) return parts;
        parts[1] = parts[3];
        return parts;
    });
}

// --- Side Effect Functions ---

/**
 * Update sessionStorage and log for a given action.
 */
function updateParametersAndLog(newParams, actionMsg) {
    sessionStorage.setItem('Parameters', newParams);
    const time = new Date().toLocaleTimeString();
    const logMsg = `${time} * ${actionMsg} <br/>\n`;
    document.getElementById('SpecialBlockLog').innerHTML += logMsg;
    const currentUserLog = sessionStorage.getItem('UserMadeChanges') || '';
    sessionStorage.setItem('UserMadeChanges', currentUserLog + '\n' + actionMsg);
    window.CurentFileActionLog = document.getElementById('SpecialBlockLog').innerHTML;
}

/**
 * Handler for setting defaults.
 */
export function SBSetDefaults() {
    if (!confirm(LanguageDict['FileActionsDefaultCheckMsg'])) return;
    const paramStr = sessionStorage.getItem('Parameters');
    const paramArr = parseParameters(paramStr);
    const newArr = setDefaults(paramArr);
    const newStr = serializeParameters(newArr);
    updateParametersAndLog(newStr, 'All Current Values set back to Default');
    alert('Successfully set Parameters back to Default');
}

/**
 * Handler for setting factory.
 */
export function SBSetFactoryHandler() {
    if (!confirm(LanguageDict['FileActionsFactoryCheckMsg'])) return;
    const paramStr = sessionStorage.getItem('Parameters');
    const paramArr = parseParameters(paramStr);
    const newArr = setFactory(paramArr);
    const newStr = serializeParameters(newArr);
    updateParametersAndLog(newStr, 'All Current Values set back to Factory');
    alert('Successfully set Parameters back to Factory');
}

// ...repeat for MakeDefaultFileActions, MakeFactoryFileActions, etc.

// --- Example: Attach to window for legacy code or UI ---
window.SBSetDefaults = SBSetDefaults;
window.SBSetFactory = SBSetFactoryHandler;