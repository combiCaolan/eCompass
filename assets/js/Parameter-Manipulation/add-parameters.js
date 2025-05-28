/**
 * Adds a parameter by LineNumber from the GeneralDefault.clp file to sessionStorage.
 * Updates ParametersPresent and calls the display function.
 */
function AddParameter(LineNumber) {
    alert(LineNumber);

    const GeneralDefaultPath = 'http://167.71.128.196/API-Comparison/GeneralDefault.clp';
    let GeneralDefault = '';
    let LineToAdd = '';
    let counter = 0;

    // Load GeneralDefault.clp file synchronously
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", GeneralDefaultPath, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)) {
            const results = rawFile.responseText;
            if (results === '') {
                ErrorMessage('Alert', 'That file is empty? Please choose another');
            } else {
                GeneralDefault = results;
            }
        }
    };
    rawFile.send(null);

    // Find the line to add
    const lines = GeneralDefault.split('\n');
    while (lines[counter] !== undefined) {
        if (lines[counter] === "") {
            ErrorMessage('Parameter Error', 'This Parameter can not be added');
            return;
        }
        if (lines[counter].split(',')[0] == LineNumber) {
            LineToAdd = lines[counter];
            break;
        }
        counter++;
    }

    // Insert the new parameter in the correct position
    const IndexNumber = LineToAdd.split(',')[0];
    counter = 0;
    const parametersArr = sessionStorage.getItem('Parameters').split('\n');
    while (parametersArr[counter] !== undefined) {
        if (Number(parametersArr[counter].split(',')[0]) < IndexNumber) {
            counter++;
        } else {
            break;
        }
    }
    const LineToEdit = parametersArr[counter - 1];
    const NewParameterLocalStorage = sessionStorage.getItem('Parameters').replace(
        String(LineToEdit),
        String(LineToEdit) + '\n' + LineToAdd
    );
    sessionStorage.setItem('Parameters', NewParameterLocalStorage);

    // Update ParametersPresent
    let ParCounter = 0;
    ParametersPresent = [];
    const Parameters = sessionStorage.getItem('Parameters').split('\n');
    while (Parameters[ParCounter] !== undefined) {
        ParametersPresent.push(Parameters[ParCounter].split(',')[0]);
        ParCounter++;
    }

    // Optionally, call the display function
    // TreeViewClick(document.getElementById(LineNumber), LineNumber);
}