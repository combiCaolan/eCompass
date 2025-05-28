function InvertSymbolStyle(id){
	try{
		if(document.getElementById('HeadTitle' + id).innerHTML.includes('-')){
			NewText = document.getElementById('HeadTitle' + id).innerHTML.replace('-','+');
			document.getElementById('HeadTitle' + id).innerHTML = NewText;
		}else{
			NewText = document.getElementById('HeadTitle' + id).innerHTML.replace('+','-');
			document.getElementById('HeadTitle' + id).innerHTML = NewText;
		}
	}catch(err){}
	$("#" + id).slideToggle();
}

CurrentFile = sessionStorage.getItem('Parameters');
PostCheckFile = '';
NoPermissionMessage = '';
/*counter = 0;
ParametersPresent = [];
while(CurrentFile.split('\n')[counter] !== undefined){
	//if(Number(AccessLevelForUser) >= Number(CurrentFile.split('\n')[counter].split(',')[8])){
		ParametersPresent.push(CurrentFile.split('\n')[counter].split(',')[0]);
		PostCheckFile = PostCheckFile + '\n' + CurrentFile.split('\n')[counter];
	//}else{
	//	NoPermissionMessage = NoPermissionMessage + '\n' + "user shouldn't have access to this file : " +  CurrentFile.split('\n')[counter].split(',')[0];
	//}
	counter++;
}*/

Parameters = sessionStorage.getItem('Parameters');
if(Parameters.includes('\r')){
	Parameters = Parameters.replace(/\r/g,'\n');
}

ParametersPresent = [];
counter = 0;
PostCheckFile = '';
while(Parameters.split('\n')[counter] !== undefined){
	ParametersPresent.push(Parameters.split('\n')[counter].split(',')[0]);
	PostCheckFile = PostCheckFile + '\n' + Parameters.split('\n')[counter];
	counter++;
}

sessionStorage.setItem('Parameters',PostCheckFile);

CurrentUserMadeChanges = sessionStorage.getItem('UserMadeChanges');
sessionStorage.setItem('UserMadeChanges',CurrentUserMadeChanges + NoPermissionMessage);

function MakeMenu(){
	ParametersLocationList = new Object();

	ParametersLocationList = {};

	MenuMakeUp = sessionStorage.getItem('ParameterMain').split('\n');
	counter = 0;
	while(MenuMakeUp[counter] != undefined){
		ParametersLocationList[MenuMakeUp[counter].split(',')[0]] = MenuMakeUp[counter].split(',')[1];
		counter++;
	}

	ParametersDirForUsersFile = new Object();

	ParametersDirForUsersFile = {};

	MenuMakeUp = sessionStorage.getItem('Parameters').split('\n');
	counter = 0;
	while(MenuMakeUp[counter] != undefined){
		ParametersDirForUsersFile[MenuMakeUp[counter].split(',')[0]] = MenuMakeUp[counter];
		counter++;
	}
	
	AvailableApis = ['100','1.00','101','1.01'];
	function RunFileApi(){
		try{
		ApiVersion = ParametersDirForUsersFile[6].split(',')[3];
		}catch(err){
			ApiVersion = '100';
		}
		if(AvailableApis.includes(ApiVersion)){
			CurrentApiVersion = sessionStorage.getItem('APIV').replace('API-','');
			if(ApiVersion != CurrentApiVersion){
				alert('Changing eCompass to the version of your file. Please reopen the file again.');
				sessionStorage.setItem('APIV','API-' + ApiVersion);
				location.href = 'index.php';
			}else{
				//console.log('Api Version Matches');
			}
		}else{
			alert('The file you have loaded is requesting an api version that is not available on ecompass - please contact Combilift');
		}
	}
	
	RunFileApi();

	OrganiseMenu();
}

