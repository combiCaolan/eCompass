/**
 * AllMenuButtonFunctions.js
 * 
 * Contains utility and UI functions for menu actions, file handling, and dialogs
 * in the eCompass web application.
 * 
 * Best practices: 
 * - Uses const/let for variable declarations
 * - Adds docstrings and inline comments
 * - Removes unused/commented code
 * - Uses descriptive variable names
 */

// Utility: Get current page name
const currentPage = window.location.pathname.split('/').pop();

window.userParametersFileDict = window.userParametersFileDict || {};

// Permissions dictionaries
window.readPermissionDict = window.readPermissionDict || {};
window.writePermissionDict = window.writePermissionDict || {};

// Parse template permissions from sessionStorage
const template = sessionStorage.getItem('TemplateFile');
if (template) {
    template.split('\n').forEach(line => {
        const parts = line.split(',');
        if (parts.length > 9) {
            readPermissionDict[parts[0]] = parts[8];
            writePermissionDict[parts[0]] = parts[9];
        }
    });
}

// Set UI elements if present
const closeFileDialogBtn = document.getElementById('CloseFileDialog');
if (closeFileDialogBtn) {
    closeFileDialogBtn.title = 'Close';
    closeFileDialogBtn.innerHTML = 'Close File';
}
const usernameLocal = document.getElementById('UsernameLocal');
if (usernameLocal) {
    usernameLocal.innerHTML = sessionStorage.getItem('loggedinusername') || '';
}
const accessLevelElem = document.getElementById('AccessLevel');
if (accessLevelElem) {
    accessLevelElem.innerHTML = LanguageDict[Number(sessionStorage.getItem('AccessLevel'))] || '';
}
const apiVersionElem = document.getElementById('APIVersion');
if (apiVersionElem) {
    apiVersionElem.innerHTML = sessionStorage.getItem('APIV') || '';
}

let changesMadePreDownload = false;

/**
 * Opens eCompass in a new tab and passes a name via localStorage.
 * @param {string} passName 
 */
export function openInNewTab(passName) {
    localStorage.setItem('OpenInNewTab', passName);
    window.open('https://support.combilift.net/ecompass');
}

/**
 * Opens a new file, warning if there are unsaved changes.
 */
export function openNewFile() {
    if (changesMadePreDownload) {
        const confirmLeave = confirm(LanguageDict['GeneralFileLostWarning']);
        if (!confirmLeave) return;
    }
    openInNewTab('OpenNew');
}

/**
 * Downloads a file as .clp using a data URI.
 * @param {string} filename 
 * @param {string} text 
 */
export function webDownloadFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename || 'COMBI_PAR.clp');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

/**
 * Toggles the mobile menu.
 */
export function mobileMenuFunction() {
    const nav = document.getElementById("myTopnav");
    if (!nav) return;
    if (nav.className === "topnav") {
        nav.className += " responsive";
    } else {
        nav.className = "topnav";
    }
}

/**
 * Toggles the home menu and tree view.
 */
export function homeMenuClick() {
    const tree = document.getElementsByClassName('tree')[0];
    if (!tree) return;
    if (tree.getAttribute('state') !== 'clicked' || tree.getAttribute('state') == null) {
        $(".tree").animate({ left: '-40%' });
        tree.setAttribute('style', 'display:none;');
        $("#viewer").animate({ marginLeft: '5%' });
        $("#viewer").animate({ width: '90%' });
        tree.setAttribute('state', 'clicked');
    } else {
        tree.removeAttribute('style');
        document.getElementById('viewer').removeAttribute('style');
        tree.removeAttribute('state');
    }
}

/**
 * Toggles the parameters menu and viewer.
 */
export function parametersMenuToggle() {
    const menuLink = document.getElementById('MenuLink');
    const mobileMenuText = document.getElementById('MobileMenuButtonForText');
    if (menuLink && mobileMenuText) {
        if (menuLink.innerHTML === 'Parameters Menu') {
            menuLink.innerHTML = 'View Parameter';
            mobileMenuText.style.display = "none";
        } else {
            menuLink.innerHTML = 'Parameters Menu';
            mobileMenuText.style.display = "unset";
        }
    }
    $(".tree").toggle();
    $("#viewer").toggle();
}

