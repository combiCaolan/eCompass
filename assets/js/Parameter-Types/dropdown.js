import sessionStorageService from "../modules/sessionStorageService.js";

let AccessLevelForUser = Number(sessionStorageService.get('AccessLevel'));

/**
 * Handles dropdown parameter display and updates, Bootstrap style.
 */
export function dropDownFunction(parameterLine, object) {
    // Clear previous description
    const descElem = document.getElementById('topDefineDescription');
    if (descElem) descElem.innerHTML = '';

    const dropDownList = sessionStorage.getItem('DropDownlist') || '';
    const parameterMain = sessionStorage.getItem('ParameterMain') || '';
    const numberToFind = Number(parameterLine[0]);
    const constantElem = document.getElementById('constant' + numberToFind);
    if (constantElem && constantElem.innerHTML !== '') constantElem.innerHTML = '';

    // Bootstrap Card Container
    const card = document.createElement('div');
    // card.className = 'card my-3';

    // Card Header (Title)
    const cardHeader = document.createElement('div');
    // cardHeader.className = 'card-header bg-primary text-white';
    cardHeader.id = 'WorkSpaceTitle';
    cardHeader.innerHTML = object?.innerHTML || 'undefined';
    card.appendChild(cardHeader);

    // Card Body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Truck image for parameter 2
    if (numberToFind === 2) {
        const imgUrl = `${localStorage.getItem('ServerPath')}/assets/truck-images/${parameterLine[3]}.png`;
        const http = new XMLHttpRequest();
        http.open('HEAD', imgUrl, false);
        http.send();
        if (http.status !== 404) {
            const truckImage = document.createElement('img');
            truckImage.src = imgUrl;
            truckImage.id = 'TruckImage';
            truckImage.className = 'img-fluid mb-3';
            cardBody.appendChild(truckImage);
        }
    }

    // Description
    const description = document.createElement('p');
    description.id = 'description';
    description.className = 'text-muted';
    if (typeof MainDescriptionsDict !== 'undefined' && MainDescriptionsDict[numberToFind]) {
        description.innerHTML = MainDescriptionsDict[numberToFind].replace('#' + numberToFind, '');
    }
    cardBody.appendChild(description);

    // Export checkbox (Bootstrap switch)
    const exportDiv = document.createElement('div');
    exportDiv.className = 'form-check form-switch mb-3';
    const exportCheckbox = document.createElement('input');
    exportCheckbox.type = 'checkbox';
    exportCheckbox.className = 'form-check-input';
    exportCheckbox.id = 'SwitchParameterCheckbox';
    exportCheckbox.checked = !removedParametersCounters.includes(String(parameterLine[0]));
    exportCheckbox.onchange = function () {
        exportonchange(parameterLine[0], this);
        descElem.style.opacity = this.checked ? "1" : "0.4";
    };
    const exportLabel = document.createElement('label');
    exportLabel.className = 'form-check-label ms-2';
    exportLabel.htmlFor = 'SwitchParameterCheckbox';
    exportLabel.innerHTML = LanguageDict["ExportSelectedParamters"];
    exportDiv.appendChild(exportCheckbox);
    exportDiv.appendChild(exportLabel);
    cardBody.appendChild(exportDiv);

    // Find OptionIndex
    let optionIndex = null;
    parameterMain.split('\n').forEach(line => {
        const parts = line.split(',');
        if (parts[0] == numberToFind) optionIndex = parts[2];
    });

    // Dropdown options
    let dropDownOptionsDict = {};
    let i = 0;
    const dropDownLines = dropDownList.split('\n');
    while (i < dropDownLines.length) {
        if (dropDownLines[i][0] === '#' && Number(dropDownLines[i].replace('#', '')) === Number(optionIndex)) {
            // Current Value dropdown
            const formGroup = document.createElement('div');
            formGroup.className = 'mb-3';

            const currentLabel = document.createElement('label');
            currentLabel.className = 'form-label fw-bold';
            currentLabel.htmlFor = 'CurrentDropDownValue';
            currentLabel.innerHTML = LanguageDict["CurrentValue"];
            formGroup.appendChild(currentLabel);

            const dropDown = document.createElement('select');
            dropDown.id = 'CurrentDropDownValue';
            dropDown.className = 'form-select w-auto d-inline-block ms-2';
            dropDown.onchange = () => dropDownOnChange(parameterLine);

            i++;
            while (i < dropDownLines.length && dropDownLines[i][0] !== '#') {
                const [label, value] = dropDownLines[i].split(',');
                const option = document.createElement('option');
                option.value = value;
                option.innerHTML = label;
                if (numberToFind === 2 && Number(value) === Number(parameterLine[3])) {
                    option.selected = true;
                } else if (Number(value) === Number(parameterLine[1])) {
                    option.selected = true;
                }
                dropDownOptionsDict[value.replace(/\r|\n/g, '')] = label;
                dropDown.appendChild(option);
                i++;
            }
            formGroup.appendChild(dropDown);
            cardBody.appendChild(formGroup);
        }
        i++;
    }

    // Default & Factory dropdowns for admin
    if (numberToFind !== 2) {
        if (Number(sessionStorageService.get('AccessLevel')) == '8') {
            // Default
            const defaultGroup = document.createElement('div');
            defaultGroup.className = 'mb-3';

            const defaultLabel = document.createElement('label');
            defaultLabel.className = 'form-label fw-bold';
            defaultLabel.htmlFor = 'DefaultSelectTag';
            defaultLabel.innerHTML = LanguageDict["DefaultValue"];
            defaultGroup.appendChild(defaultLabel);

            const defaultSelect = document.createElement('select');
            defaultSelect.id = 'DefaultSelectTag';
            defaultSelect.className = 'form-select w-auto d-inline-block ms-2';
            defaultSelect.onchange = () => defaultDropDownOnChange(parameterLine);
            Object.entries(dropDownOptionsDict).forEach(([val, label]) => {
                const option = document.createElement('option');
                option.value = val;
                option.innerHTML = label;
                if (val == parameterLine[2]) option.selected = true;
                defaultSelect.appendChild(option);
            });
            defaultGroup.appendChild(defaultSelect);
            cardBody.appendChild(defaultGroup);

            // Factory
            const factoryGroup = document.createElement('div');
            factoryGroup.className = 'mb-3';

            const factoryLabel = document.createElement('label');
            factoryLabel.className = 'form-label fw-bold';
            factoryLabel.htmlFor = 'FactorySelectTag';
            factoryLabel.innerHTML = LanguageDict["FactoryValue"];
            factoryGroup.appendChild(factoryLabel);

            const factorySelect = document.createElement('select');
            factorySelect.id = 'FactorySelectTag';
            factorySelect.className = 'form-select w-auto d-inline-block ms-2';
            factorySelect.onchange = () => factoryDropDownOnChange(parameterLine);
            Object.entries(dropDownOptionsDict).forEach(([val, label]) => {
                const option = document.createElement('option');
                option.value = val;
                option.innerHTML = label;
                if (val == parameterLine[3]) option.selected = true;
                factorySelect.appendChild(option);
            });
            factoryGroup.appendChild(factorySelect);
            cardBody.appendChild(factoryGroup);
        } else {
            // Read-only default/factory
            const defaultTag = document.createElement('p');
            defaultTag.className = 'text-secondary mb-1';
            defaultTag.innerHTML = 'Default Value: <span class="fw-bold">' + dropDownOptionsDict[parameterLine[2]] + '</span>';
            cardBody.appendChild(defaultTag);

            const factoryTag = document.createElement('p');
            factoryTag.className = 'text-secondary mb-1';
            factoryTag.innerHTML = 'Factory Value: <span class="fw-bold">' + dropDownOptionsDict[parameterLine[3]] + '</span>';
            cardBody.appendChild(factoryTag);
        }
    }

    // Permissions
    if (typeof writePermissionDict !== 'undefined' && Number(writePermissionDict[numberToFind]) > Number(sessionStorageService.get('AccessLevel'))) {
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
        } catch (err) {}
    }

    card.appendChild(cardBody);
    descElem.appendChild(card);

    $('#topDefineDescription').fadeIn();
}

/**
 * Handles change for the main dropdown.
 */
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
    treeViewClick(document.getElementById(parameterLine[0]), parameterLine[0]);
}