/**
 * Dialog.js
 * 
 * Handles creation and display of various dialogs and dynamic lists in the eCompass UI.
 * Uses best practices for variable naming, code structure, and documentation.
 */

// import { SBSetDefaults } from "./special-blocks";

// Hide all menus (placeholder for future logic)
function HideAllMenus() {}

// Dynamically build the truck default file lists for loading and opening in new tab
(function buildTruckDefaultFileLists() {
    let counter = 0;
    const defaultFilesDiv = document.getElementById('DefaultFilesDiv');
    const openInNewTabDiv = document.getElementById('OpenInNewTabDefaultFileList');
    while (TruckDefaultDir[counter] !== undefined) {
        // Button to load file
        const listItem = document.createElement('li');
        const loadBtn = document.createElement('button');
        loadBtn.innerHTML = TruckDefaultDir[counter];
        let path = sessionStorage.getItem('ServerPath') + '/ecompass/Truck_Default_Files/' + TruckDefaultDir[counter];
        loadBtn.setAttribute("onclick", "readDefaultFile('" + path + "')");
        loadBtn.setAttribute("style", "margin:10px;");
        listItem.appendChild(loadBtn);

        // Button to open file in new tab
        const secondListItem = document.createElement('li');
        const openBtn = document.createElement('button');
        openBtn.innerHTML = TruckDefaultDir[counter];
        openBtn.setAttribute("onclick", "OpenInNewTab('" + path + "')");
        openBtn.setAttribute("style", "margin:10px;");
        secondListItem.appendChild(openBtn);

        if (defaultFilesDiv) defaultFilesDiv.appendChild(listItem);
        if (openInNewTabDiv) openInNewTabDiv.appendChild(secondListItem);
        counter++;
    }
})();

// Dialog openers
function LogViewerDialog() {
    window.open('https://support.combilift.net/elogs');
}

function SearchDialog() {
    $("#SearchParameterDialog").dialog();
    SearchFunctionOptions();
}

function ApiDialog() {
    $("#ChangeApiButton").dialog();
}

function ChangeUserDialog() {
    $("#ChangeLanguageDialog").dialog();
}

function ErrorAlertDialog() {
    $("#ErrorAlertDialog").dialog();
}

