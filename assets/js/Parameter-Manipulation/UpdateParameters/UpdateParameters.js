function UpdateCurrentValue(LineNumber,NewValue){
	counter = 0;
	Parameters = sessionStorage.getItem('Parameters').split('\n');
	while(Parameters[counter] != undefined){
		BrokeLine = Parameters[counter].split(',');
		if(Parameters[counter].split(',')[0] == LineNumber){
			NewLine = BrokeLine[0] + ',' + NewValue + ',' + BrokeLine[2] + ',' + BrokeLine[3] + ',' + BrokeLine[4] + ',' + BrokeLine[5] + ',' + BrokeLine[6] + ',' + BrokeLine[7] + ',' + BrokeLine[8] + ',' + BrokeLine[9] + ',' + BrokeLine[10];
			NewSession = sessionStorage.getItem('Parameters').replace(Parameters[counter],NewLine);
			sessionStorage.setItem('Parameters',NewSession);
			break;
		}
		counter++;
	}
}

function UpdateDefaultValue(LineNumber,NewValue){
	counter = 0;
	Parameters = sessionStorage.getItem('Parameters').split('\n');
	while(Parameters[counter] != undefined){
		BrokeLine = Parameters[counter].split(',');
		if(Parameters[counter].split(',')[0] == LineNumber){
			NewLine = BrokeLine[0] + ',' + BrokeLine[1] + ',' + NewValue  + ',' + BrokeLine[3] + ',' + BrokeLine[4] + ',' + BrokeLine[5] + ',' + BrokeLine[6] + ',' + BrokeLine[7] + ',' + BrokeLine[8] + ',' + BrokeLine[9] + ',' + BrokeLine[10];
			NewSession = sessionStorage.getItem('Parameters').replace(Parameters[counter],NewLine);
			sessionStorage.setItem('Parameters',NewSession);
			break;
		}
		counter++;
	}
}

function UpdateFactoryValue(LineNumber,NewValue){
	counter = 0;
	Parameters = sessionStorage.getItem('Parameters').split('\n');
	while(Parameters[counter] != undefined){
		BrokeLine = Parameters[counter].split(',');
		if(Parameters[counter].split(',')[0] == LineNumber){
			NewLine = BrokeLine[0] + ',' + BrokeLine[1] + ',' + BrokeLine[2] + ',' + NewValue  + ',' + BrokeLine[4] + ',' + BrokeLine[5] + ',' + BrokeLine[6] + ',' + BrokeLine[7] + ',' + BrokeLine[8] + ',' + BrokeLine[9] + ',' + BrokeLine[10];
			NewSession = sessionStorage.getItem('Parameters').replace(Parameters[counter],NewLine);
			sessionStorage.setItem('Parameters',NewSession);
			break;
		}
		counter++;
	}
}


function UpdateMinValue(LineNumber,NewValue){
	counter = 0;
	Parameters = sessionStorage.getItem('Parameters').split('\n');
	while(Parameters[counter] != undefined){
		BrokeLine = Parameters[counter].split(',');
		if(Parameters[counter].split(',')[0] == LineNumber){
			NewLine = BrokeLine[0] + ',' + BrokeLine[1] + ',' + BrokeLine[2] + ',' + BrokeLine[3]  + ',' + NewValue + ',' + BrokeLine[5] + ',' + BrokeLine[6] + ',' + BrokeLine[7] + ',' + BrokeLine[8] + ',' + BrokeLine[9] + ',' + BrokeLine[10];
			NewSession = sessionStorage.getItem('Parameters').replace(Parameters[counter],NewLine);
			sessionStorage.setItem('Parameters',NewSession);
			break;
		}
		counter++;
	}
}


function UpdateMaxValue(LineNumber,NewValue){
	counter = 0;
	Parameters = sessionStorage.getItem('Parameters').split('\n');
	while(Parameters[counter] != undefined){
		BrokeLine = Parameters[counter].split(',');
		if(Parameters[counter].split(',')[0] == LineNumber){
			NewLine = BrokeLine[0] + ',' + BrokeLine[1] + ',' + BrokeLine[2] + ',' + BrokeLine[3]  + ',' + BrokeLine[4] + ',' + NewValue + ',' + BrokeLine[6] + ',' + BrokeLine[7] + ',' + BrokeLine[8] + ',' + BrokeLine[9] + ',' + BrokeLine[10];
			NewSession = sessionStorage.getItem('Parameters').replace(Parameters[counter],NewLine);
			sessionStorage.setItem('Parameters',NewSession);
			break;
		}
		counter++;
	}
}


function MocasUpdate(ParameterLine){
	NumberToFind = Number(ParameterLine.split(',')[0]);
	
	NewLine = ParameterLine.split(',')[0] + ',' + document.getElementById('CurrentDropDownValue').value.replace('\r','') + ',' +  ParameterLine.split(',')[2] + ',' + ParameterLine.split(',')[3] + ',' + ParameterLine.split(',')[4] + ',' + ParameterLine.split(',')[5] + ',' + ParameterLine.split(',')[6] + ',' + ParameterLine.split(',')[7] + ',' + ParameterLine.split(',')[8] + ',' + ParameterLine.split(',')[9] + ',' + ParameterLine.split(',')[10];
	
	ChangeTo = document.getElementById('CurrentDropDownValue').options[document.getElementById('CurrentDropDownValue').selectedIndex].innerHTML;
	
	CurrentParameterTitle = document.getElementById('WorkSpaceTitle').innerHTML;
	LogLine = sessionStorage.getItem('loggedinusername') + ' changed ' + CurrentParameterTitle + ' [Current Value] to ' + ChangeTo + '\n';
	CurrentLogs = sessionStorage.getItem('UserMadeChanges');
	sessionStorage.setItem('UserMadeChanges',CurrentLogs + LogLine);
	
	New = sessionStorage.getItem('Parameters').replace(ParameterLine.replace(/\n/g,''),NewLine.replace(/\n/g,''));
	sessionStorage.setItem('Parameters',New);
	ChangesMadePreDownload = true;

	
	document.getElementById(NumberToFind.toString()).setAttribute('onclick','MenuParametersOnclick(`' + NewLine + '`,this)');
	document.getElementById(NumberToFind.toString()).click();
}

function UpdateMocasPermission(){
	alert('Update Mocas Permission');
}