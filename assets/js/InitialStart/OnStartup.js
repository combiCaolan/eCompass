/*START OF ONSTARUP.JS*/
DefaultApi = 'API-100';
if (sessionStorage.getItem('APIV') == null) {
	sessionStorage.setItem('APIV', DefaultApi);
}

CurrentDefaultApiVersion = sessionStorage.getItem('APIV');

if (localStorage.getItem('Language') == undefined) {
	localStorage.setItem('Language', 'english');
}
sessionStorage.removeItem('API');
sessionStorage.removeItem('TruckDirectory');
sessionStorage.removeItem('Parameters');
sessionStorage.removeItem('BitDescriptionFile');
sessionStorage.removeItem('ParametersDirForMain');
sessionStorage.removeItem('UnitsDirectory');
sessionStorage.removeItem('ParametersDescription');
sessionStorage.removeItem('ParametersFileName');
sessionStorage.removeItem('API_Directory');
sessionStorage.removeItem('UserMadeChanges');

var d = new Date();
sessionStorage.setItem('UserMadeChanges', d + '\n');
/*Start Reading Paramters API File*/
file = String(sessionStorage.getItem('ServerPath') + '/Settings-files/' + sessionStorage.getItem('APIV') + '/' + localStorage.getItem('Language') + '/DefaultAddParameters.txt');
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			sessionStorage.setItem('API_Directory', rawFile.responseText);
		}
	}
}
rawFile.send(null);
/*End Reading Parameters API File*/

/*START LANGUAGESET.JS*/
if (localStorage.getItem('Language')) {
	CurrentLanguage = localStorage.getItem('Language').replace('\r', '');
	CurrentLanguageDirectory = sessionStorage.getItem('ServerPath') + String('/Settings-files/' + sessionStorage.getItem('APIV') + '/' + localStorage.getItem('Language') + '/LANGUAGE_' + localStorage.getItem('Language') + '.txt');
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", CurrentLanguageDirectory, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				LanguageFile = rawFile.responseText;
				//LanguageFileRead - Setting to sessionStorage so can read later and asign global variables
				sessionStorage.setItem('LanguageFileContents', LanguageFile);
			}
		}
	}
	rawFile.send(null);
}
/*END LANGUAGESET.JS*/


/*Start Reading Language File*/
file = String(sessionStorage.getItem('ServerPath') + '/Settings-files/' + sessionStorage.getItem('APIV') + '/' + localStorage.getItem('Language') + '/LANGUAGE_' + localStorage.getItem('Language') + '.txt');
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			sessionStorage.setItem('LanguageFileContents', rawFile.responseText);
		}
	}
}
rawFile.send(null);
/*End Reading Language File*/


/*Start Reading Dropdown List*/
file = String(sessionStorage.getItem('ServerPath') + '/Settings-files/' + CurrentDefaultApiVersion + '/' + localStorage.getItem('Language') + '/DropDown_list.txt');
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			sessionStorage.setItem('DropDownlist', rawFile.responseText);
		}
	}
}
rawFile.send(null);
/*End Reading Dropdown List*/

/*Start Reading Units Directory*/
//Opening Units Directory for finding Units Model
UnitsDirectoryPath = String(sessionStorage.getItem('ServerPath') + '/Settings-files/' + CurrentDefaultApiVersion + '/' + localStorage.getItem('Language') + '/UnitsDirectory.txt');

var rawFile = new XMLHttpRequest();
rawFile.open("GET", UnitsDirectoryPath, false);
rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			var UnitsDir = rawFile.responseText;
			sessionStorage.setItem('UnitsDirectory', UnitsDir);
		}
	}
}
rawFile.send(null);


/*End Reading Units Directory*/

/*Start Reading Bit 999 File*/
file = String(sessionStorage.getItem('ServerPath') + '/Settings-files/' + CurrentDefaultApiVersion + '/' + localStorage.getItem('Language') + '/Parameter_999.txt');
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			sessionStorage.setItem('Bit999', rawFile.responseText);
		}
	}
}
rawFile.send(null);
/*End Reading Bit 999 File*/

/*Start Reading Bit 1000 File*/
file = String(sessionStorage.getItem('ServerPath') + '/Settings-files/' + CurrentDefaultApiVersion + '/' + localStorage.getItem('Language') + '/Parameter_1000.txt');
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			Bit1000 = rawFile.responseText;
			sessionStorage.setItem('Bit1000', Bit1000);
		}
	}
}
rawFile.send(null);
/*End Reading Bit 1000 File*/

