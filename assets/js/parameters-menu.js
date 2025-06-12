// parameters-menu.js
import { treeViewClick } from './parameters-view.js';
import { MenuParametersOnclick } from './Parameter-Types/FixedParameters.js';
import { PostLoadedRun, BitLabelChecker } from './post-load.js';
import sessionStorageService from './modules/sessionStorageService.js';
window.treeViewClick = treeViewClick; // Now available globally

// import { MenuParametersOnclick, treeViewClick } from './parameters-view.js';
/**
 * Toggle the symbol (+/-) for a menu section and slide the section open/closed.
 * @param {string} id - The section ID.
 */
function invertSymbolStyle(id) {
    try {
        const btn = document.getElementById('HeadTitle' + id);
        if (!btn) return;
        btn.innerHTML = btn.innerHTML.includes('-')
            ? btn.innerHTML.replace('-', '+')
            : btn.innerHTML.replace('+', '-');
    } catch (err) {
        // Silent fail
    }
    const section = document.getElementById(id);
    if (section) {
        section.style.display = section.style.display === 'none' ? '' : 'none';
    }
}

/**
 * Hide all menu sections and reset their toggle symbols.
 */
function hideAllMenus() {
    // Hide all menu sections (IDs: A-J, G911, etc.)
    const ids = [
        ...'ABCDEFGHIJ',
        'G911', 'G912', 'G913', 'G941', 'G942', 'G943', 'G944', 'G945', 'G946'
    ];
    ids.forEach(id => {
        const section = document.getElementById(id);
        if (section) section.style.display = 'none';
        const btn = document.getElementById('HeadTitle' + id);
        if (btn) btn.innerHTML = btn.innerHTML.replace('-', '+');
    });
}

/**
 * Parse parameters from sessionStorage and return as array of arrays.
 * @param {string} key - sessionStorage key.
 * @returns {Array<Array<string>>}
 */
function getParametersArray(key) {
    const raw = sessionStorageService.get(key) || '';
    return raw.replace(/\r/g, '\n').split('\n').filter(Boolean).map(line => line.split(','));
}

/**
 * Build the menu structure from sessionStorage data.
 */
function makeMenu() {
    // Build lookup for parameter locations
    const parameterMainArr = getParametersArray('ParameterMain');
    const parametersLocationList = {};
    parameterMainArr.forEach(line => {
        parametersLocationList[line[0]] = line[1];
    });

    // Build lookup for user's file parameters
    const parametersArr = getParametersArray('Parameters');
    const parametersDirForUsersFile = {};
    parametersArr.forEach(line => {
        if (line.length) parametersDirForUsersFile[line[0]] = line.join(',');
    });

    // API version check
    const availableApis = ['100', '1.00', '101', '1.01'];
    let apiVersion = '100';
    try {
        // apiVersion = parametersArr[6]?.[3] || '100';
		ApiVersion = ParametersDirForUsersFile[6].split(',')[3];
    } catch (err) {}
    if (availableApis.includes(apiVersion)) {
        const currentApiVersion = (sessionStorageService.get('APIV') || '').replace('API-', '');
        if (apiVersion !== currentApiVersion) {
            alert('Changing eCompass to the version of your file. Please reopen the file again.');
            sessionStorageService.set('APIV', 'API-' + apiVersion);
            location.href = 'index.php';
            return;
        }
    } else {
		const currentApiVersion = (sessionStorageService.get('APIV') || '').replace('API-', '');
		alert(currentApiVersion)
		alert(apiVersion)
        alert('The file you have loaded is requesting an API version that is not available on eCompass - please contact Combilift');
    }

    organiseMenu(parameterMainArr, parametersDirForUsersFile);
}

/**
 * Organise and render the menu structure.
 * @param {Array<Array<string>>} parameterMainArr
 * @param {Object} parametersDirForUsersFile
 */