/**
 * Opens a file dialog to read a .clp file and loads it into sessionStorage.
 * @param {string} [defaultFileName] 
 */
export function readParameters(defaultFileName) {
    if (currentPage === 'parameter-editor.html') {
        const confirmLeave = confirm(LanguageDict['GeneralFileLostWarning']);
        if (!confirmLeave) return;
    }

    if (!sessionStorage.getItem('API')) {
        sessionStorage.setItem('API', 'GeneralDefault_API_1.clp');
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.clp';
    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            const data = readerEvent.target.result;
            sessionStorage.setItem("ParametersFileName", file.name);
            sessionStorage.setItem('Parameters', data);

            if (!data) return;

            // Build UserParametersFileDict
            const lines = data.split('\n');
            console.log(lines);
            // const userParametersFileDict = {};
            lines.forEach(line => {
                const key = line.split(',')[0];
                console.log(key);
                console.log(line);
                if (key) window.userParametersFileDict[key] = line;
            });

            console.log(userParametersFileDict);

            location.href = 'parameter-editor.html';
        };
    };
    input.click();
}

/**
 * Reads a default file via AJAX and loads it into sessionStorage.
 * @param {string} path 
 */
export function readDefaultFile(path) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            sessionStorage.setItem('ParametersFileName', path);
            sessionStorage.setItem('Parameters', this.responseText);
            const fileContent = this.responseText;

            // Extract API version
            let apiVersion = '';
            fileContent.split('\n').forEach(line => {
                if (line.split(',')[0] === '6') {
                    apiVersion = line.split(',')[3];
                }
            });

            // Build UserParametersFileDict
            let userParametersFileDict = {};
            fileContent.split('\n').forEach(line => {
                const key = line.split(',')[0];
                if (key) userParametersFileDict[key] = line;
            });

            try {
                if ('API-' + apiVersion !== sessionStorage.getItem('APIV')) {
                    alert('Api Version of this file is ' + apiVersion + ' ');
                }

                // Prepare form for log registration
                const emptyDiv = document.createElement('div');
                emptyDiv.style.display = 'none';

                const form = document.createElement('form');
                form.action = '../includes/openfile.php';
                form.method = 'POST';
                form.name = 'LogRegForm';

                const modelInput = document.createElement('input');
                modelInput.type = 'text';
                modelInput.name = 'Model';
                modelInput.value = (userParametersFileDict[2] || '').split(',')[3] || '';
                form.appendChild(modelInput);

                const fileNameInput = document.createElement('input');
                fileNameInput.type = 'text';
                fileNameInput.name = 'FileName';
                fileNameInput.value = path.split('/').pop();
                form.appendChild(fileNameInput);

                const serialNumberInput = document.createElement('input');
                serialNumberInput.type = 'text';
                serialNumberInput.name = 'SerialNumber';
                serialNumberInput.value = (userParametersFileDict[4] || '').split(',')[3] || '';
                form.appendChild(serialNumberInput);

                const userNameInput = document.createElement('input');
                userNameInput.type = 'text';
                userNameInput.name = 'Username';
                userNameInput.value = sessionStorage.getItem('loggedinusername') || '';
                form.appendChild(userNameInput);

                const accessLevelInput = document.createElement('input');
                accessLevelInput.type = 'text';
                accessLevelInput.name = 'AccessLevel';
                accessLevelInput.value = sessionStorage.getItem('AccessLevel') || '';
                form.appendChild(accessLevelInput);

                const actionInput = document.createElement('input');
                actionInput.type = 'text';
                actionInput.name = 'ActionInput';
                actionInput.value = 'Opened New File';
                form.appendChild(actionInput);

                const submitForm = document.createElement('input');
                submitForm.type = 'submit';
                form.appendChild(submitForm);

                emptyDiv.appendChild(form);
                const topnav = document.getElementById('myTopnav');
                if (topnav) topnav.appendChild(emptyDiv);

                submitForm.click();
            } catch (err) {
                alert('Combi General Error - Log 404');
            }
        }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
}

/**
 * Downloads a file using a data URI.
 * @param {string} filename 
 * @param {string} text 
 */
export function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

/**
 * Downloads the file after checking for errors and removed parameters.
 */