function OrganiseMenu(){
	
	ParameterMain = sessionStorage.getItem('ParameterMain');
	counter = 0;
	while(ParameterMain.split('\n')[counter] !== undefined){
		CurrentLine = ParameterMain.split('\n')[counter].split(',');
		Parameter = document.createElement('button');
		Parameter.innerHTML = CurrentLine[3];

		Parameter.setAttribute('id',CurrentLine[0]);
		if(Number(CurrentLine[0]) <89 && CurrentLine[0] != 2 && CurrentLine[0] != 4){
			if(ParametersDirForUsersFile[Number(CurrentLine[0])] == undefined){
				Parameter.setAttribute('onclick','MenuParametersOnclick(`empty`,this)');
			}else{
				Parameter.setAttribute('onclick','MenuParametersOnclick(`' + ParametersDirForUsersFile[Number(ParameterMain.split('\n')[counter].split(',')[0])] + '`,this)');
			}
			Parameter.setAttribute('class','PreTreeButton');
			ParameterDiv = document.createElement("div");
			ParameterDiv.setAttribute('id','constant' + CurrentLine[0]);
			if(document.getElementById(CurrentLine[1])){
				document.getElementById(CurrentLine[1]).appendChild(Parameter);
				document.getElementById(CurrentLine[1]).appendChild(ParameterDiv);
			}
		}else{
			Parameter.setAttribute('onclick','TreeViewClick(this,' + CurrentLine[0] + ')');
			
			if(CurrentLine[0] == 2 || CurrentLine[0] == 4){
				Parameter.setAttribute('class','PreTreeButton');
				ParameterDiv = document.createElement("div");
				ParameterDiv.setAttribute('id','constant' + CurrentLine[0]);
				if(document.getElementById(CurrentLine[1])){
					document.getElementById(CurrentLine[1]).appendChild(Parameter);
					document.getElementById(CurrentLine[1]).appendChild(ParameterDiv);
				}
			}else{
				CurrentGroup = CurrentLine[1].split(' ');
				if(CurrentGroup.length < 2){
					Parameter.setAttribute('onclick','TreeViewClick(this,' + CurrentLine[0] + ')');
					Parameter.setAttribute('class','TreeButton');
					ParameterDiv = document.createElement("div");
					ParameterDiv.setAttribute('id','constant' + CurrentLine[0]);
					if(document.getElementById(CurrentLine[1])){
						document.getElementById(CurrentLine[1]).appendChild(Parameter);
						document.getElementById(CurrentLine[1]).appendChild(ParameterDiv);
					}
				}else{
					for(CurrentGroupCounter = 1; CurrentGroupCounter < CurrentGroup.length; CurrentGroupCounter++){
						ParameterDiv = document.createElement("div");
						SortingDiv = document.createElement("div");
						A = CurrentGroupCounter - 1;
						if(document.getElementById(CurrentGroup[CurrentGroupCounter]) == null){
							HideButton = document.createElement('Button');
							SortingDiv.setAttribute('id',CurrentGroup[CurrentGroupCounter]);
							IndentNum = Number(CurrentGroup.length) - 1;
							SortingDiv.setAttribute('class','MenuLevel' + IndentNum);
							HideButton.setAttribute('class','TreeButton');
							
							
							/*if(CurrentLine[1].split(' ')[CurrentGroupCounter].length == 4){
								SortingDiv.setAttribute('style','margin-left:30px;');// background:yellow;')
							}
							
							if(CurrentGroupCounter == 2){
								SortingDiv.setAttribute('style','margin-left:25px;');
								//console.log('2');
							}
							
							if(CurrentLine[1].split(' ')[CurrentGroupCounter] == 'G24'){
								SortingDiv.setAttribute('style','margin-left:50px;');
							}

							if(CurrentGroupCounter == 3){
								//SortingDiv.setAttribute('style','margin-left:50px;');
								//console.log('3');
							}
							*/
							/*if(CurrentGroup[3] && CurrentGroup[3].length == 4){
								if(CurrentGroup[3] == 'G9'){
								}else{
									console.log('Menu : ' + CurrentGroup[3]);
									SortingDiv.setAttribute('style','margin-left:60px; background:gray;');
								}
							}*/
							
							HideButton.setAttribute('onclick','InvertSymbolStyle("' + CurrentGroup[CurrentGroupCounter] + '")');
							//HideButton.setAttribute('onclick','$("#' + CurrentGroup[CurrentGroupCounter] + '").slideToggle()');
							HideButton.setAttribute('id','HeadTitle' + CurrentGroup[CurrentGroupCounter]);
							//HideButton.setAttribute('style','font-weight:500;');
							if(CurrentGroup[CurrentGroupCounter] == 'G911' || CurrentGroup[CurrentGroupCounter] == 'G912' || CurrentGroup[CurrentGroupCounter] == 'G913' || CurrentGroup[CurrentGroupCounter] == 'G941' || CurrentGroup[CurrentGroupCounter] == 'G942' || CurrentGroup[CurrentGroupCounter] == 'G943' || CurrentGroup[CurrentGroupCounter] == 'G944' || CurrentGroup[CurrentGroupCounter] == 'G945' || CurrentGroup[CurrentGroupCounter] == 'G946'){
								//HideButton.setAttribute('style','font-weight:500; margin-left:40px;');
							}
							if(CurrentGroupCounter == 2){
								//HideButton.setAttribute('style','font-weight:500; margin-left:25px;');
							}
							HideButton.innerHTML = CurrentGroup[CurrentGroupCounter];
							try{
								document.getElementById(CurrentGroup[CurrentGroupCounter - 1]).appendChild(HideButton);
								HideButton.click();
								document.getElementById(CurrentGroup[A]).appendChild(SortingDiv);
							}catch(err){}
						}

						if(CurrentGroupCounter == CurrentGroup.length - 1){
							ParameterDiv.setAttribute('id','constant' + CurrentLine[0]);
							if(CurrentLine[2] == '999' || CurrentLine[2] == '1000'){
								Parameter.setAttribute('class','BitTreeButton');
							}else{
								Parameter.setAttribute('class','ThirdSubGroup');
							}
							try{
								document.getElementById(CurrentGroup[CurrentGroupCounter]).appendChild(Parameter);
								document.getElementById(CurrentGroup[CurrentGroupCounter]).appendChild(ParameterDiv);
							}catch(err){}
						}
					}
				}
			}
		}

		

		counter++;
	}

	loadDisplay();
	HideAllMenus();
	PostLoadedRun();
	BitLabelChecker();
}

MakeMenu();

function CheckParameterReadAccess(){
	ParCounter = 0;
	//ParametersPresent = [];
	Parameters = sessionStorage.getItem('Parameters').split('\n');
	while(Parameters[ParCounter] !== undefined){
		//ParametersPresent.push(Parameters[ParCounter].split(',')[0]);
		if(Number(Parameters[ParCounter].split(',')[9]) <= Number(AccessLevelForUser)){
			//Parameter Access is correct
			//console.log('Parameter should be shown');
		}else{
			//console.log(Parameters[ParCounter].split(',')[0]);
			if(document.getElementById(String(Parameters[ParCounter].split(',')[0])) && document.getElementById('constant' + String(Parameters[ParCounter].split(',')[0]))){
				document.getElementById(String(Parameters[ParCounter].split(',')[0])).setAttribute('style','display:none;');
				document.getElementById('constant' + String(Parameters[ParCounter].split(',')[0])).setAttribute('style','display:none;');
				//console.log('set');
			}
		}
		ParCounter++;
	}
}