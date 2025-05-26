

//START SWITCHONCHANGE
function Bit999DisplayOptionsFunction(Line,ClickedButton){
	//console.log(Line);
	//console.log(ClickedButton);
	document.getElementById('topDefineDescription').innerHTML = '';

	Index = Line.split(',')[0];
	if(document.getElementById('constant' + Index).innerHTML == ''){
	}else{
		document.getElementById('constant' + Index).innerHTML = '';
		return;	
	}


	CurrentValue = Line.split(',')[1];
	var octet = CurrentValue;
	var bits = [];
	for (var i = 7; i >= 0; i--) {
		var bit = octet & (1 << i) ? 1 : 0;
		bits.push(bit);
	}




	CurrentValue = Line.split(',')[1];
	var octet = CurrentValue;
	var bits = [];
	for (var i = 0; i <= 31; i++) {
		var bit = octet & (1 << i) ? 1 : 0;
		bits.push(bit);
	}

	
	DefaultValue = Line.split(',')[2];
	var octet = DefaultValue;
	var Defaultbits = [];
	for (var i = 0; i <= 31; i++) {
		var bit = octet & (1 << i) ? 1 : 0;
		Defaultbits.push(bit);
	}
	
	FactoryValue = Line.split(',')[3];
	var octet = FactoryValue;
	var Factorybits = [];
	for (var i = 0; i <= 31; i++) {
		var bit = octet & (1 << i) ? 1 : 0;
		Factorybits.push(bit);
	}

	bit999Dir = sessionStorage.getItem('Bit999').split('\n');

	counter = 0;
	while(bit999Dir[counter] !== undefined){
		if(bit999Dir[counter][0] == '#'){
			if(bit999Dir[counter].replace('#','').replace(/\r/g,'') == Index){
				counter++;
				BitLine = counter;
				break;
			}
		}
		counter++;
	}

	//Create the view and each option for the user
	Title = document.createElement('p');
	Title.innerHTML = ClickedButton.innerHTML;
	Title.setAttribute('id','WorkSpaceTitle');
	//document.getElementById('topDefineTable').appendChild(Title);

	//start Description
	Description = document.createElement('p');
	//Description.setAttribute('id','description');

	//Find Description of parameter
	//ParameterDescription = sessionStorage.getItem('DescriptionMain');

	//Read Description Dictionary and set Description to element
	if(MainDescriptionsDict[Index] != undefined){
		//console.log(Index);
		Description.innerHTML = MainDescriptionsDict[Index].replace('#' + Index,'');
	}else{
		Description.innerHTML = "This parameter's description is not present";
	}
	//document.getElementById('topDefineDescription').appendChild(Description);

	/*STARTING EXPORT*/
		ExportDiv = document.createElement('div');
		//document.getElementById('topDefineDescription').appendChild(ExportDiv);
		
		var SwitchParameterLabel = document.createElement("label");
		SwitchParameterLabel.innerHTML = LanguageDict["Export"];
		//ExportDiv.appendChild(SwitchParameterLabel);	
		
		var SwitchParameter = document.createElement("input");
		SwitchParameter.type = 'checkbox';
		
		SwitchParameter.setAttribute("id","Switch Parameter Checkbox");
		
		//console.log(removedParametersCounters.includes(String(Line)));
		if(removedParametersCounters.includes(String(Line)) == false){
			//parameter is not in remove list
			SwitchParameter.setAttribute("checked","");
			document.getElementById('topDefineDescription').setAttribute('style','opacity:1;');
		}else{
			document.getElementById('topDefineDescription').setAttribute('style','opacity:0.4;');
		}	
		
		SwitchParameter.setAttribute("onchange","exportonchange("+Line[0]+",this)"); 
		SwitchParameter.setAttribute("style","text-align:center; font-size:18px;"); 
		//ExportDiv.appendChild(SwitchParameter);
	/*ENDING EXPORT*/
		
	PreTitle = document.createElement('p');
	PreTitle.innerHTML = 'Options for this parameter';
	//document.getElementById('topDefineDescription').appendChild(PreTitle);

	unorderedList = document.createElement('ul');
	unorderedList.setAttribute('id','Bit999DropDownDiv');
	
	//Make Buttons for each option
	BitButtonCounter = 1;
	while(bit999Dir[BitLine][0] != undefined && bit999Dir[BitLine][0] !== '#'){
		ListItem = document.createElement('li');
		input = document.createElement('input');
		input.type = 'submit';
		input.setAttribute('id','Bitnineninenine' + BitButtonCounter);
		input.value = bit999Dir[BitLine].split(',')[2];
		input.setAttribute('class','ThirdSubGroup');
		if(bit999Dir[BitLine]){
			input.setAttribute('name',bit999Dir[BitLine].split(',')[2].replace(/ /g,''));
		}
		input.setAttribute('onclick','BitDropDown999(`' + Line.split(',')[0] + '`,`' + bit999Dir[BitLine].split(',')[0] + '`,`' + bit999Dir[BitLine].split(',')[1] + '`,`' + ClickedButton.innerHTML + '`,`' + bit999Dir[BitLine].split(',')[2].replace(/\n/g,'').replace(/\r/g,'') + '`,`' + bits + '`,`' + Defaultbits + '`,`' + Factorybits + '`,`' + BitButtonCounter + '`)');
		ListItem.appendChild(input);
		unorderedList.appendChild(ListItem);
		BitLine++;
		BitButtonCounter++;
	}

	document.getElementById('constant' + Index).appendChild(unorderedList);

	//End Description
	$('#topDefineDescription').fadeIn();
}


