// --- Utility Functions ---

export function fetchFileSync(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) ? xhr.responseText : '';
}

export function clearSessionKeys(keys) {
    keys.forEach(key => sessionStorage.removeItem(key));
}

export function setDefaultLanguage() {
    if (!localStorage.getItem('Language')) {
        localStorage.setItem('Language', 'english');
    }
}

export function setDefaultApi() {
    const DefaultApi = 'API-100';
    if (!sessionStorage.getItem('APIV')) {
        sessionStorage.setItem('APIV', DefaultApi);
    }
    return sessionStorage.getItem('APIV');
}

// --- Startup Logic ---

export function onStartup() {
    setDefaultApi();
    setDefaultLanguage();

    clearSessionKeys([
        'API', 'TruckDirectory', 'Parameters', 'BitDescriptionFile', 'ParametersDirForMain',
        'UnitsDirectory', 'ParametersDescription', 'ParametersFileName', 'API_Directory', 'UserMadeChanges'
    ]);

    sessionStorage.setItem('UserMadeChanges', new Date() + '\n');

    const serverPath = sessionStorage.getItem('ServerPath');
    const apiVersion = sessionStorage.getItem('APIV');
    const language = localStorage.getItem('Language');

    // Helper to build file paths
    const buildPath = (file) => `${serverPath}/settings/${apiVersion}/${language}/${file}`;

    // Read and store various files
    sessionStorage.setItem('API_Directory', fetchFileSync(buildPath('DefaultAddParameters.txt')));
    sessionStorage.setItem('LanguageFileContents', fetchFileSync(buildPath(`LANGUAGE_${language}.txt`)));
    sessionStorage.setItem('DropDownlist', fetchFileSync(buildPath('DropDown_list.txt')));
    sessionStorage.setItem('UnitsDirectory', fetchFileSync(buildPath('UnitsDirectory.txt')));
    sessionStorage.setItem('Bit999', fetchFileSync(buildPath('Parameter_999.txt')));
    sessionStorage.setItem('Bit1000', fetchFileSync(buildPath('Parameter_1000.txt')));
    sessionStorage.setItem('Description_special', fetchFileSync(buildPath('Description_special.txt')));
    sessionStorage.setItem('ParameterMainTEMP', fetchFileSync(buildPath('Parameter_Main.txt')));
    sessionStorage.setItem('Description_MainTEMP', fetchFileSync(buildPath('Description_Main.txt')));
    sessionStorage.setItem('TemplateFile', fetchFileSync(buildPath('TemplateFile.clp')));

    // --- Parse and build dictionaries ---
    window.MainDescriptionsDict = parseDescriptionDict(sessionStorage.getItem('Description_MainTEMP'));
    window.SpecialDescriptionsDict = parseSpecialDescriptionDict(sessionStorage.getItem('Description_special'));
    window.Bit999Dict = parseDescriptionDict(sessionStorage.getItem('Bit999'));
    window.Bit1000Dict = parseDescriptionDict(sessionStorage.getItem('Bit1000'));

    // --- Permissions ---
    window.ReadPermissionDict = {};
    window.WritePermissionDict = {};
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

    // --- Filter and store main parameters and descriptions ---
    const ParameterMainTEMP = sessionStorage.getItem('ParameterMainTEMP');
    let TempParMain = '', TempDescriptionMain = '', TempSpecialDescription = '', Bit999File = '', Bit1000File = '';
    if (ParameterMainTEMP) {
        ParameterMainTEMP.split('\n').forEach(line => {
            const idx = line.split(',')[0];
            if (!idx) return;
            if (idx === '1' && Number(window.AccessLevelForUser) > 7) {
                TempParMain += line + '\n';
                TempDescriptionMain += MainDescriptionsDict[Number(idx)] || '';
            } else if (Number(idx) > 1 && Number(idx) < 64) {
                TempParMain += line + '\n';
                TempDescriptionMain += MainDescriptionsDict[Number(idx)] || '';
            } else if (ReadPermissionDict[Number(idx)] <= Number(window.AccessLevelForUser)) {
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

    // Clean up temp storage and global variables
    sessionStorage.removeItem('Description_MainTEMP');
    sessionStorage.removeItem('ParameterMainTEMP');
    window.TempParMain = undefined;
    window.TempDescriptionMain = undefined;
    window.MainDescriptionsDict = undefined;

    // Redirect to front page
    location.href = '/public/select-file.php';
}

// --- Helper Parsers ---

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
onStartup();