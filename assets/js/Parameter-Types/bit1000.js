function ByteMakeup(PassedBits, StartBit, EndBit) {

	bit = PassedBits.split(',');
	bit.reverse();
	counter = 0;
	Bit = [];
	while (bit[counter] != undefined) {
		//console.log(counter + ' ' + StartBit + ' ' + EndBit);
		if (counter >= StartBit && counter <= EndBit) {
			Bit.push(Number(bit[counter]));
		} else {
			Bit.push(0);
		}
		counter++;
	}
	Bit.reverse();
	//console.log('' + Bit);

	BitA = [];
	BitB = [];

	counter = 0;
	while (Bit[counter] != undefined) {
		if (counter <= 7) {
			BitB.push(Bit[counter]);
		} else {
			BitA.push(Bit[counter]);
		}
		counter++;
	}

	var MultiplicationDict = {
		0: 128,
		1: 64,
		2: 32,
		3: 16,
		4: 8,
		5: 4,
		6: 2,
		7: 1,
	}


	//CheckA
	AAddUp = [];
	counter = 0;
	while (BitA[counter] != undefined) {
		if (BitA[counter] == '0') {
			AAddUp.push(0);
		} else {
			AAddUp.push(MultiplicationDict[counter]);
		}
		counter++;
	}

	AddUpCounter = 0;
	counter = 0;
	while (AAddUp[counter] != undefined) {
		AddUpCounter = AAddUp[counter] + AddUpCounter;
		counter++;
	}

	ByteA = AddUpCounter;

	//CheckB
	BAddUp = [];
	counter = 0;
	while (BitB[counter] != undefined) {
		if (BitB[counter] == '0') {
			BAddUp.push(0);
		} else {
			BAddUp.push(MultiplicationDict[counter]);
		}
		counter++;
	}

	AddUpCounter = 0;
	counter = 0;
	while (BAddUp[counter] != undefined) {
		AddUpCounter = BAddUp[counter] + AddUpCounter;
		counter++;
	}

	ByteB = AddUpCounter;

	FinalValueCheck = ByteA + (ByteB * 256);


	//	console.log('Final Value : ' + FinalValueCheck);
	return FinalValueCheck;
}


function BitDropDownChange1000(StartBit, EndBit, BitResult, ParentIndex, BitType, ClickedButton) {

	//console.log('Start ' + StartBit);
	//console.log('End ' + EndBit);

	if (BitType == 'Current') {
		ExistingValue = UserParametersFileDict[Number(ParentIndex)].split(',')[1];
		DropDownValue = document.getElementById('CurrentBitDropValue').value;
	} else if (BitType == 'Default') {
		ExistingValue = UserParametersFileDict[Number(ParentIndex)].split(',')[2];
		DropDownValue = document.getElementById('DefaultBitDropValue').value;
	} else if (BitType == 'Factory') {
		ExistingValue = UserParametersFileDict[Number(ParentIndex)].split(',')[3];
		DropDownValue = document.getElementById('FactoryBitDropValue').value;
	}

	//alert(DropDownValue);
	//alert(ExistingValue);
	counter = StartBit;
	while (counter <= EndBit) {
		ExistingValue = ExistingValue & ~(1 << counter);
		counter++;
		//alert(ExistingValue);
	}

	UpdatedValue = Number(ExistingValue) + Number(DropDownValue);

	//alert(UpdatedValue);

	OldLine = UserParametersFileDict[Number(ParentIndex)].split(',');

	if (BitType == 'Current') {
		NewLine = OldLine[0] + ',' + UpdatedValue + ',' + OldLine[2] + ',' + OldLine[3] + ',' + OldLine[4] + ',' + OldLine[5] + ',' + OldLine[6] + ',' + OldLine[7] + ',' + OldLine[8] + ',' + OldLine[9] + ',' + OldLine[10];
	} else if (BitType == 'Default') {
		NewLine = OldLine[0] + ',' + OldLine[1] + ',' + UpdatedValue + ',' + OldLine[3] + ',' + OldLine[4] + ',' + OldLine[5] + ',' + OldLine[6] + ',' + OldLine[7] + ',' + OldLine[8] + ',' + OldLine[9] + ',' + OldLine[10];
	} else if (BitType == 'Factory') {
		NewLine = NewLine = OldLine[0] + ',' + OldLine[1] + ',' + OldLine[2] + ',' + UpdatedValue + ',' + OldLine[4] + ',' + OldLine[5] + ',' + OldLine[6] + ',' + OldLine[7] + ',' + OldLine[8] + ',' + OldLine[9] + ',' + OldLine[10];
	}

	NewFileRaw = sessionStorage.getItem('Parameters').replace(OldLine, NewLine);
	sessionStorage.setItem('Parameters', NewFileRaw);

	ChangesMadePreDownload = true;
	BitName = document.getElementById('WorkSpaceTitle').innerHTML;
	TreeViewClick(document.getElementById(ParentIndex.toString()), ParentIndex);
	TreeViewClick(document.getElementById(ParentIndex.toString()), ParentIndex);
	BitLabelChecker();

	document.getElementById('constant' + ParentIndex);
	//document.getElementsByName(BitName)[0].onclick();
	document.getElementById('constant' + ParentIndex).childNodes[0].childNodes[Number(ClickedButton - 1)].childNodes[0].click();
}