function SpecialBlockDialog() {
    // Clear previous content
    document.getElementById('topDefineTable').innerHTML = '';
    document.getElementById('topDefineDescription').innerHTML = '';

    // Card container
    const card = document.createElement('div');
    card.className = 'card my-3';

    // Card header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header bg-primary text-white';
    cardHeader.innerText = LanguageDict["SpecialBlocks"];
    card.appendChild(cardHeader);

    // Card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Description
    const description = document.createElement('p');
    description.className = 'mb-3';
    description.innerText = LanguageDict["SpecialBlocksDescription"];
    cardBody.appendChild(description);

    // Section headers and lists
    function section(title, list) {
        const sectionTitle = document.createElement('h6');
        sectionTitle.className = 'mt-4 mb-2 text-secondary';
        sectionTitle.innerText = title;
        cardBody.appendChild(sectionTitle);
        cardBody.appendChild(list);
    }

    function createBlock(labelText, addFile, removeFile, addHandler, removeHandler) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const label = document.createElement('span');
        label.innerText = labelText;
        listItem.appendChild(label);

        const btnGroup = document.createElement('div');
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'btn btn-sm btn-success me-2';
        addBtn.innerText = 'Add';
        addBtn.onclick = () => addHandler(addFile);
        btnGroup.appendChild(addBtn);

        if (removeFile && removeHandler) {
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn btn-sm btn-danger';
            removeBtn.innerText = 'Remove';
            removeBtn.onclick = () => removeHandler(removeFile);
            btnGroup.appendChild(removeBtn);
        }
        listItem.appendChild(btnGroup);
        return listItem;
    }

    // General blocks
    const generalList = document.createElement('ul');
    generalList.className = 'list-group';
    generalList.appendChild(createBlock('Full block of parameters', 'AllBlocks.txt', 'AllBlocks.txt', SpecialBlocksLogic, DynamicRemoveParameters));
    generalList.appendChild(createBlock('Main Info Block', 'MainInfoBlock.txt', 'MainInfoBlock.txt', SpecialBlocksLogic, SpecialBlocksLogic));
    generalList.appendChild(createBlock('Inital Setup Block', 'InitialSetupVars.txt', 'InitialSetupVars.txt', SpecialBlocksLogic, DynamicRemoveParameters));

    // MoCAS blocks
    const mocasList = document.createElement('ul');
    mocasList.className = 'list-group';
    mocasList.appendChild(createBlock('MoCAS Hourmeters Block', 'MocasHourmeter.txt', 'MocasHourmeter.txt', SpecialBlocksLogic, DynamicRemoveParameters));
    mocasList.appendChild(createBlock('MoCAS Modules Block', 'MocasModules.txt', 'MocasModules.txt', SpecialBlocksLogic, DynamicRemoveParameters));

    // Password blocks
    const passwordsList = document.createElement('ul');
    passwordsList.className = 'list-group';
    passwordsList.appendChild(createBlock('Full Passwords Block', 'UsersPasswords.txt', 'UsersPasswords.txt', SpecialBlocksLogic, DynamicRemoveParameters));
    [
        ['Password - Operator 1', 'PasswordOne.txt'],
        ['Password - Operator 2', 'PasswordTwo.txt'],
        ['Password - Operator 3', 'PasswordThree.txt'],
        ['Password - Technician', 'PasswordFour.txt'],
        ['Password - Manager', 'PasswordFive.txt'],
        ['Password - Dealer', 'PasswordSix.txt'],
        ['Password - Combilift', 'PasswordSeven.txt'],
        ['Password - Developer', 'PasswordEight.txt']
    ].forEach(([label, file]) => {
        passwordsList.appendChild(createBlock(label, file, file, SpecialBlocksLogic, DynamicRemoveParameters));
    });

    // Add sections to card body
    section('GENERAL BLOCKS', generalList);
    section('MoCAS BLOCKS', mocasList);
    section('PASSWORD BLOCKS', passwordsList);

    // Log block
    const log = document.createElement('div');
    log.className = 'alert alert-info mt-4';
    try {
        log.innerHTML = CurentFileActionLog;
    } catch (err) {}
    log.id = 'SpecialBlockLog';
    cardBody.appendChild(log);

    card.appendChild(cardBody);

    // Append card to the description area
    document.getElementById('topDefineDescription').appendChild(card);
}

// function SpecialBlockDialog() {
//     // Clear previous content
//     document.getElementById('topDefineTable').innerHTML = '';
//     document.getElementById('topDefineDescription').innerHTML = '';

//     // Title and description
//     const workSpaceTitle = document.createElement('p');
//     workSpaceTitle.id = 'WorkSpaceTitle';
//     workSpaceTitle.innerHTML = LanguageDict["SpecialBlocks"];

//     const descriptionArea = document.createElement('tr');
//     const description = document.createElement('p');
//     description.innerHTML = LanguageDict["SpecialBlocksDescription"];
//     description.id = 'description';

//     // Section headers
//     const emptySpace0 = document.createElement('p');
//     emptySpace0.innerHTML = 'GENERAL BLOCKS';
//     emptySpace0.id = 'description';
//     const emptySpace1 = document.createElement('p');
//     emptySpace1.innerHTML = 'MoCAS BLOCKS';
//     emptySpace1.id = 'description';
//     const emptySpace2 = document.createElement('p');
//     emptySpace2.innerHTML = 'PASSWORD BLOCKS';
//     emptySpace2.id = 'description';

