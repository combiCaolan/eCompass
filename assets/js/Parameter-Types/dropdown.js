import sessionStorageService from "../modules/sessionStorageService.js";

// --- Data Helpers ---

function getOptionIndex(parameterMain, numberToFind) {
    let optionIndex = null;
    parameterMain.split('\n').forEach(line => {
        const parts = line.split(',');
        if (parts[0] == numberToFind) optionIndex = parts[2];
    });
    return optionIndex;
}

function getDropDownOptions(dropDownList, optionIndex) {
    let options = [];
    let i = 0;
    const lines = dropDownList.split('\n');
    while (i < lines.length) {
        if (lines[i][0] === '#' && Number(lines[i].replace('#', '')) === Number(optionIndex)) {
            i++;
            while (i < lines.length && lines[i][0] !== '#') {
                const [label, value] = lines[i].split(',');
                options.push({ label, value });
                i++;
            }
            break;
        }
        i++;
    }
    return options;
}

function getDropDownOptionsDict(options) {
    const dict = {};
    options.forEach(opt => {
        dict[opt.value.replace(/\r|\n/g, '')] = opt.label;
    });
    return dict;
}

// --- UI Helpers ---

function createCardHeader(title) {
    const cardHeader = document.createElement('div');
    // cardHeader.className = 'card-header bg-primary text-white';
    cardHeader.id = 'WorkSpaceTitle';
    cardHeader.innerHTML = title;
    return cardHeader;
}

function createDescription(numberToFind) {
    const description = document.createElement('p');
    description.id = 'description';
    // description.className = 'text-muted';
    if (typeof MainDescriptionsDict !== 'undefined' && MainDescriptionsDict[numberToFind]) {
        description.innerHTML = MainDescriptionsDict[numberToFind].replace('#' + numberToFind, '');
    }
    return description;
}

function createExportSwitch(parameterId, onChange) {
    const exportDiv = document.createElement('div');
    exportDiv.className = 'form-check form-switch mb-3';
    const exportCheckbox = document.createElement('input');
    exportCheckbox.type = 'checkbox';
    exportCheckbox.className = 'form-check-input';
    exportCheckbox.id = 'SwitchParameterCheckbox';
    exportCheckbox.checked = !removedParametersCounters.includes(String(parameterId));
    exportCheckbox.onchange = onChange;
    const exportLabel = document.createElement('label');
    exportLabel.className = 'form-check-label ms-2';
    exportLabel.htmlFor = 'SwitchParameterCheckbox';
    exportLabel.innerHTML = LanguageDict["ExportSelectedParamters"];
    exportDiv.appendChild(exportCheckbox);
    exportDiv.appendChild(exportLabel);
    return exportDiv;
}

function createTruckImage(parameterLine) {
    const imgUrl = `${localStorage.getItem('ServerPath')}/assets/truck-images/${parameterLine[3]}.png`;
    const http = new XMLHttpRequest();
    http.open('HEAD', imgUrl, false);
    http.send();
    if (http.status !== 404) {
        const truckImage = document.createElement('img');
        truckImage.src = imgUrl;
        truckImage.id = 'TruckImage';
        truckImage.className = 'img-fluid mb-3';
        return truckImage;
    }
    return null;
}

function createDropdown(labelText, id, options, selectedValue, onChange) {
    const formGroup = document.createElement('div');
    formGroup.className = 'mb-3';

    const label = document.createElement('label');
    label.className = 'form-label fw-bold';
    label.htmlFor = id;
    label.innerHTML = labelText;
    formGroup.appendChild(label);

    const select = document.createElement('select');
    select.id = id;
    select.className = 'form-select w-auto d-inline-block ms-2';
    select.onchange = onChange;

    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.innerHTML = opt.label;
        if (String(opt.value).replace(/\r|\n/g, '') === String(selectedValue)) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    formGroup.appendChild(select);
    return formGroup;
}

function createReadOnlyValue(label, value) {
    const p = document.createElement('p');
    p.className = 'text-secondary mb-1';
    p.innerHTML = `${label}: <span class="fw-bold">${value}</span>`;
    return p;
}

// --- Main UI Function ---

