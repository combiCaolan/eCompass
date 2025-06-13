// --- Utility Functions ---
import sessionStorageService from "../modules/sessionStorageService.js";

export function init(){
    const userDataScript = document.getElementById('user-data');

    console.log(userData);

    const userData = JSON.parse(userDataScript.textContent);

    localStorage.setItem('Language', userData.language);
    localStorage.setItem('ServerPath', userData.server_path);
    sessionStorage.setItem('loggedinusername', userData.full_name);
    sessionStorage.setItem('loggedinemail', userData.logged_user_email);
    sessionStorage.setItem('AccessLevel', userData.access_level);

}


/** Asynchronously fetch a file and return its text, or empty string on failure */
async function fetchFile(url) {
    console.log(url);
    try {
        const response = await fetch(url);
        if (!response.ok) return '';
        return await response.text();
    } catch {
        return '';
    }
}

/** Remove a set of keys from sessionStorage */
export function clearSessionKeys(keys) {
    keys.forEach(key => sessionStorage.removeItem(key));
}

/** Set default language if not already set */
export function setDefaultLanguage() {
    if (!localStorage.getItem('Language')) {
        localStorage.setItem('Language', 'english');
    }
}

/** Set default API version in sessionStorage if not set */
export function setDefaultApi() {
    const DefaultApi = 'API-100';
    if (!sessionStorage.getItem('APIV')) {
        sessionStorage.setItem('APIV', DefaultApi);
    }
    return sessionStorage.getItem('APIV');
}

// --- Main Startup Logic ---

