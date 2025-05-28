/**
 * SetElementsForLanguage.js
 * 
 * Dynamically sets UI element text and dialog titles based on the selected language.
 * Uses LanguageDict to localize all relevant UI components.
 * Best practices: descriptive variable names, docstrings, and code structure.
 */

/**
 * Sets UI element text and dialog titles according to the current language.
 */
function SetLanguage() {
	// Set dialog titles
	const dialogTitleMap = [
		['SearchParameterDialog', 'SearchDialog'],
		['ParameterChangeError', 'Message'],
		['ErrorAlertDialog', 'ErrorAlertDialog'],
		['CloseFileDialog', 'Message'],
		['OpenInNewTabDefaultFileList', 'Message'],
		['DefaultFileList', 'Message'],
		['UsernameDialog', 'Message'],
		['AccessLevelDialog', 'Message'],
		['AboutUsDialog', 'About'],
		['ChangeLanguageDialog', 'ChangeLanguageDialog'],
		['AdminPageDialog', 'AdminPageDialog'],
		['ContactSupportDialog', 'Message'],
		['CompareDialog', 'Message'],
		['LogViewerDialog', 'Message'],
		['ChangeUserDialog', 'Message'],
		['FileActionsDialog', 'Message']
	];
	dialogTitleMap.forEach(([id, dictKey]) => {
		const elem = document.getElementById(id);
		if (elem) elem.setAttribute('title', LanguageDict[dictKey]);
	});

	// Set button and label text
	const elementTextMap = [
		['OpenInNewTab', 'OpenInNewTab'],
		['ErrorButton', 'Errors'],
		['WelcomeBack', 'WelcomeBack'],
		// ['HeaderFileButton', 'File'],
		// ['HeaderToolsButton', 'Tools'],
		['HeaderSettingsButton', 'Settings'],
		// ['HeaderHelpButton', 'Help'],
		['PleaseOpenMessage', 'PleaseOpenMessage'],
		['TruckDetailsID', 'TruckDetailsText'],
		['FileDetailsID', 'FileDetailsText'],
		['SoftwareID', 'SoftwareText'],
		['ServiceID', 'ServiceTabText'],
		['MoCASID', 'MoCASText'],
		['ParametersID', 'ParameterSettingsText'],
		['FactoryID', 'FactoryIDText'],
		['DeveloperID', 'DeveloperIDText'],
		['NotAssignedID', 'NotAssignedIDText'],
		['SpecialID', 'SpecialIDText'],
		['OpenFileButton', 'open'],
		['NewFileButton', 'new'],
		['SaveFileButton', 'Save'],
		['CloseFileButton', 'Close'],
		['ExitFileButton', 'Exit'],
		['FileActionsButton', 'FileActions'],
		['CompareFilesButton', 'Compare'],
		['LogViewerButton', 'LogViewer'],
		['ChangeUserButton', 'ChangeUser'],
		['SpecialBlocks', 'SpecialBlocks'],
		['ChangeLanguageButton', 'ChangeLanguage'],
		['ChangeApiButton', 'ChangeApi'],
		['ContactSupportButton', 'ContactSupport'],
		['ManualButton', 'Manual'],
		['KnowledgeBaseButton', 'KnowledgeBase'],
		['AboutUsButton', 'AboutUs'],
		['LoadingScreenMessage', 'LoadingText'],
		['FixedUsernameText', 'UsernameFixed'],
		['FixedAccessLevelText', 'AccessLevel'],
		['FixedAPIText', 'ApiVersion'],
		['FixedLogoutText', 'Logout']
	];
	elementTextMap.forEach(([id, dictKey]) => {
		const elem = document.getElementById(id);
		if (elem) elem.innerHTML = LanguageDict[dictKey];
	});

	// Set group header titles (G1, G2, ..., GG1, etc.)
	const groupHeaders = [
		'G1', 'G2', 'G21', 'G22', 'G23', 'G231', 'G24', 'G240a', 'G240b', 'G240c', 'G240d', 'G241', 'G242', 'G243', 'G244', 'G245', 'G246', 'G247', 'G248', 'G25', 'G251', 'G26', 'G261', 'G27', 'G3', 'G31', 'G32', 'G33', 'G34', 'G4', 'G41', 'G41in', 'G41out', 'G42', 'G42in', 'G42out', 'G43', 'G43in', 'G43out', 'G44', 'G44in', 'G44out', 'G45', 'G45in', 'G45out', 'G46', 'G46in', 'G46out', 'G47', 'G47in', 'G47out', 'G48', 'G48in', 'G48out', 'G49', 'G49in', 'G49out', 'G410', 'G410in', 'G410out', 'G411', 'G411in', 'G411out', 'G5', 'G6', 'G7', 'G8', 'G81', 'G82', 'G83', 'G831', 'G832', 'G84', 'G85', 'G851', 'G86', 'G87', 'G9', 'G91', 'G911', 'G912', 'G913', 'G92', 'G93', 'G94', 'G941', 'G942', 'G943', 'G944', 'G945', 'G946', 'G95', 'G96', 'G97', 'G98', 'G10', 'G101', 'G102', 'G103', 'G104', 'G105', 'G106', 'G11', 'G12', 'G13', 'GG1', 'GG2', 'GG3', 'GG4', 'GG5', 'GG6', 'GG7', 'GG8', 'GG9', 'GH1', 'GH2'
	];
	groupHeaders.forEach(header => {
		const elem = document.getElementById('HeadTitle' + header);
		if (elem && LanguageDict[header]) elem.innerHTML = LanguageDict[header];
	});
}

function updateBitLabels() {
	// Optionally update Bit labels if on editor page
	if (typeof CurrentPage == 'undefined') {
		const CurrentPage = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
	} else {
		if (CurrentPage == 'editor.php') {
			BitLabelChecker();
		}
	}
}

module.exports = { SetLanguage };