function BitDropDown999(ParentParameterIndex,Bit,DropDownIndex,NameOfParentParameter,NameOfParameterBit,BitResults,DefaultBitResults,FactoryBitResults,BitButtonCounter){
	
	try{
		counter = 0;
		while(document.getElementsByClassName('SelectedThirdSubGroup')[counter] != undefined){
			document.getElementsByClassName('SelectedThirdSubGroup')[counter].setAttribute('class','ThirdSubGroup');
			counter++;
		}
	}catch(err){}
	//document.getElementsByName(NameOfParameterBit.replace(/ /g,''))[0].setAttribute('class','SelectedThirdSubGroup');
	
	WhichNumber = Number(BitButtonCounter) - 1;
	//console.log(WhichNumber);
	document.getElementById("constant" + ParentParameterIndex).childNodes[0].childNodes[WhichNumber].setAttribute('class','SelectedThirdSubGroup');
	

	
	document.getElementById('topDefineDescription').innerHTML = '';	
	document.getElementById('topDefineTable').innerHTML = '';	
	
	Title = document.createElement('p');
	Title.setAttribute('id','WorkSpaceTitle');
	Title.innerHTML = NameOfParameterBit;
	
	document.getElementById('topDefineTable').appendChild(Title);
	
	
	Description = document.createElement('p');
	Description.setAttribute('id','description');
	
	Description.innerHTML = SpecialDescriptionsDict[Number(ParentParameterIndex + '.' + BitButtonCounter)];
	
	document.getElementById('topDefineDescription').appendChild(Description);
	
	DropDownFile = sessionStorage.getItem('DropDownlist');
	DropDownLineNum ='';
	counter = 0;
	while(DropDownFile.split('\n')[counter] !== undefined){
		if(DropDownFile.split('\n')[counter][0] == '#'){
			if(DropDownFile.split('\n')[counter].replace('#','').replace(/\r/g,'') == DropDownIndex){
				counter++;
				DropDownLineNum = counter;
				break;
			}
		}
		counter++;
	}
	
	if(DropDownLineNum == ''){
		console.log('ERR * line The DropDown parameters file does not have this index referenced: ' + DropDownIndex);
		return;
	}
	
	CurrentValueLabel = document.createElement('p');
	CurrentValueLabel.setAttribute('id','ReadResult');
	CurrentValueLabel.innerHTML = LanguageDict["CurrentValue"];
	document.getElementById('topDefineDescription').appendChild(CurrentValueLabel);
	
	DefaultValueLabel = document.createElement('p');
	DefaultValueLabel.setAttribute('id','ReadResult');
	DefaultValueLabel.innerHTML = LanguageDict["DefaultValue"];
	
	FactoryValueLabel = document.createElement('p');
	FactoryValueLabel.setAttribute('id','ReadResult');
	FactoryValueLabel.innerHTML = LanguageDict["FactoryValue"];
	//document.getElementById('topDefineDescription').appendChild(FactoryValueLabel);
	
	
	OptionsDict = {};
	
	if(Number(WritePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)){
		DropDown = document.createElement('select');
		DefaultValue = document.createElement('select');
		FactoryValue = document.createElement('select');
		DropDown.setAttribute('id','CurrentBitDropValue');
		DefaultValue.setAttribute('id','DefaultBitDropValue');
		FactoryValue.setAttribute('id','FactoryBitDropValue');
	}else{
		DropDown = document.createElement('p');
		DefaultValue = document.createElement('p');
		FactoryValue = document.createElement('p');
		DropDown.setAttribute('id','ReadResult');
		DefaultValue.setAttribute('id','ReadResult');
		FactoryValue.setAttribute('id','ReadResult');
	}

	while(DropDownFile.split('\n')[DropDownLineNum][0] !== '#'){
		CurrentOption = document.createElement('option');
		CurrentOption.innerHTML = DropDownFile.split('\n')[DropDownLineNum].split(',')[0];
		CurrentOption.value = DropDownFile.split('\n')[DropDownLineNum].split(',')[1];
		
		DefaultOption = document.createElement('option');
		DefaultOption.innerHTML = DropDownFile.split('\n')[DropDownLineNum].split(',')[0];
		DefaultOption.value = DropDownFile.split('\n')[DropDownLineNum].split(',')[1];
		
		FactoryOption = document.createElement('option');
		FactoryOption.innerHTML = DropDownFile.split('\n')[DropDownLineNum].split(',')[0];
		FactoryOption.value = DropDownFile.split('\n')[DropDownLineNum].split(',')[1];
		
		
		OptionsDict[DropDownFile.split('\n')[DropDownLineNum].split(',')[1]] = DropDownFile.split('\n')[DropDownLineNum].split(',')[0];
		if(Number(WritePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)){
			DropDown.appendChild(CurrentOption);
			DefaultValue.appendChild(DefaultOption);
			FactoryValue.appendChild(FactoryOption);
			if(Number(AccessLevelForUser) < 8){
				DefaultValue.setAttribute('disabled','disabled');
				FactoryValue.setAttribute('disabled','disabled');
			}
		}
		DropDownLineNum++;
	}
	
	DefaultValue.setAttribute('style','margin:10px;');
	FactoryValue.setAttribute('style','margin:10px;');
	
	if(Number(WritePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)){
		DropDown.value = BitResults.split(',')[Bit];
		DefaultValue.value = DefaultBitResults.split(',')[Bit];
		FactoryValue.value = FactoryBitResults.split(',')[Bit];
	}else{
		DropDown.innerHTML = OptionsDict[BitResults.split(',')[Bit]];
		DefaultValue.innerHTML = OptionsDict[DefaultBitResults.split(',')[Bit]];
		FactoryValue.innerHTML = OptionsDict[FactoryBitResults.split(',')[Bit]];
	}
	
//	console.log(OptionsDict);
//	console.log(OptionsDict[0]);
	
	DefaultLabel = document.createElement('p');
	DefaultLabel.innerHTML = 'Bits For Each Column : ' + BitResults + ' | ' + DefaultBitResults + ' | ' + FactoryBitResults;
	//document.getElementById('topDefineDescription').appendChild(DefaultLabel);
	
	document.getElementById('topDefineDescription').appendChild(DropDown);
	
	document.getElementById('topDefineDescription').appendChild(DefaultValueLabel);
	document.getElementById('topDefineDescription').appendChild(DefaultValue);
	
	document.getElementById('topDefineDescription').appendChild(FactoryValueLabel);
	document.getElementById('topDefineDescription').appendChild(FactoryValue);
	if(Number(WritePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)){
		DropDown.setAttribute('onchange',`BitDropDownChange999("` + BitResults + `","` + Bit + `","` + ParentParameterIndex + `","Current")`);
		DefaultValue.setAttribute('onchange',`BitDropDownChange999("` + DefaultBitResults + `","` + Bit + `","` + ParentParameterIndex + `","Default")`);
		FactoryValue.setAttribute('onchange',`BitDropDownChange999("` + FactoryBitResults + `","` + Bit + `","` + ParentParameterIndex + `","Factory")`);
	}

}

