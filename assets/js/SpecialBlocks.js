ExemptParameters = [];

function SBSetDefaults(){
	Check = confirm(LanguageDict['FileActionsDefaultCheckMsg']);
	if(Check != true){
		return;
	}
	//document.getElementById('topDefineDescription').innerHTML = '';
	//document.getElementById('topDefineTable').innerHTML = '';
	Parameters = sessionStorage.getItem('Parameters');
	NewParametersFile = '';
	
	counter = 0;
	while(Parameters.split('\n')[counter] != undefined){
		if(Number(Parameters.split('\n')[counter].split(',')[0]) > 99){
			if(Parameters.split('\n')[counter] != ''){
				NewLine = Parameters.split('\n')[counter];
			}
			
		}else{
			SplitLine = Parameters.split('\n')[counter].split(',');
			NewLine = SplitLine[0] + ',' + SplitLine[2] + ',' + SplitLine[2] + ',' + SplitLine[3] + ',' + SplitLine[4] + ',' + SplitLine[5] + ',' + SplitLine[6] + ',' + SplitLine[7] + ',' + SplitLine[8] + ',' + SplitLine[9] + ',' +	SplitLine[10];
		}
		
		NewParametersFile = NewParametersFile + NewLine + '\n';
		counter++;
	}
	
	sessionStorage.setItem('Parameters',NewParametersFile)
	today = new Date();
	time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	document.getElementById('SpecialBlockLog').innerHTML = document.getElementById('SpecialBlockLog').innerHTML + time.toString() + '* All Current Values set back to Default <br/>' + '\n';
	CurrentUserLog = sessionStorage.getItem('UserMadeChanges');
	sessionStorage.setItem('UserMadeChanges',CurrentUserLog + '\n' + '* All Current Values set back to Default');
	CurentFileActionLog = document.getElementById('SpecialBlockLog').innerHTML;
	alert('Successfully set Parameterse back to Default');
}

function SBSetFactory(){
	Check = confirm(LanguageDict['FileActionsFactoryCheckMsg']);
	if(Check != true){
		return;
	}
	//document.getElementById('topDefineDescription').innerHTML = '';
	//document.getElementById('topDefineTable').innerHTML = '';
	Parameters = sessionStorage.getItem('Parameters');
	NewParametersFile = '';
	
	counter = 0;
	while(Parameters.split('\n')[counter] != undefined){
		SplitLine = Parameters.split('\n')[counter].split(',');
		
		if(Number(Parameters.split('\n')[counter].split(',')[0]) > 99){
		if(Parameters.split('\n')[counter] != ''){
			NewLine = SplitLine[0] + ',' + SplitLine[3] + ',' + SplitLine[2] + ',' + SplitLine[3] + ',' + SplitLine[4] + ',' + SplitLine[5] + ',' + SplitLine[6] + ',' + SplitLine[7] + ',' + SplitLine[8] + ',' + SplitLine[9] + ',' + SplitLine[10];
		}
		}else{
			NewLine = Parameters.split('\n')[counter];
		}
		NewParametersFile = NewParametersFile + NewLine + '\n';
		counter++;
	}
	
	sessionStorage.setItem('Parameters',NewParametersFile)
	today = new Date();
	time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	document.getElementById('SpecialBlockLog').innerHTML = document.getElementById('SpecialBlockLog').innerHTML + time.toString() + '* All Current Values set back to Factory <br/>' + '\n';
	CurrentUserLog = sessionStorage.getItem('UserMadeChanges');
	sessionStorage.setItem('UserMadeChanges',CurrentUserLog + '\n' + '* All Current Values set back to Factory');
	CurentFileActionLog = document.getElementById('SpecialBlockLog').innerHTML;
	alert('Successfully set Parameters back to Factory');
}

function MakeDefaultFileActions(){
	Check = confirm('Are you sure you are happy with your current values? These values will now be your default values.');
	
	if(Check != true){
		return;
	}
	
	Parameters = sessionStorage.getItem('Parameters');
	NewParametersFile = '';
	
	counter = 0;
	while(Parameters.split('\n')[counter] != undefined){
		SplitLine = Parameters.split('\n')[counter].split(',');
		
		if(Number(Parameters.split('\n')[counter].split(',')[0]) > 99){
			if(Parameters.split('\n')[counter] != ''){
			
				NewLine = SplitLine[0] + ',' + SplitLine[1] + ',' + SplitLine[1] + ',' + SplitLine[3] + ',' + SplitLine[4] + ',' + SplitLine[5] + ',' + SplitLine[6] + ',' + SplitLine[7] + ',' + SplitLine[8] + ',' + SplitLine[9] + ',' + SplitLine[10];
			}
		}else{
			NewLine = Parameters.split('\n')[counter];
		}
		NewParametersFile = NewParametersFile + NewLine + '\n';
		counter++;
	}
	
	sessionStorage.setItem('Parameters',NewParametersFile)
	today = new Date();
	time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	document.getElementById('SpecialBlockLog').innerHTML = document.getElementById('SpecialBlockLog').innerHTML + time.toString() + '* All Current Values set back to Factory <br/>' + '\n';
	CurrentUserLog = sessionStorage.getItem('UserMadeChanges');
	sessionStorage.setItem('UserMadeChanges',CurrentUserLog + '\n' + '* All Default Values were set By Current Values');
	CurentFileActionLog = document.getElementById('SpecialBlockLog').innerHTML;
	alert('Successfully set Default Values By Current Values');
}

