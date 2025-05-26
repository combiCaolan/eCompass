/*START POSTLOAD.JS*/
function BitLabelChecker() {
	//1000AppendCurrentValue
	try {

		ACV1000 = ["220", "238", "256", "274", "292", "310", "328", "346", "364", "382", "400"];

		ACVCounter1000 = 0;
		while (ACV1000[ACVCounter1000] != undefined) {

			TabId = document.getElementById(ACV1000[ACVCounter1000]).parentNode.id.replace('out', '').replace('in', '');

			CurrentValue = UserParametersFileDict[ACV1000[ACVCounter1000]].split(',')[1];

			MidVal = CurrentValue & 255;


			FinalVal = DropDownOptionsDict['11_' + MidVal];

			if (document.getElementById('HeadTitle' + TabId).innerHTML.includes('+')) {
				document.getElementById('HeadTitle' + TabId).innerHTML = '+ ' + FinalVal;
			} else {
				document.getElementById('HeadTitle' + TabId).innerHTML = '- ' + FinalVal;
			}
			ACVCounter1000++;
		}
	} catch (err) {
		//console.log('1000 Tag Append - ERROR');
	}
}

Parameters = sessionStorage.getItem('Parameters');
if (Parameters.includes('\r')) {
	Parameters = Parameters.replace(/\r/g, '\n');
}

ParametersPresent = [];
counter = 0;
PostCheckFile = '';
while (Parameters.split('\n')[counter] !== undefined) {
	ParametersPresent.push(Parameters.split('\n')[counter].split(',')[0]);
	PostCheckFile = PostCheckFile + '\n' + Parameters.split('\n')[counter];
	counter++;
}

function CloseMenus() {


	/*
	
	DropDownUni('A','DropDownMachineDetails');
	DropDownUni('B','FileDetails');
	DropDownUni('C','Software');
	DropDownUni('D','Service');
	DropDownUni('E','DropDownMoCAS');
	DropDownUni('G','GDrop');
	DropDownUni('H','HDrop');
	DropDownUni('F','DropDownParameters');
	DropDownUni('I','IDrop');
	DropDownUni('J','JDrop');
	*/

	$("#A").slideUp();
	$("#B").slideUp();
	$("#C").slideUp();
	$("#D").slideUp();
	$("#E").slideUp();
	$("#F").slideUp();
	$("#G").slideUp();
	$("#H").slideUp();
	$("#I").slideUp();
	$("#J").slideUp();


	$("#G1").slideUp();
	$("#G2").slideUp();
	$("#G21").slideUp();
	$("#G22").slideUp();
	$("#G23").slideUp();
	$("#G231").slideUp();
	$("#G24").slideUp();
	$("#G240a").slideUp();
	$("#G240b").slideUp();
	$("#G240c").slideUp();
	$("#G240d").slideUp();
	$("#G25").slideUp();
	$("#G251").slideUp();
	$("#G26").slideUp();
	$("#G261").slideUp();
	$("#G27").slideUp();
	$("#G3").slideUp();
	$("#G31").slideUp();
	$("#G32").slideUp();
	$("#G33").slideUp();
	$("#G34").slideUp();
	$("#G4").slideUp();
	$("#G41").slideUp();
	$("#G41in").slideUp();
	$("#G41out").slideUp();
	$("#G42").slideUp();
	$("#G42in").slideUp();
	$("#G42out").slideUp();
	$("#G43").slideUp();
	$("#G43in").slideUp();
	$("#G43out").slideUp();
	$("#G44").slideUp();
	$("#G44in").slideUp();
	$("#G44out").slideUp();
	$("#G45").slideUp();
	$("#G45in").slideUp();
	$("#G45out").slideUp();
	$("#G46").slideUp();
	$("#G46in").slideUp();
	$("#G46out").slideUp();
	$("#G47").slideUp();
	$("#G47in").slideUp();
	$("#G47out").slideUp();
	$("#G48").slideUp();
	$("#G48in").slideUp();
	$("#G48out").slideUp();
	$("#G49").slideUp();
	$("#G49in").slideUp();
	$("#G49out").slideUp();
	$("#G410").slideUp();
	$("#G410in").slideUp();
	$("#G410out").slideUp();
	$("#G411").slideUp();
	$("#G411in").slideUp();
	$("#G411out").slideUp();
	$("#G5").slideUp();
	$("#G6").slideUp();
	$("#G7").slideUp();
	$("#G8").slideUp();
	$("#G81").slideUp();
	$("#G82").slideUp();
	$("#G83").slideUp();
	$("#G831").slideUp();
	$("#G832").slideUp();
	$("#G84").slideUp();
	$("#G85").slideUp();
	$("#G851").slideUp();
	$("#G86").slideUp();
	$("#G87").slideUp();
	$("#G9").slideUp();
	$("#G91").slideUp();
	$("#G92").slideUp();
	$("#G93").slideUp();
	$("#G94").slideUp();
	$("#G95").slideUp();
	$("#G96").slideUp();
	$("#G97").slideUp();
	$("#G98").slideUp();
	$("#G941").slideUp();
	$("#G942").slideUp();
	$("#G943").slideUp();
	$("#G944").slideUp();
	$("#G945").slideUp();
	$("#G946").slideUp();
	$("#G912").slideUp();
	$("#G913").slideUp();
	$("#G911").slideUp();
	$("#G241").slideUp();
	$("#G242").slideUp();
	$("#G243").slideUp();
	$("#G244").slideUp();
	$("#G245").slideUp();
	$("#G246").slideUp();
	$("#G247").slideUp();
	$("#G248").slideUp();
	$("#G10").slideUp();
	$("#G101").slideUp();
	$("#G102").slideUp();
	$("#G103").slideUp();
	$("#G104").slideUp();
	$("#G105").slideUp();
	$("#G106").slideUp();
	$("#G11").slideUp();
	$("#G12").slideUp();
	$("#G13").slideUp();
	$("#GG1").slideUp();
	$("#GG2").slideUp();
	$("#GG3").slideUp();
	$("#GG4").slideUp();
	$("#GG5").slideUp();
	$("#GG6").slideUp();
	$("#GG7").slideUp();
	$("#GG8").slideUp();
	$("#GG9").slideUp();
	$("#GH1").slideUp();
	$("#GH2").slideUp();
}