function BitDropDown1000(ParentParameterIndex, Bit, DropDownIndex, NameOfParentParameter, NameOfParameterBit, BitResults, StartBit, EndBit, BitNumberId, DefaultBitResults, FactoryBitResults) {

	try {
		counter = 0;
		while (document.getElementsByClassName('SelectedThirdSubGroup')[counter] != undefined) {
			document.getElementsByClassName('SelectedThirdSubGroup')[counter].setAttribute('class', 'ThirdSubGroup');
			counter++;
		}
	} catch (err) { }
	//document.getElementsByName(NameOfParameterBit)[0].setAttribute('class','SelectedThirdSubGroup');
	//console.log('constant' + ParentParameterIndex);
	//console.log(BitNumberId);
	WhichNumber = Number(BitNumberId) - 1;
	//console.log(WhichNumber);
	document.getElementById("constant" + ParentParameterIndex).childNodes[0].childNodes[WhichNumber].setAttribute('class', 'SelectedThirdSubGroup');

	OriginalBitResults = BitResults;
	document.getElementById('topDefineDescription').innerHTML = '';
	document.getElementById('topDefineTable').innerHTML = '';

	Title = document.createElement('p');
	Title.setAttribute('id', 'WorkSpaceTitle');
	Title.innerHTML = '- ' + NameOfParameterBit;

	document.getElementById('topDefineTable').appendChild(Title);

	Description = document.createElement('p');
	Description.setAttribute('id', 'description');

	//START Get Bit Description

	//	Description.innerHTML = SpecialDescriptionsDict[Number(ParentParameterIndex + '.' + BitNumberId)];
	Description.innerHTML = SpecialDescriptionsDict[(ParentParameterIndex + '.' + BitNumberId)];


	//Finished Get Bit Description

	document.getElementById('topDefineDescription').appendChild(Description);

	const DropDownFile = sessionStorage.getItem('DropDownlist');

	counter = 0;
	while (DropDownFile.split('\n')[counter] !== undefined) {
		if (DropDownFile.split('\n')[counter][0] == '#') {
			if (DropDownFile.split('\n')[counter].replace('#', '').replace(/\r/g, '') == DropDownIndex) {
				//counter++;
				//console.log(DropDownFile.split('\n')[counter]);
				counter++;
				DropDownLineNum = counter;
				break;
			}
		}
		counter++;
	}

	if (Number(writePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)) {
		DropDown = document.createElement('select');
		DropDown.setAttribute('id', 'CurrentBitDropValue');

		DefaultDropDown = document.createElement('select');
		DefaultDropDown.setAttribute('id', 'DefaultBitDropValue');


		FactoryDropDown = document.createElement('select');
		FactoryDropDown.setAttribute('id', 'FactoryBitDropValue');
	} else {
		DropDown = document.createElement('p');
		DropDown.setAttribute('id', 'ReadResult');

		DefaultDropDown = document.createElement('p');
		DefaultDropDown.setAttribute('id', 'ReadResult');


		FactoryDropDown = document.createElement('p');
		FactoryDropDown.setAttribute('id', 'ReadResult');
	}

	OptionsDict = {};

	while (DropDownFile.split('\n')[DropDownLineNum][0] !== '#') {
		Option = document.createElement('option');
		Option.innerHTML = DropDownFile.split('\n')[DropDownLineNum].split(',')[0];
		Option.value = DropDownFile.split('\n')[DropDownLineNum].split(',')[1];

		DefaultOption = document.createElement('option');
		DefaultOption.innerHTML = DropDownFile.split('\n')[DropDownLineNum].split(',')[0];
		DefaultOption.value = DropDownFile.split('\n')[DropDownLineNum].split(',')[1];

		FactoryOption = document.createElement('option');
		FactoryOption.innerHTML = DropDownFile.split('\n')[DropDownLineNum].split(',')[0];
		FactoryOption.value = DropDownFile.split('\n')[DropDownLineNum].split(',')[1];

		OptionsDict[DropDownFile.split('\n')[DropDownLineNum].split(',')[1]] = DropDownFile.split('\n')[DropDownLineNum].split(',')[0];

		if (Number(writePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)) {
			DropDown.appendChild(Option);
		}
		if (Number(AccessLevelForUser) < 8) {
			DefaultDropDown.setAttribute('disabled', 'disabled');
			FactoryDropDown.setAttribute('disabled', 'disabled');
		}
		DefaultDropDown.appendChild(DefaultOption);
		FactoryDropDown.appendChild(FactoryOption);
		DropDownLineNum++;
	}

	//console.log(OptionsDict);

	CurrentLabel = document.createElement('p');
	DefaultLabel = document.createElement('p');
	FactoryLabel = document.createElement('p');

	DefaultLabelResult = document.createElement('p');
	FactoryLabelResult = document.createElement('p');

	DefaultLabelResult.setAttribute('id', 'ReadResult');
	FactoryLabelResult.setAttribute('id', 'ReadResult');

	DefaultLabelResult.innerHTML = DefaultBitResults;
	FactoryLabelResult.innerHTML = FactoryBitResults;

	CurrentLabel.setAttribute('id', 'ReadResult');
	DefaultLabel.setAttribute('id', 'ReadResult');
	FactoryLabel.setAttribute('id', 'ReadResult');

	CurrentLabel.innerHTML = LanguageDict['CurrentValue'];
	DefaultLabel.innerHTML = LanguageDict['DefaultValue'];
	FactoryLabel.innerHTML = LanguageDict['FactoryValue'];

	document.getElementById('topDefineDescription').appendChild(CurrentLabel);
	if (Number(writePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)) {
		DropDown.value = ByteMakeup(OriginalBitResults, StartBit, EndBit);
		DefaultDropDown.value = ByteMakeup(DefaultBitResults, StartBit, EndBit);
		FactoryDropDown.value = ByteMakeup(FactoryBitResults, StartBit, EndBit);
	} else {
		DropDown.innerHTML = OptionsDict[ByteMakeup(OriginalBitResults, StartBit, EndBit)];
		DefaultDropDown.innerHTML = OptionsDict[ByteMakeup(DefaultBitResults, StartBit, EndBit)];
		FactoryDropDown.innerHTML = OptionsDict[ByteMakeup(FactoryBitResults, StartBit, EndBit)];
	}
	document.getElementById('topDefineDescription').appendChild(DropDown);

	document.getElementById('topDefineDescription').appendChild(DefaultLabel);
	//document.getElementById('topDefineDescription').appendChild(DefaultLabelResult);
	document.getElementById('topDefineDescription').appendChild(DefaultDropDown);

	document.getElementById('topDefineDescription').appendChild(FactoryLabel);
	//document.getElementById('topDefineDescription').appendChild(FactoryLabelResult);
	document.getElementById('topDefineDescription').appendChild(FactoryDropDown);
	if (Number(writePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)) {
		DropDown.setAttribute('onchange', 'BitDropDownChange1000("' + StartBit + '","' + EndBit + '","' + OriginalBitResults + '","' + ParentParameterIndex + '","Current","' + BitNumberId + '")');
		DefaultDropDown.setAttribute('onchange', 'BitDropDownChange1000("' + StartBit + '","' + EndBit + '","' + OriginalBitResults + '","' + ParentParameterIndex + '","Default","' + BitNumberId + '")');
		FactoryDropDown.setAttribute('onchange', 'BitDropDownChange1000("' + StartBit + '","' + EndBit + '","' + OriginalBitResults + '","' + ParentParameterIndex + '","Factory","' + BitNumberId + '")');
	}
}