export function dropDownFunction(parameterLine, object) {
    const descElem = document.getElementById('topDefineDescription');
    if (descElem) descElem.innerHTML = '';

    const dropDownList = sessionStorage.getItem('DropDownlist') || '';
    const parameterMain = sessionStorage.getItem('ParameterMain') || '';
    const numberToFind = Number(parameterLine[0]);
    const constantElem = document.getElementById('constant' + numberToFind);
    if (constantElem && constantElem.innerHTML !== '') constantElem.innerHTML = '';

    // Card
    const card = document.createElement('div');
    // card.className = 'card my-3';
    card.appendChild(createCardHeader(object?.innerHTML || 'undefined'));

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Truck image for parameter 2
    if (numberToFind === 2) {
        const truckImage = createTruckImage(parameterLine);
        if (truckImage) cardBody.appendChild(truckImage);
    }

    // Description
    cardBody.appendChild(createDescription(numberToFind));

    // Export switch
    // cardBody.appendChild(createExportSwitch(parameterLine[0], function () {
    //     exportonchange(parameterLine[0], this);
    //     descElem.style.opacity = this.checked ? "1" : "0.4";
    // }));

    // Find OptionIndex and options
    const optionIndex = getOptionIndex(parameterMain, numberToFind);
    const options = getDropDownOptions(dropDownList, optionIndex);
    const dropDownOptionsDict = getDropDownOptionsDict(options);

    // alert(dropDownOptionsDict);
    console.log(dropDownOptionsDict);

    // Current Value dropdown
    if (options.length > 0) {
        let selectedValue = numberToFind === 2 ? parameterLine[3] : parameterLine[1];
        cardBody.appendChild(
            createDropdown(
                LanguageDict["CurrentValue"],
                'CurrentDropDownValue',
                options,
                selectedValue,
                function (event) { dropDownOnChange(parameterLine, event); } // Explicit onchange handler
            )
        );
    }
    // Default & Factory dropdowns for admin
    if (numberToFind !== 2) {
        if (Number(sessionStorageService.get('AccessLevel')) === 8) {
            // Default
            cardBody.appendChild(
                createDropdown(
                    LanguageDict["DefaultValue"],
                    'DefaultSelectTag',
                    options,
                    parameterLine[2],
                    // () => defaultDropDownOnChange(parameterLine)
                    function (event) { defaultDropDownOnChange(parameterLine, event); }
                )
            );
            // Factory
            cardBody.appendChild(
                createDropdown(
                    LanguageDict["FactoryValue"],
                    'FactorySelectTag',
                    options,
                    parameterLine[3],
                    () => factoryDropDownOnChange(parameterLine)
                )
            );
        } else {
            // Read-only default/factory
            cardBody.appendChild(
                createReadOnlyValue('Default Value', dropDownOptionsDict[parameterLine[2]])
            );
            cardBody.appendChild(
                createReadOnlyValue('Factory Value', dropDownOptionsDict[parameterLine[3]])
            );
        }
    }

    // Permissions
    if (
        typeof writePermissionDict !== 'undefined' &&
        Number(writePermissionDict[numberToFind]) > Number(sessionStorageService.get('AccessLevel'))
    ) {
        const dropDown = document.getElementById('CurrentDropDownValue');
        if (dropDown) {
            dropDown.disabled = true;
            dropDown.onclick = null;
        }
        try {
            const factorySelect = document.getElementById('FactorySelectTag');
            if (factorySelect) {
                factorySelect.disabled = true;
                factorySelect.onclick = null;
            }
            const defaultSelect = document.getElementById('DefaultSelectTag');
            if (defaultSelect) {
                defaultSelect.disabled = true;
                defaultSelect.onclick = null;
            }
        } catch (err) { }
    }

    card.appendChild(cardBody);
    descElem.appendChild(card);

    if (window.$) {
        $('#topDefineDescription').fadeIn();
    }
}