function PostLoadedRun() {
	CloseMenus();
	$("#F").slideDown();

	try {
		Style999Counter = 0;
		while (BitParameters999[Style999Counter] != undefined && BitParameters999[Style999Counter] != "undefined" && BitParameters999[Style999Counter] != null) {
			document.getElementById(BitParameters999[Style999Counter]).setAttribute('style', 'display:none;');
			TreeViewClick(document.getElementById(BitParameters999[Style999Counter]), BitParameters999[Style999Counter], 'START');
			Style999Counter++;
		}
	} catch (err) {
		//		console.log('999 STYLE - ERROR');
	}

	try {
		Style1000Counter = 0;
		while (BitParameters1000[Style1000Counter] != undefined && BitParameters1000[Style1000Counter] != "undefined" && BitParameters1000[Style1000Counter] != null) {
			document.getElementById(BitParameters1000[Style1000Counter]).setAttribute('style', 'display:none;');
			TreeViewClick(document.getElementById(BitParameters1000[Style1000Counter]), BitParameters1000[Style1000Counter], 'START');
			Style1000Counter++;
		}
	} catch (err) {
		//		console.log('1000 STYLE - ERROR');
	}
	ParameterMainDict = {};
	counter = 0;
	while (ParameterMain.split('\n')[counter] != undefined) {
		ParameterMainDict[ParameterMain.split('\n')[counter].split(',')[0]] = ParameterMain.split('\n')[counter];
		counter++;
	}
}


DropDownFile = sessionStorage.getItem('DropDownlist');

DropDownLineNum = 0;
DropDownOptionsDict = {};

CurrentDropDownId = undefined;

try {
	while (DropDownFile.split('\n')[DropDownLineNum] != undefined) {
		if (DropDownFile.split('\n')[DropDownLineNum][0] == '#') {
			//NEW DROPDOWN
			CurrentDropDownId = DropDownFile.split('\n')[DropDownLineNum].replace('#', '');
		} else {
			DropDownOptionsDict[CurrentDropDownId + '_' + DropDownFile.split('\n')[DropDownLineNum].split(',')[1]] = DropDownFile.split('\n')[DropDownLineNum].split(',')[0];
		}
		DropDownLineNum++;
	}
} catch (err) { }

AccessLevel = sessionStorage.getItem('AccessLevel');

if (Number(AccessLevel) != 8) {
	document.getElementById('G').remove();
	document.getElementById('H').remove();
	document.getElementById('I').remove();
	document.getElementById('J').remove();

	document.getElementsByClassName('GTreeTab')[0].remove();
	document.getElementsByClassName('HTreeTab')[0].remove();
	document.getElementsByClassName('ITreeTab')[0].remove();
	document.getElementsByClassName('JTreeTab')[0].remove();
}