function BitDropDownChange999(BitResults,Bit,LineNumber,UpdateType){
	CurrentBits = BitResults.split(',');
	
	if(UpdateType == 'Current'){
		DesiredBit = document.getElementById('CurrentBitDropValue').value;
	}
	
	if(UpdateType == 'Default'){
		DesiredBit = document.getElementById('DefaultBitDropValue').value;
	}
	
	if(UpdateType == 'Factory'){
		DesiredBit = document.getElementById('FactoryBitDropValue').value;
	}
	
	counter = 0;
	NewBit = [];
	while(CurrentBits[counter] != undefined){
		if(counter == Bit){
			NewBit.push(DesiredBit);
		}else{
			NewBit.push(CurrentBits[counter]);
		}
		counter++;
	}
	
	ChangedBits = NewBit.toString();
	
//	First = NewBit[0] * 128;
//	Second = NewBit[1] * 64;
//	Third = NewBit[2] * 32;
//	Fourth = NewBit[3] * 16;
//	Fifth = NewBit[4] * 8;
//	Sixth = NewBit[5] * 4;
//	Seventh = NewBit[6] * 2;
//	Eighth = NewBit[7] * 1;
	
//	FinalCurrentValue = First + Second + Third + Fourth + Fifth + Sixth + Seventh + Eighth;
	
	FinalCurrentValue = 0;
	for (var i = 0; i <=31; i++){
	FinalCurrentValue = FinalCurrentValue + Number(NewBit[i])*Math.pow(2, i)}
	
	
	
	
	//alert(FinalCurrentValue);
	
	counter = 0;
	while(sessionStorage.getItem('Parameters').split('\n')[counter] !== undefined){
		if(sessionStorage.getItem('Parameters').split('\n')[counter].split(',')[0] == LineNumber){
			LineToChange = sessionStorage.getItem('Parameters').split('\n')[counter].split(',');
			//alert(LineToChange);
			if(UpdateType == 'Current'){
				NewLine = LineToChange[0] + ',' + FinalCurrentValue + ',' + LineToChange[2] + ',' + LineToChange[3] + ',' + LineToChange[4] + ',' + LineToChange[5] + ',' + LineToChange[6] + ',' + LineToChange[7] + ',' + LineToChange[8] + ',' + LineToChange[9] + ',' + LineToChange[10];
			}
			
			if(UpdateType == 'Default'){
				NewLine = LineToChange[0] + ',' + LineToChange[1] + ',' + FinalCurrentValue + ',' + LineToChange[3] + ',' + LineToChange[4] + ',' + LineToChange[5] + ',' + LineToChange[6] + ',' + LineToChange[7] + ',' + LineToChange[8] + ',' + LineToChange[9] + ',' + LineToChange[10];
			}
			
			if(UpdateType == 'Factory'){
				NewLine = LineToChange[0] + ',' + LineToChange[1] + ',' + LineToChange[2] + ',' + FinalCurrentValue + ',' + LineToChange[4] + ',' + LineToChange[5] + ',' + LineToChange[6] + ',' + LineToChange[7] + ',' + LineToChange[8] + ',' + LineToChange[9] + ',' + LineToChange[10];
			} 
			//alert(NewLine);
			NewParameters = sessionStorage.getItem('Parameters').replace(sessionStorage.getItem('Parameters').split('\n')[counter],NewLine);
			sessionStorage.setItem('Parameters', NewParameters);			
			break;	
		}
		counter++;
	}
	
	ChangesMadePreDownload = true;
	
	//Get name attribute of button in users menu
	BitParameterName = document.getElementById('WorkSpaceTitle').innerHTML.replace(/ /g,'');
	TreeViewClick(document.getElementById(LineNumber.toString()),LineNumber);
	TreeViewClick(document.getElementById(LineNumber.toString()),LineNumber);
	//get's the button in the users menu using the name attribute - and clicks it
	document.getElementsByName(BitParameterName)[0].onclick();
}