function MakeFactoryFileActions(){
	Check = confirm('Are you sure you are happy with your current values? These values will now be your factory values.');
	if(Check != true){
		return;
	}

	Parameters = sessionStorage.getItem('Parameters');
	NewParametersFile = '';
	
	counter = 0;
	while(Parameters.split('\n')[counter] != undefined){
		SplitLine = Parameters.split('\n')[counter].split(',');
		
		if(Number(Parameters.split('\n')[counter].split(',')[0]) > 99){
			if(Parameters.split('\n')[counter] != ''){
				NewLine = SplitLine[0] + ',' + SplitLine[1] + ',' + SplitLine[2] + ',' + SplitLine[1] + ',' + SplitLine[4] + ',' + SplitLine[5] + ',' + SplitLine[6] + ',' + SplitLine[7] + ',' + SplitLine[8] + ',' + SplitLine[9] + ',' + SplitLine[10];
			}
		}else{
			NewLine = Parameters.split('\n')[counter];
		}
		NewParametersFile = NewParametersFile + NewLine + '\n';
		counter++;
	}
	
	sessionStorage.setItem('Parameters',NewParametersFile)
	today = new Date();
	time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	document.getElementById('SpecialBlockLog').innerHTML = document.getElementById('SpecialBlockLog').innerHTML + time.toString() + '* All Current Values set back to Factory <br/>' + '\n';
	CurrentUserLog = sessionStorage.getItem('UserMadeChanges');
	sessionStorage.setItem('UserMadeChanges',CurrentUserLog + '\n' + '* All Factory Values were set by Curent Values');
	CurentFileActionLog = document.getElementById('SpecialBlockLog').innerHTML;
	alert('Successfully set Factory Values By Current Values');
}

function SpecialBlocksLogic(FileName){
	document.getElementById('SpecialBlockLog').innerHTML = '';
	/*Start Reading Log SpecialBlocks File*/
	file = String('SpecialBlocks/' + FileName);
	rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				SpecialBlocksFile = rawFile.responseText;
				
				counter = 0;
				while(SpecialBlocksFile.split('\n')[counter]!= undefined){
					if(ParametersPresent.includes(SpecialBlocksFile.split('\n')[counter].split(',')[0])){
						AlreadyHereMessage = document.createElement('p');
						AlreadyHereMessage.innerHTML = LabelDict[Number(SpecialBlocksFile.split('\n')[counter].split(',')[0])] + ' : This Parameter already exists - so will skip to next one';
						AlreadyHereMessage.setAttribute('style','color:green; font-weight:400; font-size:12px; margin:0;');
						document.getElementById('SpecialBlockLog').appendChild(AlreadyHereMessage);
					}else{
						CurrentParametersFile = sessionStorage.getItem('Parameters');
						NewFile = CurrentParametersFile.replace(CurrentParametersFile.split('\n')[1],CurrentParametersFile.split('\n')[1] + '\n' + SpecialBlocksFile.split('\n')[counter]);
						
						sessionStorage.setItem('Parameters',NewFile);
						
						ParametersPresent.push(SpecialBlocksFile.split('\n')[counter].split(',')[0]);
						
						LineNumber = SpecialBlocksFile.split('\n')[counter].split(',')[0];
						
						MissingMessage = document.createElement('p');
						MissingMessage.innerHTML = LabelDict[Number(SpecialBlocksFile.split('\n')[counter].split(',')[0])];
						MissingMessage.setAttribute('style','color:red; font-weight:400; font-size:12px; margin:0;');
						document.getElementById('SpecialBlockLog').appendChild(MissingMessage);
					}
					counter++;
				}
			}
		}
	}
	rawFile.send(null);
	
	alert('Added Parameters to your file - will now refresh Ecompass to accomodate new Parameters');
	location.reload();
}

function DynamicRemoveParameters(FileName){
	/*Start Reading Log SpecialBlocks File*/
	file = String('SpecialBlocks/' + FileName);
	rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				SpecialBlocksFile = rawFile.responseText;
				
				counter = 0;
				while(SpecialBlocksFile.split('\n')[counter]!= undefined){
					if(ParametersPresent.includes(SpecialBlocksFile.split('\n')[counter].split(',')[0])){
						CurrentParametersFile = sessionStorage.getItem('Parameters');
						NewFile = CurrentParametersFile.replace(UserParametersFileDict[Number(SpecialBlocksFile.split('\n')[counter].split(',')[0])] + '\n','');
						alert(UserParametersFileDict[Number(SpecialBlocksFile.split('\n')[counter].split(',')[0])]);
						
						sessionStorage.setItem('Parameters',NewFile);
						
					}else{
						//console.log('that parameter was not here in the first place');
					}
					counter++;
				}
			}
		}
	}
	rawFile.send(null);
	
	alert('Removed those Parameters from your file - will now refresh Ecompass to ensure ecompass runs well');
	//console.log(NewFile);
	//location.reload();
}