export function defaultDropDownOnChange(ParameterLine) {
    // Build the new line with the updated default value
    const newLine = [
        parameterLine[0],
        parameterLine[1],
        document.getElementById('DefaultSelectTag').value.replace('\r', ''),
        parameterLine[3],
        parameterLine[4],
        parameterLine[5],
        parameterLine[6],
        parameterLine[7],
        parameterLine[8],
        parameterLine[9],
        parameterLine[10]
    ].join(',');

    // Get the label for the new default value
    const changeTo = document.getElementById('DefaultSelectTag').options[
        document.getElementById('DefaultSelectTag').selectedIndex
    ].innerHTML;

    const currentParameterTitle = document.getElementById('WorkSpaceTitle').innerHTML;
    const logLine = `${sessionStorage.getItem('loggedinusername')} changed ${currentParameterTitle} [Default Value] to ${changeTo}\n`;
    const currentLogs = sessionStorage.getItem('UserMadeChanges');
    sessionStorage.setItem('UserMadeChanges', currentLogs + logLine);

    // Replace the old line with the new line in Parameters
    const parameters = sessionStorage.getItem('Parameters').replace(parameterLine.join(','), newLine);
    sessionStorage.setItem('Parameters', parameters);

    // Fetch the updated line from sessionStorage
    const updatedParameters = sessionStorage.getItem('Parameters').split('\n');
    const updatedLine = updatedParameters.find(line => line.startsWith(parameterLine[0] + ','));
    const updatedParameterLine = updatedLine ? updatedLine.split(',') : parameterLine;

    // Re-render using the updated parameter line
    treeViewClick(document.getElementById(parameterLine[0]), parameterLine[0], updatedParameterLine);
}

// --- Event Handlers ---

export function dropDownOnChange(parameterLine) {
    // Optionally add a reason for update for certain parameters
    if (Number(parameterLine[0]) >= 37 && Number(parameterLine[0]) <= 63) {
        let divArea = document.getElementById('DivAreaMocas');
        if (divArea) divArea.innerHTML = '';
        else {
            divArea = document.createElement('div');
            divArea.id = 'DivAreaMocas';
        }
        const textInput = document.createElement('input');
        textInput.placeholder = ' Why are you updating this parameter?';
        divArea.appendChild(textInput);

        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'submit this updated parameter';
        divArea.appendChild(submit);

        document.getElementById('topDefineDescription').appendChild(divArea);
    }

    let newLine;
    if (parameterLine[0] == '2') {
        newLine = [
            parameterLine[0],
            parameterLine[1],
            parameterLine[2],
            document.getElementById('CurrentDropDownValue').value.replace('/r', ''),
            parameterLine[4],
            parameterLine[5],
            parameterLine[6],
            parameterLine[7],
            parameterLine[8],
            parameterLine[9],
            parameterLine[10]
        ].join(',');
    } else {
        newLine = [
            parameterLine[0],
            document.getElementById('CurrentDropDownValue').value.replace('\r', ''),
            parameterLine[2],
            parameterLine[3],
            parameterLine[4],
            parameterLine[5],
            parameterLine[6],
            parameterLine[7],
            parameterLine[8],
            parameterLine[9],
            parameterLine[10]
        ].join(',');
    }

    const changeTo = document.getElementById('CurrentDropDownValue').options[
        document.getElementById('CurrentDropDownValue').selectedIndex
    ].innerHTML;

    const currentParameterTitle = document.getElementById('WorkSpaceTitle').innerHTML;
    const logLine = `${sessionStorage.getItem('loggedinusername')} changed ${currentParameterTitle} [Current Value] to ${changeTo}\n`;
    const currentLogs = sessionStorage.getItem('UserMadeChanges');
    sessionStorage.setItem('UserMadeChanges', currentLogs + logLine);

    const parameters = sessionStorage.getItem('Parameters').replace(parameterLine.join(','), newLine);
    sessionStorage.setItem('Parameters', parameters);
    ChangesMadePreDownload = true;

    // Fetch the updated line from sessionStorage
    const updatedParameters = sessionStorage.getItem('Parameters').split('\n');
    const updatedLine = updatedParameters.find(line => line.startsWith(parameterLine[0] + ','));
    const updatedParameterLine = updatedLine ? updatedLine.split(',') : parameterLine;

    // Now re-render using the updatedParameterLine
    treeViewClick(document.getElementById(parameterLine[0]), parameterLine[0], updatedParameterLine);
}