if (sessionStorage.getItem('ParametersFileName').includes(sessionStorage.getItem('ServerPath'))) {
	FileTitle = sessionStorage.getItem('ParametersFileName').split('/');
	document.title = FileTitle[FileTitle.length - 1];
} else {
	FileTitle = sessionStorage.getItem('ParametersFileName').split('\\');
	document.title = FileTitle[FileTitle.length - 1];
}

//ERROR CHECK ON STARTUP

//alert(ParametersPresent);
function IntegrityCheckOnStartup() {
	if (ParametersPresent.includes('1') && ParametersPresent.includes('1500')) {
		Parameters = sessionStorage.getItem('Parameters');

		counter = 0;
		while (Parameters.split('\n')[counter] != undefined) {
			if (Parameters.split('\n')[counter] != '') {


				//Checking for decimal Values in whole line
				CheckerLineOne = Parameters.split('\n')[counter].replace(/,/g, '');
				CheckerLineTwo = Number(CheckerLineOne);
				//console.log(CheckerLine);
				if (CheckerLineOne.includes('.')) {
					alert('there was an unkown parameter loaded in this file, redirecting now (Either a decimal or value over 1500)');
					//alert(Parameters.split('\n')[counter].split(',')[0]);
					location.href = 'index.php';
					break;
				}

				if (Number(Parameters.split('\n')[counter].split(',')[0]) > 1500 || Number.isInteger(Number(Parameters.split('\n')[counter].split(',')[0])) == false) {
					alert('there was an unkown parameter loaded in this file, redirecting now (Either a decimal or value over 1500)');
					//alert(Parameters.split('\n')[counter].split(',')[0]);
					location.href = 'index.php';
					break;
				}

				//Checking For Illegal Characters
				if (isNaN(Number(Parameters.split('\n')[counter].replace(/,/g, '').replace(/-/g, ''))) == true) {
					alert('there was some illegal characters in this clp file, redirecting now');
					location.href = 'index.php';
					break;
				}

				//Check for 11 Values
				if (Parameters.split('\n')[counter].includes(',') == true) {
					if (Parameters.split('\n')[counter].split(',').length != 11) {
						alert('This file has a line without 11 values');
						location.href = 'index.php';
						break;
					}
				}
			}
			counter++;
		}

	} else {
		alert('Necessary Parameters for basic operation are not included in this file - will not allow changes to be made')
		//location.href= 'index.php';
	}
	NecessaryParameters = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];
	Missingtwentytwoparameters = [];

	counter = 0;
	while (NecessaryParameters[counter] != undefined) {
		if (ParametersPresent.includes(NecessaryParameters[counter])) {
			//console.log('Pre 22 parameter is present : ' + NecessaryParameters[counter]);
		} else {
			//alert('Be aware - you are missing this parameter' + LabelDict[Number(NecessaryParameters[counter])]);
			Missingtwentytwoparameters.push(LabelDict[Number(NecessaryParameters[counter])]);
		}
		counter++;
	}

	if (Missingtwentytwoparameters != '') {
		alert('You are missing the following parameters in your pre 22 parameters - ' + Missingtwentytwoparameters);
	}
}

$(document).ready(function () {
	$("#SEARCHBAR").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$("#ParametersSearchList a").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});

function DynamicMenuOpenTool(Index) {
	CloseMenus();
	$("#F").slideDown();

	ToOpen = ParameterMainDict[Index].split(',')[1].split(' ');

	//console.log(ToOpen);

	counter = 1;
	while (ToOpen[counter] != undefined) {
		//console.log(ToOpen[counter]);
		InvertSymbolStyle(ToOpen[counter].toString());
		counter++;
	}

	if (ParameterMainDict[Index].split(',')[2] != '999' && ParameterMainDict[Index].split(',')[2] != '1000') {
		document.getElementById(Index.toString()).click();
	}
}

