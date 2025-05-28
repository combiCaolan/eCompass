function DropDownFunction(ParameterLine,object){
	try{
		//console.log(WritePermissionDict[Number(ParameterLine[0])]);
	}catch(err){
		return;
	}
	if(document.getElementById('topDefineDescription')){
		document.getElementById('topDefineDescription').innerHTML = '';
	}
	
	DropDownList = sessionStorage.getItem('DropDownlist');
	ParameterDescriptionList = sessionStorage.getItem('DescriptionMain');
	
	NumberToFind = Number(ParameterLine[0]);
	if(document.getElementById('constant' + NumberToFind).innerHTML != ''){
		document.getElementById('constant' + NumberToFind).innerHTML = '';
	}

	tr = document.createElement('tr');
	//Title
	Title= document.createElement('P');
	Title.setAttribute('id','WorkSpaceTitle');
	Title.innerHTML = object.innerHTML;
	document.getElementById('topDefineTable').appendChild(Title);
	ParameterMain = sessionStorage.getItem('ParameterMain');
	counter = 0;
	while(ParameterMain.split('\n')[counter].split(',')[0] !== NumberToFind){
		if(ParameterMain.split('\n')[counter].split(',')[0] == NumberToFind){
			OptionIndex = ParameterMain.split('\n')[counter].split(',')[2];
			break;
		}
		counter++;
	}

	if(NumberToFind == '2'){
	    var http = new XMLHttpRequest();
		
		url = sessionStorage.getItem('ServerPath') + '/ecompass/assets/Truck_Images/' + ParameterLine[3] + '.png';
		http.open('HEAD', url, false);
		http.send();

		if(http.status != 404){
			TruckImage = document.createElement('img');
			TruckImage.setAttribute('src',sessionStorage.getItem('ServerPath') + '/assets/truck-images/' + ParameterLine[3] + '.png');	
			TruckImage.setAttribute('id','TruckImage');
			tr.appendChild(TruckImage);
		}
	}

	/*Description*/
	var descriptionDiv = document.createElement("div");	
	var description = document.createElement("p");
	description.setAttribute("id","description"); 
	descriptionDiv.appendChild(description);
	tr.appendChild(descriptionDiv);
	
	if(MainDescriptionsDict[Number(ParameterLine[0])]){
		description.innerHTML = MainDescriptionsDict[Number(ParameterLine[0])].replace('#' + ParameterLine[0],'');
	}

	/*End Description*/
	/*STARTING EXPORT*/
				ExportDiv = document.createElement('div');
				//tr.appendChild(ExportDiv);
				
				SwitchParameterLabel = document.createElement("label");
				SwitchParameterLabel.setAttribute('id','Export');
				SwitchParameterLabel.innerHTML = LanguageDict["ExportSelectedParamters"];
				ExportDiv.appendChild(SwitchParameterLabel);	
				
				SwitchParameter = document.createElement("input");
				SwitchParameter.setAttribute('id','Export');
				SwitchParameter.type = 'checkbox';
				
				SwitchParameter.setAttribute("id","Switch Parameter Checkbox");
				
				if(removedParametersCounters.includes(String(Line)) == false){
					//parameter is not in remove list
					SwitchParameter.setAttribute("checked","");
					document.getElementById('topDefineDescription').setAttribute('style','opacity:1;');
				}else{
					document.getElementById('topDefineDescription').setAttribute('style','opacity:0.4;');
				}	
				
				SwitchParameter.setAttribute("onchange","exportonchange("+Line[0]+",this)"); 
				SwitchParameter.setAttribute("style","text-align:center; font-size:18px;"); 
				ExportDiv.appendChild(SwitchParameter);	
	/*ENDING EXPORT*/

	/*Create Dropdown option*/
	DropDownOptionsDictionary = {};
	i = 0;
	while(DropDownList.split('\n')[i] !== undefined){
		if(DropDownList.split('\n')[i][0] == '#'){
			if(Number(DropDownList.split('\n')[i].replace('#','')) == Number(OptionIndex)){
				CurrentTag = document.createElement('p');
				CurrentTag.setAttribute('id','ReadResult');
				CurrentTag.innerHTML = LanguageDict["CurrentValue"];
				tr.appendChild(CurrentTag);
				DropDown = document.createElement('select');
				DropDown.setAttribute('onchange','DropDownOnChange(`' + ParameterLine + '`)');
				DropDown.setAttribute('id','CurrentDropDownValue');
				DropDown.setAttribute('selectedIndex',ParameterLine[3].toString());
				tr.appendChild(DropDown);
				i++;
				while(DropDownList.split('\n')[i][0] !== '#'){
					Option = document.createElement('option');
					Option.value = DropDownList.split('\n')[i].split(',')[1];
					if(NumberToFind == '2'){
						if(Number(DropDownList.split('\n')[i].split(',')[1]) == Number(ParameterLine[3])){
							Option.setAttribute('selected','selected');
						}
					}else{
						if(Number(DropDownList.split('\n')[i].split(',')[1]) == Number(ParameterLine[1])){
							Option.setAttribute('selected','selected');
						}
					}
					Option.innerHTML = DropDownList.split('\n')[i].split(',')[0];
					DropDownOptionsDictionary[DropDownList.split('\n')[i].split(',')[1].replace('\n','').replace('\r','')] = DropDownList.split('\n')[i].split(',')[0];
					DropDown.appendChild(Option);
					i++;
				}
			}
		}
		i++;
	}

	//Default & Factory
	if(NumberToFind != '2'){
		if(AccessLevelForUser == '8'){
			DefaultSelectTag = document.createElement('select');
			DefaultSelectTag.setAttribute('onchange','DefaultDropDownOnChange(`' + ParameterLine + '`)');
			DefaultSelectTag.setAttribute('id','DefaultSelectTag');
			counter = 0;
			if(DropDownOptionsDictionary[JSON.stringify(counter)] == undefined){
				counter++;
			}
			DefaultTag = document.createElement('p');
			DefaultTag.setAttribute('id','ReadResult');
			DefaultTag.innerHTML = LanguageDict["DefaultValue"];
			tr.appendChild(DefaultTag);
			while(DropDownOptionsDictionary[counter.toString()] !== undefined){
				Option = document.createElement('option');
				Option.value = counter.toString();
				Option.innerHTML = DropDownOptionsDictionary[counter.toString()];
				if(JSON.stringify(counter) == ParameterLine[2].toString()){
					Option.setAttribute('selected','selected')
				}
				DefaultSelectTag.appendChild(Option);
				counter++;
			}

			tr.appendChild(DefaultSelectTag);
			FactorySelectTag = document.createElement('select');
			FactorySelectTag.setAttribute('onchange','FactoryDropDownOnChange(`' + ParameterLine + '`)');
			FactorySelectTag.setAttribute('id','FactorySelectTag');
			counter = 0;
			if(DropDownOptionsDictionary[JSON.stringify(counter)] == undefined){
				counter++;
			}
			
			FactoryTag = document.createElement('p');
			FactoryTag.setAttribute('id','ReadResult');
			FactoryTag.innerHTML = LanguageDict["FactoryValue"];
			tr.appendChild(FactoryTag);
			tr.appendChild(FactorySelectTag);
		}else{
			DefaultTag = document.createElement('p');
			DefaultTag.setAttribute('id','DropDownReadTitle');
			DefaultTag.innerHTML = 'Default Value : ' + DropDownOptionsDictionary[ParameterLine[2].toString()];
			tr.appendChild(DefaultTag);
			FactoryTag = document.createElement('p');
			FactoryTag.setAttribute('id','DropDownReadTitle');
			FactoryTag.innerHTML = 'Factory Value : ' + DropDownOptionsDictionary[ParameterLine[3].toString()];;
			tr.appendChild(FactoryTag);
		}
	}
	document.getElementById('topDefineDescription').appendChild(tr);
	if(Number(writePermissionDict[Number(ParameterLine[0])]) > Number(AccessLevelForUser)){
		DropDown.setAttribute('disabled','disabled');
		DropDown.setAttribute('onclick','');
		try{
			FactorySelectTag.setAttribute('disabled','disabled');
			FactorySelectTag.setAttribute('onclick','');
			
			DefaultSelectTag.setAttribute('disabled','');
			DefaultSelectTag.setAttribute('onclick','');
		}catch(err){
		}
	}
	$('#topDefineDescription').fadeIn();
	while(DropDownOptionsDictionary[counter.toString()] !== undefined){
		Option = document.createElement('option');
		Option.value = counter.toString();
		Option.innerHTML = DropDownOptionsDictionary[counter.toString()];

		if(JSON.stringify(counter) == ParameterLine[3].toString()){
			Option.setAttribute('selected','selected')
		}

		if(typeof FactorySelectTag != 'undefined'){
			FactorySelectTag.appendChild(Option);
		}
		counter++;
	}
}