//     // Lists for each section
//     const generalList = document.createElement('ul');
//     const mocasList = document.createElement('ul');
//     const passwordsList = document.createElement('ul');

//     // Helper to create label+button pairs
//     function createBlock(labelText, addFile, removeFile, addHandler, removeHandler) {
//         const label = document.createElement('label');
//         label.innerHTML = labelText;
//         const listItem = document.createElement('li');
//         const addBtn = document.createElement('input');
//         addBtn.type = 'submit';
//         addBtn.value = 'Add';
//         addBtn.onclick = () => SpecialBlocksLogic(addFile);
//         addBtn.id = 'FileActionsButtonWorkSpace';
//         listItem.appendChild(addBtn);

//         if (removeFile && removeHandler) {
//             const removeBtn = document.createElement('input');
//             removeBtn.type = 'submit';
//             removeBtn.value = 'Remove';
//             removeBtn.onclick = () => DynamicRemoveParameters(removeFile);
//             removeBtn.id = 'FileActionsRemoveButtonWorkSpace';
//             listItem.appendChild(removeBtn);
//         }
//         return { label, listItem };
//     }

//     // General blocks
//     const allBlocks = createBlock('Full block of parameters', 'AllBlocks.txt', 'AllBlocks.txt', SpecialBlocksLogic, DynamicRemoveParameters);
//     const mainInfoBlock = createBlock('Main Info Block', 'MainInfoBlock.txt', 'MainInfoBlock.txt', SpecialBlocksLogic, SpecialBlocksLogic);
//     const initialSetupVars = createBlock('Inital Setup Block', 'InitialSetupVars.txt', 'InitialSetupVars.txt', SpecialBlocksLogic, DynamicRemoveParameters);

//     // MoCAS blocks
//     const mocasHourmeter = createBlock('MoCAS Hourmeters Block', 'MocasHourmeter.txt', 'MocasHourmeter.txt', SpecialBlocksLogic, DynamicRemoveParameters);
//     const mocasModules = createBlock('MoCAS Modules Block', 'MocasModules.txt', 'MocasModules.txt', SpecialBlocksLogic, DynamicRemoveParameters);

//     // Password blocks
//     const usersPassword = createBlock('Full Passwords Block', 'UsersPasswords.txt', 'UsersPasswords.txt', SpecialBlocksLogic, DynamicRemoveParameters);
//     const passwordBlocks = [
//         createBlock('Password - Operator 1', 'PasswordOne.txt', 'PasswordOne.txt', SpecialBlocksLogic, DynamicRemoveParameters),
//         createBlock('Password - Operator 2', 'PasswordTwo.txt', 'PasswordTwo.txt', SpecialBlocksLogic, DynamicRemoveParameters),
//         createBlock('Password - Operator 3', 'PasswordThree.txt', 'PasswordThree.txt', SpecialBlocksLogic, DynamicRemoveParameters),
//         createBlock('Password - Technician', 'PasswordFour.txt', 'PasswordFour.txt', SpecialBlocksLogic, DynamicRemoveParameters),
//         createBlock('Password - Manager', 'PasswordFive.txt', 'PasswordFive.txt', SpecialBlocksLogic, DynamicRemoveParameters),
//         createBlock('Password - Dealer', 'PasswordSix.txt', 'PasswordSix.txt', SpecialBlocksLogic, DynamicRemoveParameters),
//         createBlock('Password - Combilift', 'PasswordSeven.txt', 'PasswordSeven.txt', SpecialBlocksLogic, DynamicRemoveParameters),
//         createBlock('Password - Developer', 'PasswordEight.txt', 'PasswordEight.txt', SpecialBlocksLogic, DynamicRemoveParameters)
//     ];

//     // Log block
//     const log = document.createElement('div');
//     try {
//         log.innerHTML = CurentFileActionLog;
//     } catch (err) {
//         // CurentFileActionLog may not exist
//     }
//     log.id = 'SpecialBlockLog';

