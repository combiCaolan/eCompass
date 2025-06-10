// main.js
import ParameterManager from './modules/parameterManager.js';
import sessionStorageService from './modules/sessionStorageService.js';
import uiService from './modules/uiService.js';


// Redirect if parameters are missing
if (!sessionStorageService.get('Parameters')) {
    location = '../'
}

window.ChangesMadePreDownload = false;
window.ErrorCount = false;

// Set up parameter description path
const parameterDirectoryPath = `${sessionStorage.getItem('ServerPath')}/eCompass/settings/${sessionStorage.getItem('APIV')}/${localStorage.getItem('Language')}/Description_Main.txt`;
const rawFile = new XMLHttpRequest();
rawFile.open("GET", parameterDirectoryPath, false);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
        sessionStorage.setItem('ParametersDescription', rawFile.responseText);
    }
};
rawFile.send(null);

// Backup and language preference paths
// const userBackupDirectory = 'https://support.combilift.com/wptest/ecompass/User_Backup';
// const languagePreferenceFile = 'https://support.combilift.com/wptest/ecompass/UserPreferences.txt';

// Arrays for parameter management
window.removedParameters = [];
window.removedParametersCounters = [];
window.ParametersToBeRemoved = [];

// Custom parameter lists
const customParametersSwitch = [
    '115', '130', '135', '138', '141', '143', '145', '146', '147', '148', '159', '160', '175', '205', '221', '222', '239', '240', '257', '258', '275', '276', '293', '294', '311', '312', '329', '330', '347', '348', '365', '366', '383', '384', '401', '402', '472', '487', '505', '506', '522', '527', '552', '553', '600', '617', '646', '654', '663', '665', '690', '703', '716', '729', '742', '755', '941'
];

const hydraulicBitCustomList = [
    '221', '222', '239', '240', '257', '258', '275', '276', '293', '294', '311', '312', '329', '330', '347', '348', '365', '366', '383', '384', '401', '402', '565'
];

const hydFunctionIdList = [
    '220', '238', '256', '274', '292', '310', '328', '346', '364', '382', '400'
];

const passwordList = [
    '104', '105', '106', '107', '108', '109', '110', '111'
];

const hydFunctionsOutputSetup = [
    '222', '240', '258', '276', '294', '312', '330', '348', '366', '384', '402', '565'
];

const hydFunctionsInputSetup = [
    '221', '239', '257', '275', '293', '311', '329', '347', '365', '383', '401'
];

const moCAS = [
    '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48'
];

// 999 Parameters File
export const bitParameters999 = [];
const nineFile = sessionStorageService.get('Bit999') || '';

nineFile.split('\n').forEach(line => {
    if (line.startsWith('#')) {
        bitParameters999.push(line.replace('#', '').replace(/\r/g, ''));
    }
});

// 1000 Parameters File
export const bitParameters1000 = [];
const thousandFile = sessionStorageService.get('Bit1000') || '';
thousandFile.split('\n').forEach(line => {
    if (line.startsWith('#')) {
        bitParameters1000.push(line.replace('#', '').replace(/\r/g, ''));
    }
});

// Custom Parameters Dropdown
export const customParametersDropDown = [];
const parameterMain = sessionStorageService.get('ParameterMain') || '';
parameterMain.split('\n').forEach(line => {
    const parts = line.split(',');
    if (parts[2] !== '0') {
        const paramId = Number(parts[0]);
        if (!bitParameters999.includes(paramId) && !bitParameters1000.includes(paramId)) {
            customParametersDropDown.push(parts[0]);
        }
    }
});