/*Start Reading Special Description File*/
file = String(sessionStorage.getItem('ServerPath') + '/Settings-files/' + CurrentDefaultApiVersion + '/' + localStorage.getItem('Language') + '/Description_special.txt');
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			SpecialDescription = rawFile.responseText;
			sessionStorage.setItem('Description_special', SpecialDescription);
		}
	}
}
rawFile.send(null);
/*End Reading Special Description File*/


/*Start Reading Parameter Main*/
file = String(sessionStorage.getItem('ServerPath') + '/Settings-files/' + sessionStorage.getItem('APIV') + '/' + localStorage.getItem('Language') + '/Parameter_Main.txt');
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			sessionStorage.setItem('ParameterMainTEMP', rawFile.responseText);

		}
	}
}
rawFile.send(null);
/*End Reading Parameter Main*/



/*Start Reading Parameters Description File*/
file = String(sessionStorage.getItem('ServerPath') + '/Settings-files/' + sessionStorage.getItem('APIV') + '/' + localStorage.getItem('Language') + '/Description_Main.txt');
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			sessionStorage.setItem('Description_MainTEMP', rawFile.responseText);

		}
	}
}
rawFile.send(null);
/*End Reading Parameters Description File*/



/*Start Reading Template clp File*/
file = String(sessionStorage.getItem('ServerPath') + '/Settings-files/' + sessionStorage.getItem('APIV') + '/' + localStorage.getItem('Language') + '/TemplateFile.clp');
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			sessionStorage.setItem('TemplateFile', rawFile.responseText);

		}
	}
}
rawFile.send(null);

/*End Reading Template clp File*/

MainDescriptionsDict = {};

Description = sessionStorage.getItem('Description_MainTEMP');
counter = 0;
while (Description.split('\n')[counter] != undefined) {
	if (Description.split('\n')[counter][0] == '#') {
		Index = Description.split('\n')[counter].replace('#', '');
		IndexDescription = '';
		counter++;
		while (Description.split('\n')[counter] != undefined && Description.split('\n')[counter][0] != '#') {
			IndexDescription = IndexDescription + '\n' + Description.split('\n')[counter];
			counter++;
		}


		MainDescriptionsDict[Index] = '#' + Index + IndexDescription + '\n';
	} else {
		counter++;
	}
}


//START Cleaning Up description special
SpecialDescriptionsDict = {};

SpecialDescription = sessionStorage.getItem('Description_special');
counter = 0;
StartIndex = SpecialDescription.split('\n')[counter].split(',')[0];
while (SpecialDescription.split('\n')[counter] != undefined) {
	if (SpecialDescription.split('\n')[counter][0] == '#') {
		if (SpecialDescription.split('\n')[counter].split(',')[0] == StartIndex) {
			//console.log('adding to this : ' + StartIndex);
			Index = StartIndex.replace('#', '');
			if (SpecialDescriptionsDict[Number(Index)] != undefined) {
				SpecialDescriptionsDict[Number(Index)] = SpecialDescriptionsDict[Number(Index)] + SpecialDescription.split('\n')[counter] + '\n';
			} else {
				SpecialDescriptionsDict[Number(Index)] = SpecialDescription.split('\n')[counter] + '\n';
			}
			counter++;
		} else {
			StartIndex = SpecialDescription.split('\n')[counter].split(',')[0];
		}
	} else {
		// SpecialDescriptionsDict[Number(Index)] = SpecialDescriptionsDict[Number(Index)] + SpecialDescription.split('\n')[counter] + '\n';
		counter++;
	}
}
//END cleaning up description special

//START Cleaning Up Bit 999

Bit999Dict = {};

Bit999 = sessionStorage.getItem('Bit999');
counter = 0;
while (Bit999.split('\n')[counter] != undefined) {
	if (Bit999.split('\n')[counter][0] == '#') {
		Index = Bit999.split('\n')[counter].replace('#', '');
		IndexDescription = '';
		counter++;
		while (Bit999.split('\n')[counter] != undefined && Bit999.split('\n')[counter][0] != '#') {
			IndexDescription = IndexDescription + '\n' + Bit999.split('\n')[counter];
			counter++;
		}
		Bit999Dict[Index] = '#' + Index + IndexDescription + '\n';
	} else {
		counter++;
	}
}
//END cleaning up Bit 999

//START Cleaning Up Bit 1000

Bit1000Dict = {};

