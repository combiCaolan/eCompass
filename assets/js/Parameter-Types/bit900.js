import sessionStorageService from "../modules/sessionStorageService.js";

/**
 * Displays bit options for a Bit999 parameter, allowing the user to select and update bit values.
 * Bootstrap-friendly version.
 * @param {string} line - The parameter line (CSV string).
 * @param {HTMLElement} clickedButton - The button that was clicked.
 */
export function Bit999DisplayOptionsFunction(line, clickedButton) {
    const descElem = document.getElementById('topDefineDescription');
    descElem.innerHTML = '';

    const index = line.split(',')[0];
    const constantElem = document.getElementById('constant' + index);
    if (constantElem.innerHTML !== '') {
        constantElem.innerHTML = '';
        return;
    }

    // Parse bit values
    const currentValue = parseInt(line.split(',')[1], 10);
    const defaultValue = parseInt(line.split(',')[2], 10);
    const factoryValue = parseInt(line.split(',')[3], 10);

    // Get bits as arrays (32 bits)
    const getBits = (octet) => Array.from({ length: 32 }, (_, i) => (octet & (1 << i)) ? 1 : 0);
    const bits = getBits(currentValue);
    const defaultBits = getBits(defaultValue);
    const factoryBits = getBits(factoryValue);

    // Find Bit999 directory line for this parameter
    const bit999Dir = sessionStorage.getItem('Bit999').split('\n');
    let bitLine = null;
    for (let i = 0; i < bit999Dir.length; i++) {
        if (bit999Dir[i][0] === '#' && bit999Dir[i].replace('#', '').replace(/\r/g, '') === index) {
            bitLine = i + 1;
            break;
        }
    }
    if (bitLine === null) return;

    // Title and Description (Bootstrap)
    // const title = document.createElement('h5');
    // title.id = 'WorkSpaceTitle';
    // title.className = 'mb-2';
    // title.innerHTML = clickedButton.innerHTML;

    const description = document.createElement('p');
    description.className = 'text-muted mb-3';
    description.setAttribute('id','description');
    description.innerHTML = MainDescriptionsDict[index] !== undefined
        ? MainDescriptionsDict[index].replace('#' + index, '')
        : "This parameter's description is not present";

    // Export checkbox (Bootstrap form-check)
    // const exportDiv = document.createElement('div');
    // exportDiv.className = 'form-check form-switch mb-3';
    // const switchParameter = document.createElement("input");
    // switchParameter.type = 'checkbox';
    // switchParameter.className = 'form-check-input';
    // switchParameter.id = "SwitchParameterCheckbox";
    // switchParameter.checked = !removedParametersCounters.includes(String(line));
    // descElem.style.opacity = switchParameter.checked ? 1 : 0.4;
    // switchParameter.onchange = function () {
    //     exportonchange(line.split(',')[0], this);
    // };
    // const switchParameterLabel = document.createElement("label");
    // switchParameterLabel.className = 'form-check-label ms-2';
    // switchParameterLabel.setAttribute('for', 'SwitchParameterCheckbox');
    // switchParameterLabel.innerHTML = LanguageDict["Export"];
    // exportDiv.appendChild(switchParameter);
    // exportDiv.appendChild(switchParameterLabel);

    // Option list (Bootstrap list-group)
    const unorderedList = document.createElement('ul');
    unorderedList.id = 'Bit999DropDownDiv';
    unorderedList.className = 'list-group mb-3';

    let bitCounter = 1;
    let lineIdx = bitLine;
    while (bit999Dir[lineIdx] && bit999Dir[lineIdx][0] !== '#') {
        const bitParts = bit999Dir[lineIdx].split(',');
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item p-1';

        const input = document.createElement('button');
        input.type = 'button';
        input.id = 'Bitnineninenine' + bitCounter;
        input.textContent = ' - ' + bitParts[2];
        input.className = 'btn btn-outline-primary btn-sm ThirdSubGroup w-100 text-start';
        if (bitParts[2]) input.name = bitParts[2].replace(/ /g, '');
        input.onclick = function () {
            BitDropDown999(
                index,
                bitParts[0],
                bitParts[1],
                clickedButton.innerHTML,
                bitParts[2].replace(/\n/g, '').replace(/\r/g, ''),
                bits,
                defaultBits,
                factoryBits,
                bitCounter
            );
        };
        listItem.appendChild(input);
        unorderedList.appendChild(listItem);
        lineIdx++;
        bitCounter++;
    }

    // Compose and append
    // constantElem.appendChild(title);
    constantElem.appendChild(description);
    // constantElem.appendChild(exportDiv);
    constantElem.appendChild(unorderedList);
    $('#topDefineDescription').fadeIn();
}

