/**
 * Adds a missing parameter to the CLP file in sessionStorage at the correct position.
 * Updates the UI and sessionStorage accordingly.
 * 
 * @param {number|string} lineNumber - The line number (or parameter ID) to add.
 */
function addParameterToClp(lineNumber) {
    console.log('start');
    // Retrieve the template file and parameters file from sessionStorage
    const templateFile = sessionStorage.getItem('TemplateFile');
    const parametersFile = sessionStorage.getItem('Parameters');

    if (!templateFile || !parametersFile) {
        console.error('TemplateFile or Parameters not found in sessionStorage.');
        return;
    }

    // Find the requested parameter line in the template file
    const templateLines = templateFile.split('\n');
    let requestedParameter = null;
    for (const line of templateLines) {
        if (line.split(',')[0] === lineNumber.toString()) {
            requestedParameter = line;
            break;
        }
    }

    if (!requestedParameter) {
        console.error('Requested parameter not found in TemplateFile.');
        return;
    }

    // Find the correct insertion index in the parameters file
    const parameterLines = parametersFile.split('\n');
    let insertIndex = parameterLines.length; // Default to end if not found
    for (let i = 0; i < parameterLines.length; i++) {
        const paramId = parameterLines[i].split(',')[0];
        if (Number(paramId) >= Number(lineNumber)) {
            insertIndex = i;
            break;
        }
    }

    // Insert the new parameter at the correct position
    parameterLines.splice(insertIndex, 0, requestedParameter);
    const newParametersFile = parameterLines.join('\n');
    sessionStorage.setItem('Parameters', newParametersFile);

    // Update the UI
    const element = document.getElementById(lineNumber);
    if (!element) {
        console.warn(`Element with id ${lineNumber} not found.`);
        return;
    }

    // If the element's onclick is TreeViewClick, reload the page to update the view
    if (element.getAttribute('onclick') && element.getAttribute('onclick').split('(')[0] === 'TreeViewClick') {
        location.reload();
    } else {
        // If ParametersPresent is defined and has this lineNumber, update the onclick handler and call MenuParametersOnclick
        if (typeof ParametersPresent !== 'undefined' && ParametersPresent[lineNumber] !== undefined) {
            element.setAttribute('onclick', `MenuParametersOnclick('${requestedParameter}',document.getElementById(${lineNumber}))`);
            MenuParametersOnclick(requestedParameter, element);
        } else {
            // Otherwise, call MenuParametersOnclick with 'empty'
            MenuParametersOnclick('empty', element);
        }
    }


    console.log('end');

    location.reload();


}