//     // Assemble lists
//     generalList.appendChild(allBlocks.label);
//     generalList.appendChild(allBlocks.listItem);
//     generalList.appendChild(mainInfoBlock.label);
//     generalList.appendChild(mainInfoBlock.listItem);
//     generalList.appendChild(initialSetupVars.label);
//     generalList.appendChild(initialSetupVars.listItem);

//     mocasList.appendChild(mocasHourmeter.label);
//     mocasList.appendChild(mocasHourmeter.listItem);
//     mocasList.appendChild(mocasModules.label);
//     mocasList.appendChild(mocasModules.listItem);

//     passwordsList.appendChild(usersPassword.label);
//     passwordsList.appendChild(usersPassword.listItem);
//     passwordBlocks.forEach(block => {
//         passwordsList.appendChild(block.label);
//         passwordsList.appendChild(block.listItem);
//     });

//     // Append everything to the description area
//     const descDiv = document.getElementById('topDefineDescription');
//     descDiv.appendChild(workSpaceTitle);
//     descDiv.appendChild(descriptionArea);
//     descDiv.appendChild(emptySpace0);
//     descDiv.appendChild(generalList);
//     descDiv.appendChild(emptySpace1);
//     descDiv.appendChild(mocasList);
//     descDiv.appendChild(emptySpace2);
//     descDiv.appendChild(passwordsList);
//     descDiv.appendChild(log);

//     descriptionArea.appendChild(description);
// }

// Other dialogs
function AboutUsDialog() {
    $("#AboutUsDialog").dialog();
}

function UsernameDialog() {
    $("#UsernameDialog").dialog();
}

function AccessLevelDialog() {
    $("#ChangeUserDialog").dialog();
}

function ContactSupportDialog() {
    $("#ContactSupportDialog").dialog();
}

function ChangeLanguageDialog() {
    $("#ChangeLanguageDialog").dialog();
}

function AdminPageDialog() {
    $("#AdminPageDialog").dialog();
}

function ErrorMessageDialog(Title, Message) {
    $("#ParameterChangeError").dialog();
    document.getElementById('ErrorDialogMessage').innerHTML = Message;
}

function FileActionsDialog() {
    // Clear previous content
    document.getElementById('topDefineTable').innerHTML = '';
    document.getElementById('topDefineDescription').innerHTML = '';

    // Card container
    const card = document.createElement('div');
    card.className = 'card my-3';

    // Card header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header bg-primary text-white';
    cardHeader.innerText = LanguageDict["FileActions"];
    card.appendChild(cardHeader);

    // Card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Description
    const description = document.createElement('p');
    description.className = 'mb-3';
    description.innerText = LanguageDict["FileActionsDescription"];
    cardBody.appendChild(description);

    // File action buttons
    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group mb-3';
    btnGroup.role = 'group';

    const runDefault = document.createElement('button');
    runDefault.type = 'button';
    runDefault.className = 'btn btn-outline-success';
    runDefault.innerText = 'Load Default Values to Current Values';
    runDefault.onclick = SBSetDefaults;

    const runFactory = document.createElement('button');
    runFactory.type = 'button';
    runFactory.className = 'btn btn-outline-primary';
    runFactory.innerText = 'Load Factory Default to Current Values';
    runFactory.onclick = SBSetFactory;

    btnGroup.appendChild(runDefault);
    btnGroup.appendChild(runFactory);

    // Only show these if access level is high enough
    if (Number(sessionStorage.getItem('AccessLevel')) > 7) {
        const setFactory = document.createElement('button');
        setFactory.type = 'button';
        setFactory.className = 'btn btn-outline-danger';
        setFactory.innerText = 'Copy Current Values to Factory Values';
        setFactory.onclick = MakeFactoryFileActions;
        btnGroup.appendChild(setFactory);
    }
    if (Number(sessionStorage.getItem('AccessLevel')) > 4) {
        const setDefault = document.createElement('button');
        setDefault.type = 'button';
        setDefault.className = 'btn btn-outline-warning';
        setDefault.innerText = 'Copy Current Values to Default Values';
        setDefault.onclick = MakeDefaultFileActions;
        btnGroup.appendChild(setDefault);
    }

    cardBody.appendChild(btnGroup);

    // Log block
    const log = document.createElement('div');
    log.className = 'alert alert-info mt-4';
    try {
        log.innerHTML = CurentFileActionLog;
    } catch (err) {}
    log.id = 'SpecialBlockLog';
    cardBody.appendChild(log);

    card.appendChild(cardBody);

    // Append card to the description area
    document.getElementById('topDefineDescription').appendChild(card);
}