/**
 * Handles the selection of a bit option for Bit999 parameters.
 * Updates the parameter value in sessionStorage and refreshes the UI.
 * Bootstrap-friendly version.
 */
export function BitDropDown999(
    parentParameterIndex,
    bit,
    dropDownIndex,
    parentParameterName,
    parameterBitName,
    bitResults,
    defaultBitResults,
    factoryBitResults,
    bitButtonCounter
) {
    // Deselect all previously selected
    try {
        Array.from(document.getElementsByClassName('SelectedThirdSubGroup')).forEach(elem => {
            elem.className = 'btn btn-outline-primary btn-sm ThirdSubGroup w-100 text-start';
        });
    } catch (err) {}

    // Highlight selected
    const whichNumber = Number(bitButtonCounter) - 1;
    document.getElementById("constant" + parentParameterIndex)
        .querySelectorAll('.list-group-item')[whichNumber - 1]
        .querySelector('button').className = 'btn btn-primary btn-sm SelectedThirdSubGroup w-100 text-start';

    // Clear UI
    document.getElementById('topDefineDescription').innerHTML = '';
    document.getElementById('topDefineTable').innerHTML = '';

    // Title and Description (Bootstrap)
    const title = document.createElement('h5');
    title.id = 'WorkSpaceTitle';
    title.className = 'mb-2';
    title.innerHTML = parameterBitName;
    document.getElementById('topDefineTable').appendChild(title);

    const description = document.createElement('p');
    description.id = 'description';
    description.className = 'text-muted mb-3';
    description.innerHTML = SpecialDescriptionsDict[Number(parentParameterIndex + '.' + bitButtonCounter)];
    document.getElementById('topDefineDescription').appendChild(description);

    // Find dropdown options for this bit
    const dropDownFile = sessionStorage.getItem('DropDownlist');
    const dropDownLines = dropDownFile.split('\n');
    let dropDownLineNum = '';
    for (let i = 0; i < dropDownLines.length; i++) {
        if (dropDownLines[i][0] === '#' && dropDownLines[i].replace('#', '').replace(/\r/g, '') === dropDownIndex) {
            dropDownLineNum = i + 1;
            break;
        }
    }
    if (dropDownLineNum === '') {
        console.log('ERR * line The DropDown parameters file does not have this index referenced: ' + dropDownIndex);
        return;
    }

    // Labels
    const currentValueLabel = document.createElement('label');
    currentValueLabel.className = 'form-label mt-2';
    currentValueLabel.innerHTML = LanguageDict["CurrentValue"];

    const defaultValueLabel = document.createElement('label');
    defaultValueLabel.className = 'form-label mt-2';
    defaultValueLabel.innerHTML = LanguageDict["DefaultValue"];

    const factoryValueLabel = document.createElement('label');
    factoryValueLabel.className = 'form-label mt-2';
    factoryValueLabel.innerHTML = LanguageDict["FactoryValue"];

    // Build dropdowns or readonly fields (Bootstrap)
    const optionsDict = {};
    let dropDown, defaultValue, factoryValue;
    const canEdit = Number(writePermissionDict[parentParameterIndex]) <= Number(sessionStorageService.get('AccessLevel'));
    if (canEdit) {
        dropDown = document.createElement('select');
        defaultValue = document.createElement('select');
        factoryValue = document.createElement('select');
        dropDown.className = 'form-select mb-2 w-auto d-inline-block';
        defaultValue.className = 'form-select mb-2 w-auto d-inline-block';
        factoryValue.className = 'form-select mb-2 w-auto d-inline-block';
        dropDown.id = 'CurrentBitDropValue';
        defaultValue.id = 'DefaultBitDropValue';
        factoryValue.id = 'FactoryBitDropValue';
    } else {
        dropDown = document.createElement('span');
        defaultValue = document.createElement('span');
        factoryValue = document.createElement('span');
        dropDown.className = defaultValue.className = factoryValue.className = 'form-control-plaintext mb-2';
    }

    // Populate dropdowns
    let idx = dropDownLineNum;
    while (dropDownLines[idx] && dropDownLines[idx][0] !== '#') {
        const parts = dropDownLines[idx].split(',');
        const [optionText, optionValue] = [parts[0], parts[1]];
        optionsDict[optionValue] = optionText;

        if (canEdit) {
            const makeOption = (val, txt) => {
                const opt = document.createElement('option');
                opt.value = val;
                opt.innerHTML = txt;
                return opt;
            };
            dropDown.appendChild(makeOption(optionValue, optionText));
            defaultValue.appendChild(makeOption(optionValue, optionText));
            factoryValue.appendChild(makeOption(optionValue, optionText));
            if (Number(sessionStorageService.get('AccessLevel')) < 8) {
                defaultValue.disabled = true;
                factoryValue.disabled = true;
            }
        }
        idx++;
    }

    // Set values or text
    const getBitVal = (arr, bit) => Array.isArray(arr) ? arr[bit] : arr.split(',')[bit];
    if (canEdit) {
        dropDown.value = getBitVal(bitResults, bit);
        defaultValue.value = getBitVal(defaultBitResults, bit);
        factoryValue.value = getBitVal(factoryBitResults, bit);
    } else {
        dropDown.innerHTML = optionsDict[getBitVal(bitResults, bit)];
        defaultValue.innerHTML = optionsDict[getBitVal(defaultBitResults, bit)];
        factoryValue.innerHTML = optionsDict[getBitVal(factoryBitResults, bit)];
    }

    // Append to UI
    document.getElementById('topDefineDescription').appendChild(currentValueLabel);
    document.getElementById('topDefineDescription').appendChild(dropDown);
    document.getElementById('topDefineDescription').appendChild(defaultValueLabel);
    document.getElementById('topDefineDescription').appendChild(defaultValue);
    document.getElementById('topDefineDescription').appendChild(factoryValueLabel);
    document.getElementById('topDefineDescription').appendChild(factoryValue);

    // Set onchange handlers if editable
    if (canEdit) {
        dropDown.onchange = () => BitDropDownChange999(bitResults, bit, parentParameterIndex, "Current");
        defaultValue.onchange = () => BitDropDownChange999(defaultBitResults, bit, parentParameterIndex, "Default");
        factoryValue.onchange = () => BitDropDownChange999(factoryBitResults, bit, parentParameterIndex, "Factory");
    }
}

