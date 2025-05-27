// AllMenuButtonFunctions.js - Refactored for local and modern browser use

// Utility: Get current page name
const CurrentPage = window.location.pathname.split('/').pop();

// Permissions dictionaries
const ReadPermissionDict = {};
const WritePermissionDict = {};

// Parse template permissions
const Template = sessionStorage.getItem('TemplateFile');
if (Template) {
    Template.split('\n').forEach(line => {
        const parts = line.split(',');
        if (parts.length > 9) {
            ReadPermissionDict[parts[0]] = parts[8];
            WritePermissionDict[parts[0]] = parts[9];
        }
    });
}

// Set UI elements if present
if (document.getElementById('CloseFileDialog')) {
    document.getElementById('CloseFileDialog').title = 'Close';//LanguageDict["Close"];
    document.getElementById('CloseFileDialog').innerHTML = 'Close File';//LanguageDict["CloseFileDialogMessage"];
}
if (document.getElementById('UsernameLocal')) {
    document.getElementById('UsernameLocal').innerHTML = sessionStorage.getItem('loggedinusername') || '';
}
if (document.getElementById('AccessLevel')) {
    document.getElementById('AccessLevel').innerHTML = LanguageDict[Number(sessionStorage.getItem('AccessLevel'))] || '';
}
if (document.getElementById('APIVersion')) {
    document.getElementById('APIVersion').innerHTML = sessionStorage.getItem('APIV') || '';
}

let ChangesMadePreDownload = false;

// Open eCompass in new tab
function OpenInNewTab(PassName) {
    localStorage.setItem('OpenInNewTab', PassName);
    window.open('https://support.combilift.net/ecompass');
}

// Open a new file, with unsaved changes warning
function OpenNewFile() {
    if (ChangesMadePreDownload) {
        const check = confirm(LanguageDict['GeneralFileLostWarning']);
        if (!check) return;
    }
    OpenInNewTab('OpenNew');
}

// Download file as .clp
function WebdownloadFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename || 'COMBI_PAR.clp');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Mobile menu toggle
function MobileMenuFunction() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Home menu click toggle
function HomeMenuClick() {
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

// Parameters menu toggle
function ParametersMenuToggle() {
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

function readParameters(DefaultFileName) {
    if (CurrentPage === 'editor.php') {
        const check = confirm(LanguageDict['GeneralFileLostWarning']);
        if (!check) return;
    }

    if (!sessionStorage.getItem('API')) {
        sessionStorage.setItem('API', 'GeneralDefault_API_1.clp');
    }

    alert('1');

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.clp';
    input.onchange = e => {
        alert('2');
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
            const UserParametersFileDict = {};
            lines.forEach(line => {
                const key = line.split(',')[0];
                if (key) UserParametersFileDict[key] = line;
            });

            location.href = 'editor.php';
            // location.href = '../editor.php'; // Move this if you want to redirect after file is loaded
        };
    };
    input.click(); // <-- This opens the file dialog and waits for user action
    // location.href = 'public/editor.php'; // Move this if you want to redirect after file is loaded
}

// Read default file via AJAX
function readDefaultFile(Path) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            sessionStorage.setItem('ParametersFileName', Path);
            sessionStorage.setItem('Parameters', this.responseText);
            const File = this.responseText;

            // Extract API version
            let ApiVersion = '';
            File.split('\n').forEach(line => {
                if (line.split(',')[0] === '6') {
                    ApiVersion = line.split(',')[3];
                }
            });

            // Build UserParametersFileDict
            const UserParametersFileDict = {};
            File.split('\n').forEach(line => {
                const key = line.split(',')[0];
                if (key) UserParametersFileDict[key] = line;
            });

            try {
                if ('API-' + ApiVersion !== sessionStorage.getItem('APIV')) {
                    alert('Api Version of this file is ' + ApiVersion + ' ');
                }

                // Prepare form for log registration
                const EmptyDiv = document.createElement('div');
                EmptyDiv.style.display = 'none';

                const Form = document.createElement('form');
                Form.action = '../includes/openfile.php';
                Form.method = 'POST';
                Form.name = 'LogRegForm';

                const Model = document.createElement('input');
                Model.type = 'text';
                Model.name = 'Model';
                Model.value = (UserParametersFileDict[2] || '').split(',')[3] || '';
                Form.appendChild(Model);

                const FileName = document.createElement('input');
                FileName.type = 'text';
                FileName.name = 'FileName';
                FileName.value = Path.split('/').pop();
                Form.appendChild(FileName);

                const SerialNumber = document.createElement('input');
                SerialNumber.type = 'text';
                SerialNumber.name = 'SerialNumber';
                SerialNumber.value = (UserParametersFileDict[4] || '').split(',')[3] || '';
                Form.appendChild(SerialNumber);

                const UserName = document.createElement('input');
                UserName.type = 'text';
                UserName.name = 'Username';
                UserName.value = sessionStorage.getItem('loggedinusername') || '';
                Form.appendChild(UserName);

                const AccessLevel = document.createElement('input');
                AccessLevel.type = 'text';
                AccessLevel.name = 'AccessLevel';
                AccessLevel.value = sessionStorage.getItem('AccessLevel') || '';
                Form.appendChild(AccessLevel);

                const ActionInput = document.createElement('input');
                ActionInput.type = 'text';
                ActionInput.name = 'ActionInput';
                ActionInput.value = 'Opened New File';
                Form.appendChild(ActionInput);

                const SubmitForm = document.createElement('input');
                SubmitForm.type = 'submit';
                Form.appendChild(SubmitForm);

                EmptyDiv.appendChild(Form);
                const topnav = document.getElementById('myTopnav');
                if (topnav) topnav.appendChild(EmptyDiv);

                SubmitForm.click();
            } catch (err) {
                alert('Combi General Error - Log 404');
            }
        }
    };
    xhttp.open("GET", Path, true);
    xhttp.send();
}