export async function onStartup(data) {
    setDefaultApi();
    setDefaultLanguage();

    clearSessionKeys([
        'API', 'TruckDirectory', 'Parameters', 'BitDescriptionFile', 'ParametersDirForMain',
        'UnitsDirectory', 'ParametersDescription', 'ParametersFileName', 'API_Directory', 'UserMadeChanges'
    ]);

    sessionStorage.setItem('UserMadeChanges', new Date() + '\n');

    const serverPath = localStorage.getItem('ServerPath');
    const apiVersion = sessionStorage.getItem('APIV');
    const language = localStorage.getItem('Language');

    const buildPath = (file) => `${serverPath}/settings/${apiVersion}/${language}/${file}`;

    // Load all required files asynchronously
    const [
        API_Directory, LanguageFileContents, DropDownlist, UnitsDirectory,
        Bit999, Bit1000, Description_special, ParameterMainTEMP, Description_MainTEMP, TemplateFile
    ] = await Promise.all([
        fetchFile(buildPath('DefaultAddParameters.txt')),
        fetchFile(buildPath(`LANGUAGE_${language}.txt`)),
        fetchFile(buildPath('DropDown_list.txt')),
        fetchFile(buildPath('UnitsDirectory.txt')),
        fetchFile(buildPath('Parameter_999.txt')),
        fetchFile(buildPath('Parameter_1000.txt')),
        fetchFile(buildPath('Description_special.txt')),
        fetchFile(buildPath('Parameter_Main.txt')),
        fetchFile(buildPath('Description_Main.txt')),
        fetchFile(buildPath('TemplateFile.clp'))
    ]);

    // Store loaded files in sessionStorage
    sessionStorage.setItem('API_Directory', API_Directory);
    sessionStorage.setItem('LanguageFileContents', LanguageFileContents);
    sessionStorage.setItem('DropDownlist', DropDownlist);
    sessionStorage.setItem('UnitsDirectory', UnitsDirectory);
    sessionStorage.setItem('Bit999', Bit999);
    sessionStorage.setItem('Bit1000', Bit1000);
    sessionStorage.setItem('Description_special', Description_special);
    sessionStorage.setItem('ParameterMainTEMP', ParameterMainTEMP);
    sessionStorage.setItem('Description_MainTEMP', Description_MainTEMP);
    sessionStorage.setItem('TemplateFile', TemplateFile);

    // --- Parse and build dictionaries (in memory, not window) ---
    const MainDescriptionsDict = parseDescriptionDict(Description_MainTEMP);
    const SpecialDescriptionsDict = parseSpecialDescriptionDict(Description_special);
    const Bit999Dict = parseDescriptionDict(Bit999);
    const Bit1000Dict = parseDescriptionDict(Bit1000);

    // --- Permissions ---
    const ReadPermissionDict = {};
    const WritePermissionDict = {};
    if (TemplateFile) {
        TemplateFile.split('\n').forEach(line => {
            const parts = line.split(',');
            if (parts.length > 9) {
                ReadPermissionDict[parts[0]] = parts[8];
                WritePermissionDict[parts[0]] = parts[9];
            }
        });
    }

    console.log('ReadPermissionDict:', ReadPermissionDict);
    console.log('WritePermissionDict:', WritePermissionDict);

    // --- Filter and store main parameters and descriptions ---
    let TempParMain = '', TempDescriptionMain = '', TempSpecialDescription = '', Bit999File = '', Bit1000File = '';
    if (ParameterMainTEMP) {
        ParameterMainTEMP.split('\n').forEach(line => {
            const idx = line.split(',')[0];
            // if (!idx) return;
            if (idx === '1' && Number(sessionStorageService.get('AccessLevel')) > 7) {
                TempParMain += line + '\n';
                TempDescriptionMain += MainDescriptionsDict[Number(idx)] || '';
            } else if (Number(idx) > 1 && Number(idx) < 64) {
                TempParMain += line + '\n';
                TempDescriptionMain += MainDescriptionsDict[Number(idx)] || '';
            } else if (ReadPermissionDict[Number(idx)] <= Number(sessionStorageService.get('AccessLevel'))) {
                TempParMain += line + '\n';
                TempDescriptionMain += MainDescriptionsDict[Number(idx)] || '';
                if (Bit999Dict[Number(idx)]) Bit999File += Bit999Dict[Number(idx)];
                if (Bit1000Dict[Number(idx)]) Bit1000File += Bit1000Dict[Number(idx)];
                if (SpecialDescriptionsDict[Number(idx)]) TempSpecialDescription += SpecialDescriptionsDict[Number(idx)];
            }
        });
    }

    sessionStorage.setItem('Bit999', Bit999File);
    sessionStorage.setItem('Bit1000', Bit1000File);
    sessionStorage.setItem('ParameterMain', TempParMain);
    sessionStorage.setItem('DescriptionMain', TempDescriptionMain);
    sessionStorage.setItem('Description_special', TempSpecialDescription);

    // Clean up temp storage
    sessionStorage.removeItem('Description_MainTEMP');
    sessionStorage.removeItem('ParameterMainTEMP');

    // Redirect to front page
    location.href = '/public/select-file.html';
}

// --- Helper Parsers (unchanged, but should ideally move to a separate module) ---

export function parseDescriptionDict(text) {
    const dict = {};
    if (!text) return dict;
    const lines = text.split('\n');
    let counter = 0;
    while (lines[counter] !== undefined) {
        if (lines[counter][0] === '#') {
            const Index = lines[counter].replace('#', '');
            let IndexDescription = '';
            counter++;
            while (lines[counter] !== undefined && lines[counter][0] !== '#') {
                IndexDescription += '\n' + lines[counter];
                counter++;
            }
            dict[Index] = '#' + Index + IndexDescription + '\n';
        } else {
            counter++;
        }
    }
    return dict;
}

export function parseSpecialDescriptionDict(text) {
    const dict = {};
    if (!text) return dict;
    const lines = text.split('\n');
    let counter = 0;
    let StartIndex = lines[counter].split(',')[0];
    while (lines[counter] !== undefined) {
        if (lines[counter][0] === '#') {
            if (lines[counter].split(',')[0] === StartIndex) {
                const Index = StartIndex.replace('#', '');
                if (dict[Number(Index)] !== undefined) {
                    dict[Number(Index)] += lines[counter] + '\n';
                } else {
                    dict[Number(Index)] = lines[counter] + '\n';
                }
                counter++;
            } else {
                StartIndex = lines[counter].split(',')[0];
            }
        } else {
            counter++;
        }
    }
    return dict;
}

// --- Run on startup ---
// onStartup();