/**
 * Handles changes to a Bit999 dropdown value, updating the parameter in sessionStorage.
 * @param {string|Array} bitResults - Bit values as array or comma-separated string.
 * @param {number} bit - The bit index to update.
 * @param {string|number} lineNumber - The parameter index.
 * @param {string} updateType - "Current", "Default", or "Factory".
 */
export function BitDropDownChange999(bitResults, bit, lineNumber, updateType) {
    const currentBits = Array.isArray(bitResults) ? bitResults.slice() : bitResults.split(',');
    let desiredBit;
    if (updateType === 'Current') {
        desiredBit = document.getElementById('CurrentBitDropValue').value;
    } else if (updateType === 'Default') {
        desiredBit = document.getElementById('DefaultBitDropValue').value;
    } else if (updateType === 'Factory') {
        desiredBit = document.getElementById('FactoryBitDropValue').value;
    }

    // Update the bit array
    const newBits = currentBits.map((val, idx) => idx == bit ? desiredBit : val);

    // Convert bits to integer value
    let finalValue = 0;
    for (let i = 0; i <= 31; i++) {
        finalValue += Number(newBits[i]) * Math.pow(2, i);
    }

    // Update the parameter line in sessionStorage
    const parameters = sessionStorage.getItem('Parameters').split('\n');
    for (let i = 0; i < parameters.length; i++) {
        const paramParts = parameters[i].split(',');
        if (paramParts[0] == lineNumber) {
            let newLine;
            if (updateType === 'Current') {
                newLine = [paramParts[0], finalValue, paramParts[2], paramParts[3], paramParts[4], paramParts[5], paramParts[6], paramParts[7], paramParts[8], paramParts[9], paramParts[10]].join(',');
            } else if (updateType === 'Default') {
                newLine = [paramParts[0], paramParts[1], finalValue, paramParts[3], paramParts[4], paramParts[5], paramParts[6], paramParts[7], paramParts[8], paramParts[9], paramParts[10]].join(',');
            } else if (updateType === 'Factory') {
                newLine = [paramParts[0], paramParts[1], paramParts[2], finalValue, paramParts[4], paramParts[5], paramParts[6], paramParts[7], paramParts[8], paramParts[9], paramParts[10]].join(',');
            }
            parameters[i] = newLine;
            sessionStorage.setItem('Parameters', parameters.join('\n'));
            break;
        }
    }

    ChangesMadePreDownload = true;

    // Refresh UI
    const bitParameterName = document.getElementById('WorkSpaceTitle').innerHTML.replace(/ /g, '');
    treeViewClick(document.getElementById(lineNumber.toString()), lineNumber);
    treeViewClick(document.getElementById(lineNumber.toString()), lineNumber);
    document.getElementsByName(bitParameterName)[0].onclick();
}