function organiseMenu(parameterMainArr, parametresDirForUsersFile) {
    console.log(parameterMainArr);
    console.log(parametresDirForUsersFile);
    parameterMainArr.forEach(line => {
        if (!line.length) return;
        const [id, group, , label, , , , , , access] = line;
        const btn = document.createElement('button');
        btn.innerHTML = '- ' + label || '';
        btn.id = id;

        // Main menu logic
        if (Number(id) < 89 && id !== '2' && id !== '4') {
            btn.className = 'PreTreeButton';
            btn.onclick = () => MenuParametersOnclick(parametresDirForUsersFile[id] || 'empty', btn);
            const div = document.createElement('div');
            div.id = 'constant' + id;
            const parent = document.getElementById(group);
            if (parent) {
                parent.appendChild(btn);
                parent.appendChild(div);
            }
        } else {
            btn.onclick = () => treeViewClick(btn, id);
            if (id === '2' || id === '4') {
                btn.className = 'PreTreeButton';
                const div = document.createElement('div');
                div.id = 'constant' + id;
                const parent = document.getElementById(group);
                if (parent) {
                    parent.appendChild(btn);
                    parent.appendChild(div);
                }
            } else {
                const groups = group.split(' ');
                if (groups.length < 2) {
                    btn.className = 'PreTreeButton';
                    const div = document.createElement('div');
                    div.id = 'constant' + id;
                    const parent = document.getElementById(group);
                    if (parent) {
                        parent.appendChild(btn);
                        parent.appendChild(div);
                    }
                } else {
                    for (let i = 1; i < groups.length; i++) {
                        if (!document.getElementById(groups[i])) {
                            const sortingDiv = document.createElement('div');
                            sortingDiv.id = groups[i];
                            sortingDiv.className = 'MenuLevel' + (groups.length - 1);
                            const hideBtn = document.createElement('button');
                            hideBtn.className = 'PreTreeButton';
                            hideBtn.id = 'HeadTitle' + groups[i];
                            hideBtn.onclick = () => invertSymbolStyle(groups[i]);
                            hideBtn.innerHTML = groups[i];
                            try {
                                document.getElementById(groups[i - 1]).appendChild(hideBtn);
                                hideBtn.click();
                                document.getElementById(groups[i - 1]).appendChild(sortingDiv);
                            } catch (err) {}
                        }
                        if (i === groups.length - 1) {
                            const div = document.createElement('div');
                            div.id = 'constant' + id;
                            btn.className = (line[2] === '999' || line[2] === '1000') ? 'BitTreeButton' : 'ThirdSubGroup';
                            try {
                                document.getElementById(groups[i]).appendChild(btn);
                                document.getElementById(groups[i]).appendChild(div);
                            } catch (err) {}
                        }
                    }
                }
            }
        }
    });

     // --- Add buttons for parameters in parametresDirForUsersFile not in parameterMainArr ---
    // Build a set of IDs from parameterMainArr for quick lookup
    const mainArrIds = new Set(parameterMainArr.map(line => line[0]));

    console.log(mainArrIds);

    Object.entries(parametresDirForUsersFile).forEach(([id, lineStr]) => {
        if (mainArrIds.has(id)) return; // Already handled above

        // Create or select the element for this id
        let btn = document.getElementById(id);
        if (!btn) {
            btn = document.createElement('button');
            btn.id = id;
            btn.innerHTML = `Parameter ${id}`;
            // You can customize the label as needed
            // Optionally, append to a default parent or a special section
            document.getElementById('I').appendChild(btn);
            // document.body.appendChild(btn); // Change this to your desired parent
        }
        // btn.onclick = () => MenuParametersOnclick(parametresDirForUsersFile[id], btn);
        btn.onclick = () => treeViewClick(document.getElementById(btn.id), btn);
    });

    hideAllMenus();
    PostLoadedRun();
    BitLabelChecker();
}

/**
 * Hide menu items the user does not have access to.
 */
function checkParameterReadAccess() {
    const parametersArr = getParametersArray('Parameters');
    parametersArr.forEach(line => {
        if (!line.length) return;
        const [id, , , , , , , , , access] = line;
        alert(access)
        if (Number(access) > Number(window.AccessLevelForUser)) {
            const btn = document.getElementById(id);
            const div = document.getElementById('constant' + id);
            if (btn) btn.style.display = 'none';
            if (div) div.style.display = 'none';
        }
    });
}
// Initialize menu on load
document.addEventListener('DOMContentLoaded', makeMenu);
// window.makeMenu = makeMenu;