Bit1000 = sessionStorage.getItem('Bit1000');
counter = 0;
while (Bit1000.split('\n')[counter] != undefined) {
	if (Bit1000.split('\n')[counter][0] == '#') {
		Index = Bit1000.split('\n')[counter].replace('#', '');
		IndexDescription = '';
		counter++;
		while (Bit1000.split('\n')[counter] != undefined && Bit1000.split('\n')[counter][0] != '#') {
			IndexDescription = IndexDescription + '\n' + Bit1000.split('\n')[counter];
			counter++;
		}
		if (Index != undefined && IndexDescription != undefined && IndexDescription != "undefined") {
			Bit1000Dict[Index] = '#' + Index + IndexDescription + '\n';
		}
	} else {
		counter++;
	}
}
//END cleaning up Bit 1000

ReadPermissionDict = {};
WritePermissionDict = {};

Template = sessionStorage.getItem('TemplateFile');
counter = 0;
while (Template.split('\n')[counter] != undefined) {
	ReadPermissionDict[Template.split('\n')[counter].split(',')[0]] = Template.split('\n')[counter].split(',')[8];
	WritePermissionDict[Template.split('\n')[counter].split(',')[0]] = Template.split('\n')[counter].split(',')[9];
	counter++;
}


TempParMain = '';
TempSpecialDescription = '';
TempDescriptionMain = '';
Bit999File = '';
Bit1000File = '';
ParameterMainTEMP = sessionStorage.getItem('ParameterMainTEMP');



counter = 0;
while (ParameterMainTEMP.split('\n')[counter] != undefined) {
	//Checking for Index 1
	if (ParameterMainTEMP.split('\n')[counter].split(',')[0] == '1') {
		if (Number(AccessLevelForUser) > 7) {
			TempParMain = TempParMain + ParameterMainTEMP.split('\n')[counter] + '\n';
			TempDescriptionMain = TempDescriptionMain + MainDescriptionsDict[Number(ParameterMainTEMP.split('\n')[counter].split(',')[0])];
		}
	}

	//console.log(TempParMain);

	//Checking for Index's 2 - 63
	if (Number(ParameterMainTEMP.split('\n')[counter].split(',')[0]) > 1 && Number(ParameterMainTEMP.split('\n')[counter].split(',')[0]) < 64) {
		TempParMain = TempParMain + ParameterMainTEMP.split('\n')[counter] + '\n';
		TempDescriptionMain = TempDescriptionMain + MainDescriptionsDict[Number(ParameterMainTEMP.split('\n')[counter].split(',')[0])];
	} else if (ReadPermissionDict[Number(ParameterMainTEMP.split('\n')[counter].split(',')[0])] <= Number(AccessLevelForUser)) {
		TempParMain = TempParMain + ParameterMainTEMP.split('\n')[counter] + '\n';
		TempDescriptionMain = TempDescriptionMain + MainDescriptionsDict[Number(ParameterMainTEMP.split('\n')[counter].split(',')[0])];
		if (Bit999Dict[Number(ParameterMainTEMP.split('\n')[counter].split(',')[0])] != undefined) {
			Bit999File = Bit999File + Bit999Dict[Number(ParameterMainTEMP.split('\n')[counter].split(',')[0])];
		}
		if (Bit1000Dict[Number(ParameterMainTEMP.split('\n')[counter].split(',')[0])] != undefined) {
			Bit1000File = Bit1000File + Bit1000Dict[Number(ParameterMainTEMP.split('\n')[counter].split(',')[0])];
		}
		if (SpecialDescriptionsDict[Number(ParameterMainTEMP.split('\n')[counter].split(',')[0])] != undefined) {
			TempSpecialDescription = TempSpecialDescription + SpecialDescriptionsDict[Number(ParameterMainTEMP.split('\n')[counter].split(',')[0])];
		}
	}

	counter++;
}

sessionStorage.setItem('Bit999', Bit999File);
sessionStorage.setItem('Bit1000', Bit1000File);
sessionStorage.setItem('ParameterMain', TempParMain);
sessionStorage.setItem('DescriptionMain', TempDescriptionMain);
sessionStorage.setItem('Description_special', TempSpecialDescription);

TempParMain = undefined;
TempDescriptionMain = undefined;
MainDescriptionsDict = undefined;
sessionStorage.removeItem('Description_MainTEMP');
sessionStorage.removeItem('ParameterMainTEMP');

location.href = '/public/frontpage.php';
/*END OF ONSTARTUP.JS*/