export function webDownloadFileWithChecks() {
    if ((typeof MinError !== 'undefined' && MinError.length !== 0) ||
        (typeof MaxError !== 'undefined' && MaxError.length !== 0)) {
        const userAuth = confirm('Errors still exist on this file - are you sure you want to download?');
        if (!userAuth) return;
    }

    if (typeof removedParametersCounters !== 'undefined' && removedParametersCounters.length !== 0) {
        removedParametersCounters.forEach(counter => {
            let newPar = sessionStorage.getItem('Parameters').replace(counter + '\n', '');
            sessionStorage.setItem('Parameters', newPar);
        });
    }

    location.href = 'Download.html';
    changesMadePreDownload = false;
}

/**
 * Closes the file dialog, warning if there are unsaved changes.
 */
export function closeFileDialog() {
    if (changesMadePreDownload) {
        const confirmLeave = confirm(LanguageDict['GeneralFileLostWarning']);
        if (!confirmLeave) return;
    }
    location.href = localStorage.getItem('ServerPath') || '';
}

/**
 * Opens the compare dialog UI.
 */
export function compareDialog() {
    const topDefineTable = document.getElementById('topDefineTable');
    const topDefineDescription = document.getElementById('topDefineDescription');
    if (!topDefineTable || !topDefineDescription) return;

    topDefineTable.innerHTML = '';
    topDefineDescription.innerHTML = '';

    const workSpaceTitle = document.createElement('p');
    workSpaceTitle.id = 'WorkSpaceTitle';
    workSpaceTitle.innerHTML = LanguageDict["CompareTitle"];

    const descriptionArea = document.createElement('tr');
    const description = document.createElement('p');
    description.innerHTML = LanguageDict["CompareDescription"];
    description.id = 'description';

    const unorderedList = document.createElement('ul');
    const listItemOne = document.createElement('li');
    const listItemTwo = document.createElement('li');

    const fileButton = document.createElement('input');
    fileButton.type = 'submit';
    fileButton.value = 'Choose File to compare with';
    fileButton.onclick = PostCompareFile;
    fileButton.id = 'FileActionsButtonWorkSpace';

    const compareBtn = document.createElement('input');
    compareBtn.type = 'submit';
    compareBtn.value = 'Compare Files';
    compareBtn.onclick = Compare;
    compareBtn.id = 'FileActionsButtonWorkSpace';

    const results = document.createElement('div');
    results.id = 'results';

    const log = document.createElement('div');
    try {
        log.innerHTML = CurentFileActionLog;
    } catch (err) {
        // CurentFileActionLog may not exist
    }
    log.id = 'SpecialBlockLog';

    topDefineDescription.appendChild(workSpaceTitle);
    topDefineDescription.appendChild(descriptionArea);
    topDefineDescription.appendChild(unorderedList);
    topDefineDescription.appendChild(log);
    topDefineDescription.appendChild(results);

    unorderedList.appendChild(listItemOne);
    unorderedList.appendChild(listItemTwo);
    listItemOne.appendChild(fileButton);
    listItemTwo.appendChild(compareBtn);
    descriptionArea.appendChild(description);

    $("#CompareDialog").dialog();
}

/**
 * Opens the new file dialog, warning if there are unsaved changes.
 */
export function newFile() {
    if (changesMadePreDownload) {
        const confirmLeave = confirm(LanguageDict['GeneralFileLostWarning']);
        if (!confirmLeave) return;
    }
    $("#DefaultFileList").dialog();
}

// document.addEventListener('main-header-loaded', () => {
//   const header = document.querySelector('main-header');
//   if (!header) return;

//   header.querySelectorAll('#OpenFileButton').forEach(btn => {
//     btn.addEventListener('click', readParameters);
//   });
//   header.querySelectorAll('#NewFileButton').forEach(btn => {
//     btn.addEventListener('click', newFile);
//   });
//   header.querySelectorAll('#OpenInNewTab').forEach(btn => {
//     btn.addEventListener('click', openNewFile);
//   });
//   header.querySelectorAll('#CloseFileButton').forEach(btn => {
//     btn.addEventListener('click', closeFileDialog);
//   });
// });

window.readParameters = readParameters;
window.newFile = newFile;
window.openNewFile = openNewFile;
window.closeFileDialog = closeFileDialog;