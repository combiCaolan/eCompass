// import sessionStorageService from './modules/sessionStorageService.js';

import sessionStorageService from "../modules/sessionStorageService.js";

let AccessLevelForUser = Number(sessionStorageService.get('AccessLevel'));


/**
 * Handles dropdown parameter display and updates.
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

    // Title
    const title = document.createElement('p');
    title.id = 'WorkSpaceTitle';
    
    try{
        title.innerHTML = object.innerHTML;
        document.getElementById('topDefineTable').appendChild(title);
    }catch(err){
        title.innerHTML = 'undefined';
        document.getElementById('topDefineTable').appendChild(title);
    }

    // Find OptionIndex
    let optionIndex = null;
    parameterMain.split('\n').forEach(line => {
        const parts = line.split(',');
        if (parts[0] == numberToFind) optionIndex = parts[2];
    });

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
            document.getElementById('topDefineTable').appendChild(truckImage);
        }
    }

    // Description
    const descriptionDiv = document.createElement('div');
    const description = document.createElement('p');
    description.id = 'description';
    if (typeof MainDescriptionsDict !== 'undefined' && MainDescriptionsDict[numberToFind]) {
        description.innerHTML = MainDescriptionsDict[numberToFind].replace('#' + numberToFind, '');
    }
    descriptionDiv.appendChild(description);
    const tr = document.createElement('tr');
    tr.appendChild(descriptionDiv);

    // Export checkbox
    const exportDiv = document.createElement('div');
    const exportLabel = document.createElement('label');
    exportLabel.id = 'Export';
    exportLabel.innerHTML = LanguageDict["ExportSelectedParamters"];
    exportDiv.appendChild(exportLabel);

    const exportCheckbox = document.createElement('input');
    exportCheckbox.type = 'checkbox';
    exportCheckbox.id = 'SwitchParameterCheckbox';
    exportCheckbox.style = "text-align:center; font-size:18px;";
    exportCheckbox.checked = !removedParametersCounters.includes(String(parameterLine[0]));
    exportCheckbox.onchange = function () {
        exportonchange(parameterLine[0], this);
    };
    exportDiv.appendChild(exportCheckbox);

    // Set opacity based on removal state
    descElem.style.opacity = exportCheckbox.checked ? "1" : "0.4";

    // Dropdown options
    let dropDownOptionsDict = {};
    let i = 0;
    const dropDownLines = dropDownList.split('\n');
    while (i < dropDownLines.length) {
        if (dropDownLines[i][0] === '#' && Number(dropDownLines[i].replace('#', '')) === Number(optionIndex)) {
            // Current Value dropdown
            const currentTag = document.createElement('p');
            currentTag.id = 'ReadResult';
            currentTag.innerHTML = LanguageDict["CurrentValue"];
            tr.appendChild(currentTag);

            const dropDown = document.createElement('select');
            dropDown.id = 'CurrentDropDownValue';
            dropDown.onchange = () => dropDownOnChange(parameterLine);
            tr.appendChild(dropDown);

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
        }
        i++;
    }

    // Default & Factory dropdowns for admin
    if (numberToFind !== 2) {
        if (Number(sessionStorageService.get('AccessLevel')) == '8') {
            // Default
            const defaultTag = document.createElement('p');
            defaultTag.id = 'ReadResult';
            defaultTag.innerHTML = LanguageDict["DefaultValue"];
            tr.appendChild(defaultTag);

            const defaultSelect = document.createElement('select');
            defaultSelect.id = 'DefaultSelectTag';
            defaultSelect.onchange = () => defaultDropDownOnChange(parameterLine);
            Object.entries(dropDownOptionsDict).forEach(([val, label]) => {
                const option = document.createElement('option');
                option.value = val;
                option.innerHTML = label;
                if (val == parameterLine[2]) option.selected = true;
                defaultSelect.appendChild(option);
            });
            tr.appendChild(defaultSelect);

            // Factory
            const factoryTag = document.createElement('p');
            factoryTag.id = 'ReadResult';
            factoryTag.innerHTML = LanguageDict["FactoryValue"];
            tr.appendChild(factoryTag);

            const factorySelect = document.createElement('select');
            factorySelect.id = 'FactorySelectTag';
            factorySelect.onchange = () => factoryDropDownOnChange(parameterLine);
            Object.entries(dropDownOptionsDict).forEach(([val, label]) => {
                const option = document.createElement('option');
                option.value = val;
                option.innerHTML = label;
                if (val == parameterLine[3]) option.selected = true;
                factorySelect.appendChild(option);
            });
            tr.appendChild(factorySelect);
        } else {
            // Read-only default/factory
            const defaultTag = document.createElement('p');
            defaultTag.id = 'DropDownReadTitle';
            defaultTag.innerHTML = 'Default Value : ' + dropDownOptionsDict[parameterLine[2]];
            tr.appendChild(defaultTag);

            const factoryTag = document.createElement('p');
            factoryTag.id = 'DropDownReadTitle';
            factoryTag.innerHTML = 'Factory Value : ' + dropDownOptionsDict[parameterLine[3]];
            tr.appendChild(factoryTag);
        }
    }

    descElem.appendChild(tr);
    descElem.appendChild(exportDiv);

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

/**
 * Handles change for the default value dropdown.
 */
export function defaultDropDownOnChange(parameterLine) {
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

    const changeTo = document.getElementById('DefaultSelectTag').options[
        document.getElementById('DefaultSelectTag').selectedIndex
    ].innerHTML;

    const currentParameterTitle = document.getElementById('WorkSpaceTitle').innerHTML;
    const logLine = `${sessionStorage.getItem('loggedinusername')} changed ${currentParameterTitle} [Default Value] to ${changeTo}\n`;
    const currentLogs = sessionStorage.getItem('UserMadeChanges');
    sessionStorage.setItem('UserMadeChanges', currentLogs + logLine);

    const parameters = sessionStorage.getItem('Parameters').replace(parameterLine.join(','), newLine);
    sessionStorage.setItem('Parameters', parameters);
    treeViewClick(document.getElementById(parameterLine[0]), parameterLine[0]);
}

/**
 * Handles change for the factory value dropdown.
 */
export function factoryDropDownOnChange(parameterLine) {
    const newLine = [
        parameterLine[0],
        parameterLine[1],
        parameterLine[2],
        document.getElementById('FactorySelectTag').value.replace('\r', ''),
        parameterLine[4],
        parameterLine[5],
        parameterLine[6],
        parameterLine[7],
        parameterLine[8],
        parameterLine[9],
        parameterLine[10]
    ].join(',');

    const changeTo = document.getElementById('FactorySelectTag').options[
        document.getElementById('FactorySelectTag').selectedIndex
    ].innerHTML;

    const currentParameterTitle = document.getElementById('WorkSpaceTitle').innerHTML;
    const logLine = `${sessionStorage.getItem('loggedinusername')} changed ${currentParameterTitle} [Factory Value] to ${changeTo}\n`;
    const currentLogs = sessionStorage.getItem('UserMadeChanges');
    sessionStorage.setItem('UserMadeChanges', currentLogs + logLine);

    const parameters = sessionStorage.getItem('Parameters').replace(parameterLine.join(','), newLine);
    sessionStorage.setItem('Parameters', parameters);
    treeViewClick(document.getElementById(parameterLine[0]), parameterLine[0]);
}