// function FileActionsDialog() {
//     // Clear previous content
//     document.getElementById('topDefineTable').innerHTML = '';
//     document.getElementById('topDefineDescription').innerHTML = '';

//     // Title and description
//     const workSpaceTitle = document.createElement('p');
//     workSpaceTitle.id = 'WorkSpaceTitle';
//     workSpaceTitle.innerHTML = LanguageDict["FileActions"];

//     const descriptionArea = document.createElement('tr');
//     const description = document.createElement('p');
//     description.innerHTML = LanguageDict["FileActionsDescription"];
//     description.id = 'description';

//     // File action buttons
//     const unorderedList = document.createElement('ul');
//     const listItemOne = document.createElement('li');
//     const listItemTwo = document.createElement('li');
//     const listItemThree = document.createElement('li');
//     const listItemFour = document.createElement('li');

//     const runDefault = document.createElement('input');
//     runDefault.type = 'submit';
//     runDefault.value = 'Load Default Values to Current Values';
//     runDefault.onclick = SBSetDefaults;
//     runDefault.id = 'FileActionsButtonWorkSpace';

//     const runFactory = document.createElement('input');
//     runFactory.type = 'submit';
//     runFactory.value = 'Load Factory Default to Current Values';
//     runFactory.onclick = SBSetFactory;
//     runFactory.id = 'FileActionsButtonWorkSpace';

//     const setDefault = document.createElement('input');
//     setDefault.type = 'submit';
//     setDefault.value = 'Copy Current Values to Default Values';
//     setDefault.onclick = MakeDefaultFileActions;
//     setDefault.id = 'FileActionsButtonWorkSpace';

//     const setFactory = document.createElement('input');
//     setFactory.type = 'submit';
//     setFactory.value = 'Copy Current Values to Factory Values';
//     setFactory.onclick = MakeFactoryFileActions;
//     setFactory.id = 'FileActionsButtonWorkSpace';

//     // Log block
//     const log = document.createElement('div');
//     try {
//         log.innerHTML = CurentFileActionLog;
//     } catch (err) {
//         // CurentFileActionLog Doesn't exist
//     }
//     log.id = 'SpecialBlockLog';

//     // Assemble UI
//     document.getElementById('topDefineDescription').appendChild(workSpaceTitle);
//     document.getElementById('topDefineDescription').appendChild(descriptionArea);
//     document.getElementById('topDefineDescription').appendChild(unorderedList);
//     document.getElementById('topDefineDescription').appendChild(log);

//     unorderedList.appendChild(listItemOne);
//     unorderedList.appendChild(listItemTwo);

//     if (Number(sessionStorage.getItem('AccessLevel')) > 7) {
//         unorderedList.appendChild(listItemFour);
//     }
//     if (Number(sessionStorage.getItem('AccessLevel')) > 4) {
//         unorderedList.appendChild(listItemThree);
//     }

//     listItemOne.appendChild(runDefault);
//     listItemTwo.appendChild(runFactory);
//     listItemThree.appendChild(setDefault);
//     listItemFour.appendChild(setFactory);

//     descriptionArea.appendChild(description);
// }