// Download file utility
function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Download file with error checks
function WebDownloadFile() {
    if (typeof MinError !== 'undefined' && MinError.length !== 0 ||
        typeof MaxError !== 'undefined' && MaxError.length !== 0) {
        const UserAuth = confirm('Errors still exist on this file - are you sure you want to download?');
        if (!UserAuth) return;
    }

    if (typeof removedParametersCounters !== 'undefined' && removedParametersCounters.length !== 0) {
        removedParametersCounters.forEach(counter => {
            let NewPar = sessionStorage.getItem('Parameters').replace(counter + '\n', '');
            sessionStorage.setItem('Parameters', NewPar);
        });
    }

    location.href = 'Download.php';
    ChangesMadePreDownload = false;
}

// Close file dialog with unsaved changes warning
function CloseFileDialog() {
    if (ChangesMadePreDownload) {
        const check = confirm(LanguageDict['GeneralFileLostWarning']);
        if (!check) return;
    }
    location.href = sessionStorage.getItem('ServerPath') || '';
}

// Compare dialog UI
function CompareDialog() {
    const topDefineTable = document.getElementById('topDefineTable');
    const topDefineDescription = document.getElementById('topDefineDescription');
    if (!topDefineTable || !topDefineDescription) return;

    topDefineTable.innerHTML = '';
    topDefineDescription.innerHTML = '';

    const WorkSpaceTitle = document.createElement('p');
    WorkSpaceTitle.id = 'WorkSpaceTitle';
    WorkSpaceTitle.innerHTML = LanguageDict["CompareTitle"];

    const DescriptionArea = document.createElement('tr');
    const Description = document.createElement('p');
    Description.innerHTML = LanguageDict["CompareDescription"];
    Description.id = 'description';

    const UnorderedList = document.createElement('ul');
    const ListItemOne = document.createElement('li');
    const ListItemTwo = document.createElement('li');

    const FileButton = document.createElement('input');
    FileButton.type = 'submit';
    FileButton.value = 'Choose File to compare with';
    FileButton.onclick = PostCompareFile;
    FileButton.id = 'FileActionsButtonWorkSpace';

    const CompareBTN = document.createElement('input');
    CompareBTN.type = 'submit';
    CompareBTN.value = 'Compare Files';
    CompareBTN.onclick = Compare;
    CompareBTN.id = 'FileActionsButtonWorkSpace';

    const Results = document.createElement('div');
    Results.id = 'results';

    const Log = document.createElement('div');
    try {
        Log.innerHTML = CurentFileActionLog;
    } catch (err) {
        // CurrentFileActionLog Doesn't exist
    }
    Log.id = 'SpecialBlockLog';

    topDefineDescription.appendChild(WorkSpaceTitle);
    topDefineDescription.appendChild(DescriptionArea);
    topDefineDescription.appendChild(UnorderedList);
    topDefineDescription.appendChild(Log);
    topDefineDescription.appendChild(Results);

    UnorderedList.appendChild(ListItemOne);
    UnorderedList.appendChild(ListItemTwo);
    ListItemOne.appendChild(FileButton);
    ListItemTwo.appendChild(CompareBTN);
    DescriptionArea.appendChild(Description);

    $("#CompareDialog").dialog();
}

// New file dialog with unsaved changes warning
function NewFile() {
    if (ChangesMadePreDownload) {
        const check = confirm(LanguageDict['GeneralFileLostWarning']);
        if (!check) return;
    }
    $("#DefaultFileList").dialog();
}