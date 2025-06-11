import { RegularParameter } from "./Parameter-Types/RegularParameter.js";
import { bitParameters1000, bitParameters999, customParametersDropDown } from "./main.js";
import { dropDownFunction } from "./Parameter-Types/dropdown.js";
import { SerialNumberFunction } from "./Parameter-Types/SerialNumberLogic.js";
import { Bit999DisplayOptionsFunction } from "./Parameter-Types/bit900.js";
import { Bit1000DisplayOptionsFunction } from "./Parameter-Types/bit1000.js";
import sessionStorageService from "./modules/sessionStorageService.js";

// import sessionStorageService from './modules/sessionStorageService.js';

// AccessLevelForUser = Number(sessionStorageService.get('AccessLevel'));

/**
 * Display a "No Permission" message in the UI.
 */
export default function showNoPermission() {
    const container = document.getElementById('topDefineDescription');
    container.innerHTML = '';

    const iconDiv = document.createElement('div');
    iconDiv.style = 'width:100px; height:100px; background:gray; border-radius:50%; margin-left:45%; color:white; font-size:80px; font-weight:900; margin-top:30px; text-align:center;';
    iconDiv.innerHTML = '!';

    const title = document.createElement('h1');
    title.innerHTML = 'No Permission';
    title.style.textAlign = 'center';

    const msg = document.createElement('p');
    msg.innerHTML = 'You do not have Permission to edit or view this parameter';
    msg.style.textAlign = 'center';

    container.appendChild(iconDiv);
    container.appendChild(title);
    container.appendChild(msg);
}

/**
 * Display UI for a parameter not present in the file.
 */
export function showParameterNotPresent(lineNumber, htmlObject) {
    const container = document.getElementById('topDefineDescription');
    container.innerHTML = '';

    const workSpaceTitle = document.createElement('p');
    workSpaceTitle.id = 'WorkSpaceTitle';
    workSpaceTitle.innerHTML = htmlObject.innerHTML || 'unknown';

    const description = document.createElement('p');
    description.id = 'description';
    if (typeof MainDescriptionsDict !== 'undefined' && MainDescriptionsDict[htmlObject.id]) {
        description.innerHTML = MainDescriptionsDict[htmlObject.id].replace('#' + htmlObject.id, '');
    }

    const parameterMsg = document.createElement('p');
    parameterMsg.value = 'This Parameter is not present on this file';

    const addParameterButton = document.createElement('input');
    addParameterButton.id = 'AddParameterButton';
    addParameterButton.type = 'submit';
    addParameterButton.value = `Add "${htmlObject.innerHTML}" to this file?`;
    addParameterButton.onclick = function () {
        addParameterToClp(lineNumber, htmlObject);
        // location.reload();
    };

    container.appendChild(workSpaceTitle);
    container.appendChild(description);
    container.appendChild(parameterMsg);
    container.appendChild(addParameterButton);
}

// Build a dictionary of user parameters from sessionStorage
// let userParametersFileDict = {};
// const parametersArr = (sessionStorage.getItem('Parameters') || '').split('\n');
// parametersArr.forEach(line => {
//     if (line) {
//         const parts = line.split(',');
//         userParametersFileDict[parts[0]] = line;
//     }
// });

/**
 * Handles clicking on a parameter in the tree view.
 */
export function treeViewClick(value, objectId, msg) {
    const pre64 = ['2', '4'];
    try {
        const parentId = document.getElementById(objectId).parentNode.id;
        const selectedClass = parentId[0] === 'G' ? 'ThirdSubGroup' : 'PreTreeButton';
        const selectedElem = document.getElementsByClassName('SelectedThirdSubGroup')[0];
        if (selectedElem) selectedElem.setAttribute('class', selectedClass);
    } catch (err) {}

    const objectElem = document.getElementById(objectId);
    if (objectElem && objectElem.getAttribute('class') !== 'BitTreeButton') {
        if (!pre64.includes(objectId)) {
            objectElem.setAttribute('class', 'SelectedThirdSubGroup');
        }
    }

    document.getElementById('topDefineTable').innerHTML = '';
    document.getElementById('topDefineDescription').innerHTML = '';

    // Refresh userParametersFileDict if msg is undefined
    if (typeof msg === 'undefined') {
        userParametersFileDict = {};
        (sessionStorageService.get('Parameters') || '').split('\n').forEach(line => {
            if (line) {
                const parts = line.split(',');
                userParametersFileDict[parts[0]] = line;
            }
        });
    }

    if (!userParametersFileDict[objectId]) {
        showParameterNotPresent(objectId, value);
        return;
    }

    try {
        if (typeof ReadPermissionDict !== 'undefined' && Number(ReadPermissionDict[objectId]) > Number(AccessLevelForUser)) {
            showNoPermission();
            $('#topDefineDescription').fadeIn();
            return;
        }
    } catch (err) {}

    // Custom Bits Require Line in this format
    let lineArr = userParametersFileDict[objectId].split(',');
    let indexNumber = lineArr[0];

    // Serial Number
    if (indexNumber === '4') {
        document.getElementById('topDefineDescription').innerHTML = '';
        SerialNumberFunction(lineArr, value);
        return;
    }

    if (typeof passwordList !== 'undefined' && passwordList.includes(indexNumber)) {
        document.getElementById('topDefineDescription').innerHTML = '';
        PasswordCustom(lineArr);
        return;
    }

    if (bitParameters999.includes(indexNumber)) {
        Bit999DisplayOptionsFunction(lineArr.toString(), document.getElementById(indexNumber));
        return;
    }

    if (bitParameters1000.includes(indexNumber)) {
        Bit1000DisplayOptionsFunction(lineArr.toString(), document.getElementById(indexNumber));
        return;
    }

    if (customParametersDropDown.includes(indexNumber)) {
        dropDownFunction(lineArr, value);
        return;
    }
    RegularParameter(value, objectId, lineArr);
}