function DropDownOnChange(ParameterLine){
	if(Number(NumberToFind) >= 37 && Number(NumberToFind) <= 63){
		try{
			document.getElementById('DivAreaMocas').innerHTML = '';
		}catch(err){
		}
		DivArea = document.createElement('div');
		DivArea.setAttribute('id','DivAreaMocas');
		
		TextInput = document.createElement('input');
		TextInput.setAttribute('placeholder',' Why are you updating this parameter?');
		//TextInput.setAttribute('style','margin:10px; padding:7px;');
		
		DivArea.appendChild(TextInput);
		
		Submit = document.createElement('input');
		Submit.setAttribute('type','submit');
		Submit.setAttribute('value','submit this updated parameter');
		DivArea.appendChild(Submit);
		
		document.getElementById('topDefineDescription').appendChild(DivArea);
	}
	
	if(NumberToFind == '2'){
		NewLine = ParameterLine.split(',')[0] + ',' + ParameterLine.split(',')[1] + ',' + ParameterLine.split(',')[2] + ',' + document.getElementById('CurrentDropDownValue').value.replace('/r','') + ',' + ParameterLine.split(',')[4] + ',' + ParameterLine.split(',')[5] + ',' + ParameterLine.split(',')[6] + ',' + ParameterLine.split(',')[7] + ',' + ParameterLine.split(',')[8] + ',' + ParameterLine.split(',')[9] + ',' + ParameterLine.split(',')[10];
	}else{
		NewLine = ParameterLine.split(',')[0] + ',' + document.getElementById('CurrentDropDownValue').value.replace('\r','') + ',' +  ParameterLine.split(',')[2] + ',' + ParameterLine.split(',')[3] + ',' + ParameterLine.split(',')[4] + ',' + ParameterLine.split(',')[5] + ',' + ParameterLine.split(',')[6] + ',' + ParameterLine.split(',')[7] + ',' + ParameterLine.split(',')[8] + ',' + ParameterLine.split(',')[9] + ',' + ParameterLine.split(',')[10];
	}
	
	ChangeTo = document.getElementById('CurrentDropDownValue').options[document.getElementById('CurrentDropDownValue').selectedIndex].innerHTML;
	
	CurrentParameterTitle = document.getElementById('WorkSpaceTitle').innerHTML;
	LogLine = sessionStorage.getItem('loggedinusername') + ' changed ' + CurrentParameterTitle + ' [Current Value] to ' + ChangeTo + '\n';
	CurrentLogs = sessionStorage.getItem('UserMadeChanges');
	sessionStorage.setItem('UserMadeChanges',CurrentLogs + LogLine);
	
	New = sessionStorage.getItem('Parameters').replace(ParameterLine.replace(/\n/g,''),NewLine.replace(/\n/g,''));
	sessionStorage.setItem('Parameters',New);
	ChangesMadePreDownload = true;
	TreeViewClick(document.getElementById(NumberToFind.toString()),NumberToFind.toString());
}