function OLDSearchFunctionOptions() {



	document.getElementById('ParametersSearchList').innerHTML = '';
	//START SEARCH DIALOG
	counter = 1;

	ContinueUntil = Object.keys(LabelDict).length - 1;

	while (counter != ContinueUntil) {
		if (LabelDict[counter] != undefined) {
			//console.log(LabelDict[counter]);
			Option = document.createElement('a');
			//let AimId = '#' + document.getElementById(counter).parentNode.id;
			if (counter > 64) {
				Option.setAttribute('onclick', '$(' + counter + ').slideToggle(); TreeViewClick(document.getElementById(`' + counter + '`),' + counter + ');');
			} else {
				Option.setAttribute('onclick', 'DynamicMenuOpenTool(' + counter + '); MenuParametersOnclick(`' + UserParametersFileDict[counter] + '`,document.getElementById(`' + counter + '`));');
			}
			Option.setAttribute('id', 'SearchDialogMessageOption');
			Option.innerHTML = LabelDict[counter] + '	';
			if (LabelDict[counter].includes('+')) {
				//console.log('not displaying this.');
			} else {
				//console.log(document.getElementById(counter));
				if (document.getElementById(counter) != null && UserParametersFileDict[counter] != undefined && counter > 64) {
					document.getElementById('ParametersSearchList').appendChild(Option);
				}
			}
			counter++;
		} else {
			counter++;
		}
	}
	//END SEARCH DIALOG
}






function SearchFunctionOptions() {

	document.getElementById('ParametersSearchList').innerHTML = '';
	//START SEARCH DIALOG
	counter = 0;

	while (sessionStorage.getItem('ParameterMain').split('\n')[counter] != undefined) {
		CurrentLine = sessionStorage.getItem('ParameterMain').split('\n')[counter];

		if (CurrentLine.split(',')[2] != '999' && CurrentLine.split(',')[2] != '1000') {
			Option = document.createElement('a');
			//let AimId = '#' + document.getElementById(counter).parentNode.id;
			if (Number(CurrentLine.split(',')[0]) > 64) {
				Option.setAttribute('onclick', 'DynamicMenuOpenTool(' + Number(CurrentLine.split(',')[0]) + '); TreeViewClick(document.getElementById(`' + CurrentLine.split(',')[0] + '`),' + Number(CurrentLine.split(',')[0]) + ');');
			}
			Option.setAttribute('id', 'SearchDialogMessageOption');
			Option.innerHTML = CurrentLine.split(',')[3] + '	';

			//console.log(document.getElementById(counter));
			if (Number(CurrentLine.split(',')[0]) > 64) {
				document.getElementById('ParametersSearchList').appendChild(Option);
				//console.log(CurrentLine);
			}

		}

		counter++;
	}



	counter = 0;

	CurrentIndex = undefined;

	while (sessionStorage.getItem('Bit999').split('\n')[counter] != undefined) {
		CurrentLine = sessionStorage.getItem('Bit999').split('\n')[counter];

		if (CurrentLine[0] == '#') {
			CurrentIndex = CurrentLine.replace('#', '');
		} else {
			Option = document.createElement('a');
			//let AimId = '#' + document.getElementById(counter).parentNode.id;
			//CurrentIndex
			//FirstNumber
			//document.getElementById('constant' + CurrentIndex).childNodes[0].childNodes[CurrentLine.split(',')[0]].childNodes[0].click();
			Option.setAttribute('onclick', 'document.getElementById("constant' + CurrentIndex + '").childNodes[0].childNodes[' + CurrentLine.split(",")[0] + '].childNodes[0].click(); DynamicMenuOpenTool(' + Number(CurrentIndex) + ')');
			Option.setAttribute('id', 'SearchDialogMessageOption');
			Option.innerHTML = CurrentLine.split(',')[2] + '	';


			document.getElementById('ParametersSearchList').appendChild(Option);
		}
		counter++;
		//END SEARCH DIALOG
	}



	counter = 0;

	CurrentIndex = undefined;

	thirdCounter = 1;

	while (sessionStorage.getItem('Bit1000').split('\n')[counter] != undefined) {
		CurrentLine = sessionStorage.getItem('Bit1000').split('\n')[counter];

		if (CurrentLine[0] == '#') {
			CurrentIndex = CurrentLine.replace('#', '');
			secondCounter = 0;
			thirdCounter++;
		} else {

			Option = document.createElement('a');
			Option.setAttribute('onclick', 'document.getElementById("constant' + CurrentIndex + '").childNodes[0].childNodes[' + secondCounter + '].childNodes[0].click(); DynamicMenuOpenTool(' + Number(CurrentIndex) + ')');
			Option.setAttribute('id', 'SearchDialogMessageOption');

			Option.innerHTML = 'Hyd ' + Math.floor((thirdCounter + 1) / 3) + ' | ' + CurrentLine.split(',')[3] + '	';


			document.getElementById('ParametersSearchList').appendChild(Option);
			secondCounter++;
		}
		counter++;
		//END SEARCH DIALOG
	}

	/*END POSTLOAD.JS*/
}