//1000 Parameter file
function Bit1000DisplayOptionsFunction(Line, ClickedButton) {
	document.getElementById('topDefineDescription').innerHTML = '';
	Index = Line.split(',')[0];

	if (document.getElementById('constant' + Index).innerHTML == '') {
	} else {
		document.getElementById('constant' + Index).innerHTML = '';
		return;
	}


	CurrentValue = Line.split(',')[1];
	DefaultValue = Line.split(',')[2];
	FactoryValue = Line.split(',')[3];

	var octet = CurrentValue;
	var bits = [];
	for (var i = 15; i >= 0; i--) {
		var bit = octet & (1 << i) ? 1 : 0;
		bits.push(bit);
	}

	var octet = DefaultValue;
	var DefaultBits = [];
	for (var i = 15; i >= 0; i--) {
		var bit = octet & (1 << i) ? 1 : 0;
		DefaultBits.push(bit);
	}

	var octet = FactoryValue;
	var FactoryBits = [];
	for (var i = 15; i >= 0; i--) {
		var bit = octet & (1 << i) ? 1 : 0;
		FactoryBits.push(bit);
	}

	bit1000Dir = sessionStorage.getItem('Bit1000').split('\n');

	counter = 0;
	while (bit1000Dir[counter] !== undefined) {
		if (bit1000Dir[counter][0] == '#') {
			//console.log(JSON.stringify(bit1000Dir[counter].replace('#','').replace(/\r/g,'')));
			if (bit1000Dir[counter].replace('#', '').replace(/\r/g, '') == Index) {
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
	Title.setAttribute('id', 'WorkSpaceTitle');
	//document.getElementById('topDefineDescription').appendChild(Title);

	//start Description
	Description = document.createElement('p');
	Description.setAttribute('id', 'description');

	//Find Description of parameter
	ParameterDescription = sessionStorage.getItem('DescriptionMain');

	Description.innerHTML = MainDescriptionsDict[Index];

	unorderedList = document.createElement('ul');
	unorderedList.setAttribute('id', 'Bit1000DropDownDiv');

	//Make Buttons for each option
	ButtonIdCounter = 1;
	// console.log(BitLine);
	try {
		while (bit1000Dir[BitLine][0] !== '#') {
			ListItem = document.createElement('li');
			input = document.createElement('input');
			input.type = 'submit';
			input.setAttribute('id', 'Bitonethousand' + BitLine);
			input.setAttribute('name', bit1000Dir[BitLine].split(',')[3]);
			input.value = bit1000Dir[BitLine].split(',')[3];
			//input.setAttribute('onclick','BitDropDown1000(`' + Line.split(',')[0] + '`,`' + bit1000Dir[BitLine].split(',')[0] + '`,`' + bit1000Dir[BitLine].split(',')[2] + '`,`' + ClickedButton.innerHTML + '`,`' + bit1000Dir[BitLine].split(',')[3] + '`,`' + bits + '`,`' + bit1000Dir[BitLine].split(',')[0] + '`,`' + bit1000Dir[BitLine].split(',')[1] + '`,`' + ButtonIdCounter + '`,`' + DefaultBits + '`,`' + FactoryBits + '`)');

			input.setAttribute('onclick', 'BitDropDown1000(`' + Line.split(',')[0] + '`,`' + bit1000Dir[BitLine].split(',')[0] + '`,`' + bit1000Dir[BitLine].split(',')[2] + '`,`' + ClickedButton.innerHTML + '`,`' + bit1000Dir[BitLine].split(',')[3] + '`,`' + bits + '`,`' + bit1000Dir[BitLine].split(',')[0] + '`,`' + bit1000Dir[BitLine].split(',')[1] + '`,`' + ButtonIdCounter + '`,`' + DefaultBits + '`,`' + FactoryBits + '`)');

			input.setAttribute('class', 'ThirdSubGroup');
			ListItem.appendChild(input);
			unorderedList.appendChild(ListItem);
			ButtonIdCounter++;
			BitLine++;
		}
		document.getElementById('constant' + Index).appendChild(unorderedList);
	} catch (err) { }
	//End Description
	$('#topDefineDescription').fadeIn();
}