function DefaultDropDownOnChange(ParameterLine){	
	NewLine = ParameterLine.split(',')[0] + ',' + ParameterLine.split(',')[1] + ',' +  document.getElementById('DefaultSelectTag').value.replace('\r','') + ',' + ParameterLine.split(',')[3] + ',' + ParameterLine.split(',')[4] + ',' + ParameterLine.split(',')[5] + ',' + ParameterLine.split(',')[6] + ',' + ParameterLine.split(',')[7] + ',' + ParameterLine.split(',')[8] + ',' + ParameterLine.split(',')[9] + ',' + ParameterLine.split(',')[10];
	
	ChangeTo = document.getElementById('CurrentDropDownValue').options[document.getElementById('DefaultSelectTag').selectedIndex].innerHTML;
	
	CurrentParameterTitle = document.getElementById('WorkSpaceTitle').innerHTML;
	LogLine = sessionStorage.getItem('loggedinusername') + ' changed ' + CurrentParameterTitle + ' [Default Value] to ' + ChangeTo + '\n';
	CurrentLogs = sessionStorage.getItem('UserMadeChanges');
	sessionStorage.setItem('UserMadeChanges',CurrentLogs + LogLine);
	
	
	New = sessionStorage.getItem('Parameters').replace(ParameterLine.replace(/\n/g,''),NewLine.replace(/\n/g,''));
	sessionStorage.setItem('Parameters',New);
	TreeViewClick(document.getElementById(NumberToFind.toString()),NumberToFind.toString());
}

function FactoryDropDownOnChange(ParameterLine){
	NewLine = ParameterLine.split(',')[0] + ',' + ParameterLine.split(',')[1] + ',' +  ParameterLine.split(',')[2] + ',' + document.getElementById('FactorySelectTag').value.replace('\r','') + ',' + ParameterLine.split(',')[4] + ',' + ParameterLine.split(',')[5] + ',' + ParameterLine.split(',')[6] + ',' + ParameterLine.split(',')[7] + ',' + ParameterLine.split(',')[8] + ',' + ParameterLine.split(',')[9] + ',' + ParameterLine.split(',')[10];
	
	
	ChangeTo = document.getElementById('CurrentDropDownValue').options[document.getElementById('FactorySelectTag').selectedIndex].innerHTML;
	
	CurrentParameterTitle = document.getElementById('WorkSpaceTitle').innerHTML;
	LogLine = sessionStorage.getItem('loggedinusername') + ' changed ' + CurrentParameterTitle + ' [Factory Value] to ' + ChangeTo + '\n';
	CurrentLogs = sessionStorage.getItem('UserMadeChanges');
	sessionStorage.setItem('UserMadeChanges',CurrentLogs + LogLine);
	
	
	New = sessionStorage.getItem('Parameters').replace(ParameterLine.replace(/\n/g,''),NewLine.replace(/\n/g,''));
	sessionStorage.setItem('Parameters',New);
	TreeViewClick(document.getElementById(NumberToFind.toString()),NumberToFind.toString());
}