// Remove all occurrences of specified values from an array
function removeA(arr, ...values) {
    for (const value of values) {
        let idx;
        while ((idx = arr.indexOf(value)) !== -1) {
            arr.splice(idx, 1);
        }
    }
    return arr;
}

// Handles export tick box functionality - adds/removes parameter from removal arrays
function exportonchange(LineNumber, checkboxinput) {
    const Parameters = sessionStorage.getItem('Parameters').split('\n');
    let counter = 0;
    while (typeof Parameters[counter] !== "undefined") {
        if (Parameters[counter].split(',')[0] == LineNumber) {
            removedParameters.push(Parameters[counter]);
            break;
        }
        counter++;
    }

    if (!removedParametersCounters.includes(Parameters[counter])) {
        CancelledParameter = Parameters[counter];
        removedParametersCounters.push(Parameters[counter]);
        document.getElementById('topDefine').style.opacity = "0.4";
    } else {
        removeA(removedParametersCounters, Parameters[counter]);
        document.getElementById('topDefine').style.opacity = "1";
    }
}