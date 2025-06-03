// Only require chai when running in a Node.js/testing environment
if (typeof module !== 'undefined' && typeof require !== 'undefined') {
    const { expect } = require("chai");
}

/**
 * Clears the workspace UI by removing all content from the main description and table areas.
 */
function ClearWorkSpace() {
	const tableElem = document.getElementById('topDefineTable');
	if (tableElem) tableElem.innerHTML = '';
	const descElem = document.getElementById('topDefineDescription');
	if (descElem) descElem.innerHTML = '';
}

/**
 * Displays UI to add a fixed parameter that is not present in the current file.
 * @param {HTMLElement} htmlObject - The parameter button or element clicked.
 */
function AddFixedParameter(htmlObject) {
	const workSpaceTitle = document.createElement('p');
	workSpaceTitle.id = 'WorkSpaceTitle';
	workSpaceTitle.innerHTML = htmlObject.innerHTML;

	const description = document.createElement('p');
	description.id = 'description';
	if (MainDescriptionsDict[htmlObject.id] !== undefined) {
		description.innerHTML = MainDescriptionsDict[htmlObject.id].replace('#' + htmlObject.id, '');
	}

	const parameterMsg = document.createElement('p');
	parameterMsg.setAttribute('value', 'This Parameter is not present on this file');

	const addParameterButton = document.createElement('input');
	addParameterButton.id = 'AddParameterButton';
	addParameterButton.type = 'submit';
	addParameterButton.value = `Add ${htmlObject.innerHTML} to this file?`;
	addParameterButton.onclick = function () {
		addParameterToClp(htmlObject.id.toString(), htmlObject);
	};

	const descElem = document.getElementById('topDefineDescription');
	descElem.appendChild(workSpaceTitle);
	descElem.appendChild(description);
	descElem.appendChild(parameterMsg);
	descElem.appendChild(addParameterButton);
}

function MenuParametersOnclick(Line, HTMLObject) {
	// alert('start');
	if (Line == 'empty') {
		ClearWorkSpace();
		AddFixedParameter(HTMLObject);
		alert('1');
		return;
	}

	$('#topDefineDescription').fadeIn();
	LineNumber = Line.split(',')[0];

	ClearWorkSpace();
	// alert('2');
	Parameters = sessionStorage.getItem('Parameters').split('\n');
	parcounter = 0;
	while (Parameters[parcounter] != undefined) {
		if (LineNumber == Parameters[parcounter].split(',')[0]) {
			Line = Parameters[parcounter].split(',');
			break;
		}
		parcounter++;
	}
	// alert('3');
	//Description
	descriptionArea = document.createElement('tr');
	DescriptionText = document.createElement('p');
	// console.log(HTMLObject)
	try{
		DescriptionText.innerHTML = MainDescriptionsDict[Number(HTMLObject.id)].replace('#' + HTMLObject.id, '');
	}catch(err){
		DescriptionText.innerHTML = 'No description available';
	}
	DescriptionText.setAttribute('id', 'description');
	descriptionArea.appendChild(DescriptionText);


	//Update Mode
	if (LineNumber == 1) {

		Table = document.getElementById('topDefineDescription');

		TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);


		TR = document.createElement('tr');
		Table.appendChild(TR);
		MoCASLeft_1 = document.createElement('td');
		TR.appendChild(MoCASLeft_1);

		if (Number(sessionStorage.getItem('AccessLevel')) >= 8) {
			CheckLine = Line.toString();

			FormDiv_1 = document.createElement('div');
			FormDiv_1.setAttribute('id', 'MocasDivArea');
			Form_1 = document.createElement('form');
			Form_1.setAttribute('action', 'MoCAS/MoCAS_high.php');
			Form_1.setAttribute('method', 'POST');
			Form_1.setAttribute('name', 'MocasVerifyForm');

			//create elements for the form
			SerialNumberField_1 = document.createElement('input');
			ModelField_1 = document.createElement('input');
			UsernameField_1 = document.createElement('input');
			UseremailField_1 = document.createElement('input');
			AccessLevelField_1 = document.createElement('input');
			IndexField_1 = document.createElement('input');
			ModuleField_1 = document.createElement('input');
			HiLevel_1 = document.createElement('input');
			Dispatch_1 = document.createElement('input');
			TimeWindow_1 = document.createElement('input');
			TextareaField_1 = document.createElement('textarea');
			SubmitButton_1 = document.createElement('input');

			//create element labels for the ones showing in page
			SerialNumberField_label_1 = document.createElement('label');
			UsernameField_label_1 = document.createElement('label');
			TimeWindow_label_1 = document.createElement('label');
			HiLevel_label_1 = document.createElement('label');
			Dispatch_label_1 = document.createElement('label');


			//define the types for each element
			SerialNumberField_1.type = 'text';
			ModelField_1.type = 'text';
			UsernameField_1.type = 'text';
			UseremailField_1.type = 'text';
			AccessLevelField_1.type = 'text';
			IndexField_1.type = 'text';
			ModuleField_1.type = 'text';
			HiLevel_1.type = 'text';
			Dispatch_1.type = 'text';
			TimeWindow_1.type = 'text';
			TextareaField_1.type = 'text';
			SubmitButton_1.type = 'submit';

			//create element names for POST
			SerialNumberField_1.setAttribute('name', 'SerialNumber');
			ModelField_1.setAttribute('name', 'Model');
			UsernameField_1.setAttribute('name', 'Username');
			UseremailField_1.setAttribute('name', 'Useremail');
			AccessLevelField_1.setAttribute('name', 'AccessLevel');
			IndexField_1.setAttribute('name', 'IndexNumber');
			ModuleField_1.setAttribute('name', 'Module');
			HiLevel_1.setAttribute('name', 'HiLevel');
			Dispatch_1.setAttribute('name', 'Dispatch');
			TimeWindow_1.setAttribute('name', 'TimeWindow');
			TextareaField_1.setAttribute('name', 'Comments');


			SerialNumberField_label_1.innerHTML = "<BR>Machine Serial Number<BR>";
			UsernameField_label_1.innerHTML = "<BR>Username<BR>";
			TimeWindow_label_1.innerHTML = "<BR>Update time window in seconds (ksw hourmeter)<BR>";
			HiLevel_label_1.innerHTML = "<BR>Hi Level Request: 0 or 1<BR>";
			Dispatch_label_1.innerHTML = "<BR>Dispatch Status: 0 not done, 1 dispatch done<BR>";


			SerialNumberField_1.setAttribute('value', userParametersFileDict[4].split(',')[3]);
			ModelField_1.setAttribute('value', userParametersFileDict[2].split(',')[3]);
			UsernameField_1.setAttribute('value', sessionStorage.getItem('loggedinusername'));
			UseremailField_1.setAttribute('value', sessionStorage.getItem('loggedinemail'));
			AccessLevelField_1.setAttribute('value', sessionStorage.getItem('AccessLevel'));
			IndexField_1.setAttribute('value', LineNumber);
			ModuleField_1.setAttribute('value', document.getElementById('WorkSpaceTitle').innerHTML);
			HiLevel_1.setAttribute('value', CheckLine.split(',')[1]);
			Dispatch_1.setAttribute('value', CheckLine.split(',')[4]);
			TimeWindow_1.setAttribute('value', CheckLine.split(',')[5]);


			SerialNumberField_1.setAttribute('readonly', 'readonly');
			ModelField_1.setAttribute('readonly', 'readonly');
			UsernameField_1.setAttribute('readonly', 'readonly');
			AccessLevelField_1.setAttribute('readonly', 'readonly');
			IndexField_1.setAttribute('readonly', 'readonly');
			ModuleField_1.setAttribute('readonly', 'readonly');

			UseremailField_1.setAttribute('style', 'display:none;');
			ModelField_1.setAttribute('style', 'display:none;');
			IndexField_1.setAttribute('style', 'display:none;');
			ModuleField_1.setAttribute('style', 'display:none;');
			AccessLevelField_1.setAttribute('style', 'display:none;');

			SerialNumberField_1.setAttribute('id', 'MocasFormSerialInput');
			UsernameField_1.setAttribute('id', 'MocasFormUsernameInput');
			TimeWindow_1.setAttribute('id', 'MocasFormTimeWindowInput');
			HiLevel_1.setAttribute('id', 'MocasFormHiLevelInput');
			Dispatch_1.setAttribute('id', 'MocasFormDispatchInput');
			TextareaField_1.setAttribute('id', 'MocasFormTEXTInput');
			SubmitButton_1.setAttribute('id', 'MocasFormInputSubmit');

			TextareaField_1.setAttribute('placeholder', LanguageDict['Comments']);

			Form_1.appendChild(ModelField_1);
			Form_1.appendChild(IndexField_1);
			Form_1.appendChild(ModuleField_1);
			Form_1.appendChild(SerialNumberField_label_1);
			Form_1.appendChild(SerialNumberField_1);
			Form_1.appendChild(UsernameField_label_1);
			Form_1.appendChild(UsernameField_1);
			Form_1.appendChild(UseremailField_1);
			Form_1.appendChild(AccessLevelField_1);
			Form_1.appendChild(HiLevel_label_1);
			Form_1.appendChild(HiLevel_1);
			Form_1.appendChild(Dispatch_label_1);
			Form_1.appendChild(Dispatch_1);
			Form_1.appendChild(TimeWindow_label_1);
			Form_1.appendChild(TimeWindow_1);
			Form_1.appendChild(TextareaField_1);
			SubmitButton_1.setAttribute('value', LanguageDict['GetActivationCode']);
			Form_1.appendChild(SubmitButton_1);

			FormDiv_1.appendChild(Form_1);
			document.getElementById('topDefineDescription').appendChild(FormDiv_1);
			return;
		}

	}

	//Truck Build Date
	if (LineNumber == 5) {

		Table = document.getElementById('topDefineDescription');

		TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		//Build Date
		TR = document.createElement('tr');
		Table.appendChild(TR);
		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["TruckBuildDate"];
		TR.appendChild(TDLeft);
		TruckBuildDateText = document.createElement('p');
		TruckBuildDateText.setAttribute('id', 'ReadResult');
		date = new Date(Line[3] * 1000);
		if (date.getFullYear() == "1970") {
			TruckBuildDateText.innerHTML = 'NA';
		} else {
			month = Number(date.getMonth()) + 1;
			TruckBuildDateText.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
		}
		TDLeft.appendChild(TruckBuildDateText);

		BottomTR = document.createElement('tr');
		Table.appendChild(BottomTR);
		if (AccessLevelForUser >= 8) {
			DateInput = document.createElement('input');
			DateInput.setAttribute('type', 'date');
			DateInput.setAttribute('id', 'UpdateBuildDate');
			DateInput.setAttribute('style', 'margin:15px;');
			BottomTR.appendChild(DateInput);

			DateSubmit = document.createElement('input');
			DateSubmit.setAttribute('type', 'submit');
			DateSubmit.setAttribute('value', 'Update Truck Build Date');
			DateSubmit.setAttribute('onclick', 'ChangeBuildDate()');
			DateInput.setAttribute('style', 'margin:15px;');
			BottomTR.appendChild(DateSubmit);
		}

		//Dealer Installation Date
		TR = document.createElement('tr');
		Table.appendChild(TR);
		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["TruckDealerDate"];
		TR.appendChild(TDLeft);
		TruckBuildDateText = document.createElement('p');
		TruckBuildDateText.setAttribute('id', 'ReadResult');
		date = new Date(Line[4] * 1000);
		if (date.getFullYear() == "1970") {
			TruckBuildDateText.innerHTML = 'NA';
		} else {
			month = Number(date.getMonth()) + 1;
			TruckBuildDateText.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
		}
		TDLeft.appendChild(TruckBuildDateText);

		BottomTR = document.createElement('tr');
		Table.appendChild(BottomTR);
		if (AccessLevelForUser >= 8) {
			DateInput = document.createElement('input');
			DateInput.setAttribute('type', 'date');
			DateInput.setAttribute('id', 'UpdateDealerDate');
			DateInput.setAttribute('style', 'margin:15px;');
			BottomTR.appendChild(DateInput);

			DateSubmit = document.createElement('input');
			DateSubmit.setAttribute('type', 'submit');
			DateSubmit.setAttribute('value', 'Update Truck Dealer Date');
			DateSubmit.setAttribute('onclick', 'ChangeDealerDate()');
			DateInput.setAttribute('style', 'margin:15px;');
			BottomTR.appendChild(DateSubmit);
		}


		//Customer Installation Date
		TR = document.createElement('tr');
		Table.appendChild(TR);
		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["TruckCustomerDate"];
		TR.appendChild(TDLeft);
		TruckBuildDateText = document.createElement('p');
		TruckBuildDateText.setAttribute('id', 'ReadResult');
		date = new Date(Line[5] * 1000);
		if (date.getFullYear() == "1970") {
			TruckBuildDateText.innerHTML = 'NA';
		} else {
			month = Number(date.getMonth()) + 1;
			TruckBuildDateText.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
		}
		TDLeft.appendChild(TruckBuildDateText);

		BottomTR = document.createElement('tr');
		Table.appendChild(BottomTR);
		if (AccessLevelForUser >= 8) {
			DateInput = document.createElement('input');
			DateInput.setAttribute('type', 'date');
			DateInput.setAttribute('id', 'UpdateCustomerDate');
			DateInput.setAttribute('style', 'margin:15px;');
			BottomTR.appendChild(DateInput);

			DateSubmit = document.createElement('input');
			DateSubmit.setAttribute('type', 'submit');
			DateSubmit.setAttribute('value', 'Update Truck Customer Date');
			DateSubmit.setAttribute('onclick', 'ChangeCustomerDate()');
			DateInput.setAttribute('style', 'margin:15px;');
			BottomTR.appendChild(DateSubmit);
		}

		return;
	}

	//Parameter File Version
	if (LineNumber == 6) {

		Table = document.getElementById('topDefineDescription');

		TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		TR = document.createElement('tr');
		Table.appendChild(TR);


		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["ApiVersion"];
		TR.appendChild(TDLeft);
		ParameterFileVersionText = document.createElement('p');
		ParameterFileVersionText.setAttribute('id', 'ReadResult');
		ParameterFileVersionText.innerHTML = Line[3];
		TR.appendChild(ParameterFileVersionText);
		return;
	}

	//File Cloned Info // File Exported Info
	if (LineNumber == 7 || LineNumber == 8) {

		Table = document.getElementById('topDefineDescription');

		TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		TR = document.createElement('tr');
		Table.appendChild(TR);
		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["Timestamp"];
		TR.appendChild(TDLeft);
		TDRight = document.createElement('p');
		TDRight.setAttribute('id', 'ReadResult');
		date = new Date(Line[1] * 1000);
		if (date.getFullYear() == '1970') {
			TDRight.innerHTML = 'NA';
		} else {
			month = Number(date.getMonth()) + 1;
			TDRight.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
		}
		TR.appendChild(TDRight);

		if (AccessLevelForUser > 6) {

			DefaultTR = document.createElement('tr');
			Table.appendChild(DefaultTR);
			DefaultLeft = document.createElement('p');
			DefaultLeft.setAttribute('id', 'ReadTitle');
			DefaultLeft.innerHTML = LanguageDict["KeyswitchHourmeter"];
			DefaultTR.appendChild(DefaultLeft);
			DefaultRight = document.createElement('p');
			DefaultRight.setAttribute('id', 'ReadResult');
			DefaultRight.innerHTML = String(Line[2] / 3600).split('.')[0] + ' hr';
			DefaultTR.appendChild(DefaultRight);


			FactoryTR = document.createElement('tr');
			Table.appendChild(FactoryTR);
			FactoryLeft = document.createElement('p');
			FactoryLeft.setAttribute('id', 'ReadTitle');
			FactoryLeft.innerHTML = LanguageDict["InterlockHourmeter"];
			FactoryTR.appendChild(FactoryLeft);
			FactoryRight = document.createElement('p');
			FactoryRight.setAttribute('id', 'ReadResult');
			FactoryRight.innerHTML = String(Line[3] / 3600).split('.')[0] + ' hr';
			FactoryTR.appendChild(FactoryRight);


			MinTR = document.createElement('tr');
			Table.appendChild(MinTR);
			MinLeft = document.createElement('p');
			MinLeft.setAttribute('id', 'ReadTitle');
			MinLeft.innerHTML = LanguageDict["TractionHourmeter"];
			MinTR.appendChild(MinLeft);
			MinRight = document.createElement('p');
			MinRight.setAttribute('id', 'ReadResult');
			MinRight.innerHTML = String(Line[4] / 3600).split('.')[0] + ' hr';
			MinTR.appendChild(MinRight);


			MaxTR = document.createElement('tr');
			Table.appendChild(MaxTR);
			MaxLeft = document.createElement('p');
			MaxLeft.setAttribute('id', 'ReadTitle');
			MaxLeft.innerHTML = LanguageDict["HydraulicHourmeter"];
			MaxTR.appendChild(MaxLeft);
			MaxRight = document.createElement('p');
			MaxRight.setAttribute('id', 'ReadResult');
			MaxRight.innerHTML = String(Line[5] / 3600).split('.')[0] + ' hr';
			MaxTR.appendChild(MaxRight);

			if (LineNumber == 7) {
				ActiveUserTr = document.createElement('tr');
				Table.appendChild(ActiveUserTr);
				ActiveuserLeft = document.createElement('p');
				ActiveuserLeft.setAttribute('id', 'ReadTitle');
				ActiveuserLeft.innerHTML = LanguageDict["ActiveUser"];
				ActiveUserTr.appendChild(ActiveuserLeft);

				if (Line[9] == 0) {
					ActiveUserText = 'Generic Operator';
				} else if (Line[9] == 1) {
					ActiveUserText = 'Novice Operator';
				} else if (Line[9] == 2) {
					ActiveUserText = 'Standard Operator';
				} else if (Line[9] == 3) {
					ActiveUserText = 'Experienced Operator';
				} else if (Line[9] == 4) {
					ActiveUserText = 'Service';
				} else if (Line[9] == 5) {
					ActiveUserText = 'Manager';
				} else if (Line[9] == 6) {
					ActiveUserText = 'Dealer';
				} else if (Line[9] == 7) {
					ActiveUserText = 'Combilift';
				} else if (Line[9] == 8) {
					ActiveUserText = 'Developer';
				}

				ActiveUserRight = document.createElement('p');
				ActiveUserRight.setAttribute('id', 'ReadResult');
				ActiveUserRight.innerHTML = ActiveUserText;
				ActiveUserTr.appendChild(ActiveUserRight);
			}
		}

		return;
	}

	//First Service // Standard Service // Full Service
	if (LineNumber == 9 || LineNumber == 10 || LineNumber == 11) {

		Table = document.getElementById('topDefineDescription');

		TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		TR = document.createElement('tr');
		Table.appendChild(TR);
		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["Timestamp"];
		TR.appendChild(TDLeft);
		TDRight = document.createElement('p');
		TDRight.setAttribute('id', 'ReadResult');
		date = new Date(Line[1] * 1000);
		if (date.getFullYear() == '1970') {
			TDRight.innerHTML = 'NA';
		} else {
			month = Number(date.getMonth()) + 1;
			TDRight.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
		}
		TR.appendChild(TDRight);

		if (AccessLevelForUser > 6) {
			DefaultTR = document.createElement('tr');
			Table.appendChild(DefaultTR);
			DefaultLeft = document.createElement('p');
			DefaultLeft.setAttribute('id', 'ReadTitle');
			DefaultLeft.innerHTML = LanguageDict["KeyswitchHourmeter"];
			DefaultTR.appendChild(DefaultLeft);
			DefaultRight = document.createElement('p');
			DefaultRight.setAttribute('id', 'ReadResult');
			DefaultRight.innerHTML = String(Line[2] / 3600).split('.')[0] + ' hr';
			DefaultTR.appendChild(DefaultRight);


			FactoryTR = document.createElement('tr');
			Table.appendChild(FactoryTR);
			FactoryLeft = document.createElement('p');
			FactoryLeft.setAttribute('id', 'ReadTitle');
			FactoryLeft.innerHTML = LanguageDict["InterlockHourmeter"];
			FactoryTR.appendChild(FactoryLeft);
			FactoryRight = document.createElement('p');
			FactoryRight.setAttribute('id', 'ReadResult');
			FactoryRight.setAttribute('id', 'ReadResult');
			FactoryRight.innerHTML = String(Line[3] / 3600).split('.')[0] + ' hr';
			FactoryTR.appendChild(FactoryRight);


			MinTR = document.createElement('tr');
			Table.appendChild(MinTR);
			MinLeft = document.createElement('p');
			MinLeft.setAttribute('id', 'ReadTitle');
			MinLeft.innerHTML = LanguageDict["TractionHourmeter"];
			MinTR.appendChild(MinLeft);
			MinRight = document.createElement('p');
			MinRight.setAttribute('id', 'ReadResult');
			MinRight.innerHTML = String(Line[4] / 3600).split('.')[0] + ' hr';
			MinTR.appendChild(MinRight);


			MaxTR = document.createElement('tr');
			Table.appendChild(MaxTR);
			MaxLeft = document.createElement('p');
			MaxLeft.setAttribute('id', 'ReadTitle');
			MaxLeft.innerHTML = LanguageDict["HydraulicHourmeter"];
			MaxTR.appendChild(MaxLeft);
			MaxRight = document.createElement('p');
			MaxRight.setAttribute('id', 'ReadResult');
			MaxRight.innerHTML = String(Line[5] / 3600).split('.')[0] + ' hr';
			MaxTR.appendChild(MaxRight);
		}
		return;
	}

	//Pump Controller Info // Traction Rear Right (TRR) Controller Info // Traction Rear Left (TRL) Controller Info // Traction Front Right (TFR) Controller Info // Traction Front Left (TFL) Controller Info
	//Steer Rear Right (SRR) Controller Info // Steer Rear Left (SRL) Controller Info  // Steer Front Right (SFR) Controller Info  // Steer Front Left (SFL) Controller Info 
	if (LineNumber == 12 || LineNumber == 13 || LineNumber == 14 || LineNumber == 15 || LineNumber == 16 || LineNumber == 17 || LineNumber == 18 || LineNumber == 19 || LineNumber == 20) {

		Table = document.getElementById('topDefineDescription');

		TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		if (LineNumber == 12 || LineNumber == 13 || LineNumber == 14 || LineNumber == 15 || LineNumber == 16) {
			DefaultTR = document.createElement('tr');
			Table.appendChild(DefaultTR);
			DefaultLeft = document.createElement('p');
			DefaultLeft.setAttribute('id', 'ReadTitle');
			DefaultLeft.innerHTML = LanguageDict["VCLVersion"];
			DefaultTR.appendChild(DefaultLeft);
			DefaultRight = document.createElement('p');
			DefaultRight.setAttribute('id', 'ReadResult');
			DefaultRight.innerHTML = Line[2];
			DefaultRight.setAttribute('id', 'ReadResult');
			DefaultTR.appendChild(DefaultRight);
		}

		MinTR = document.createElement('tr');
		Table.appendChild(MinTR);
		MinLeft = document.createElement('p');
		MinLeft.setAttribute('id', 'ReadTitle');
		MinLeft.innerHTML = LanguageDict["OSVersion"];
		MinTR.appendChild(MinLeft);
		MinRight = document.createElement('p');
		MinRight.setAttribute('id', 'ReadResult');
		MinRight.innerHTML = Line[4];
		MinRight.setAttribute('id', 'ReadResult');
		MinTR.appendChild(MinRight);


		MaxTR = document.createElement('tr');
		Table.appendChild(MaxTR);
		MaxLeft = document.createElement('p');
		MaxLeft.setAttribute('id', 'ReadTitle');
		MaxLeft.innerHTML = LanguageDict["OSBuild"];
		MaxTR.appendChild(MaxLeft);
		MaxRight = document.createElement('p');
		MaxRight.setAttribute('id', 'ReadResult');
		MaxRight.innerHTML = Line[5];
		MaxRight.setAttribute('id', 'ReadResult');
		MaxTR.appendChild(MaxRight);


		UnitsTR = document.createElement('tr');
		Table.appendChild(UnitsTR);
		UnitsLeft = document.createElement('p');
		UnitsLeft.setAttribute('id', 'ReadTitle');
		UnitsLeft.innerHTML = LanguageDict["ModelNumber"];
		UnitsTR.appendChild(UnitsLeft);
		UnitsRight = document.createElement('p');
		UnitsRight.setAttribute('id', 'ReadResult');
		UnitsRight.innerHTML = Line[6];
		UnitsRight.setAttribute('id', 'ReadResult');
		UnitsTR.appendChild(UnitsRight);


		ScaleTR = document.createElement('tr');
		Table.appendChild(ScaleTR);
		ScaleLeft = document.createElement('p');
		ScaleLeft.setAttribute('id', 'ReadTitle');
		if (LineNumber == 12) {
			ScaleLeft.innerHTML = LanguageDict['SerialNumber'];
		} else {
			ScaleLeft.innerHTML = LanguageDict["OSBuild"];
		}
		ScaleTR.appendChild(ScaleLeft);
		ScaleRight = document.createElement('p');
		ScaleRight.setAttribute('id', 'ReadResult');
		ScaleRight.innerHTML = Line[7];
		ScaleRight.setAttribute('id', 'ReadResult');
		ScaleTR.appendChild(ScaleRight);

		TR = document.createElement('tr');
		Table.appendChild(TR);
		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["Timestamp"];
		TR.appendChild(TDLeft);
		TDRight = document.createElement('p');
		TDRight.setAttribute('id', 'ReadResult');
		date = new Date(Line[1] * 1000);
		if (Line[1] == 0) {
			TDRight.innerHTML = 'NA';
		} else {
			month = Number(date.getMonth()) + 1;
			TDRight.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
		}
		TR.appendChild(TDRight);


		return;
	}


	//PLC Info
	if (LineNumber == 21) {

		Table = document.getElementById('topDefineDescription');

		TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		TR = document.createElement('tr');
		Table.appendChild(TR);
		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["AppInfo"];
		TR.appendChild(TDLeft);
		TDRight = document.createElement('p');
		TDRight.setAttribute('id', 'ReadResult');
		TDRight.setAttribute('id', 'ReadResult');
		TDRight.innerHTML = Line[2] + '.' + Line[3] + '.' + Line[4] + '.' + Line[5];
		TR.appendChild(TDRight);


		DefaultTR = document.createElement('tr');
		Table.appendChild(DefaultTR);
		DefaultLeft = document.createElement('p');
		DefaultLeft.setAttribute('id', 'ReadTitle');
		DefaultLeft.innerHTML = LanguageDict["RTSInfo"];
		DefaultTR.appendChild(DefaultLeft);
		DefaultRight = document.createElement('p');
		DefaultRight.setAttribute('id', 'ReadResult');
		DefaultRight.innerHTML = Line[6] + '.' + Line[7] + '.' + Line[8];
		DefaultTR.appendChild(DefaultRight);


		TR = document.createElement('tr');
		Table.appendChild(TR);
		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["Timestamp"];
		TR.appendChild(TDLeft);
		TDRight = document.createElement('p');
		TDRight.setAttribute('id', 'ReadResult');
		date = new Date(Line[1] * 1000);
		if (Line[1] == 0) {
			TDRight.innerHTML = 'NA';
		} else {
			month = Number(date.getMonth()) + 1;
			TDRight.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
		}
		TR.appendChild(TDRight);


		return;
	}


	//Screen Info
	if (LineNumber == 22) {
		Table = document.getElementById('topDefineDescription');

		TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		TR = document.createElement('tr');
		Table.appendChild(TR);
		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["AppInfo"];
		TR.appendChild(TDLeft);
		TDRight = document.createElement('p');
		TDRight.setAttribute('id', 'ReadResult');
		TDRight.setAttribute('id', 'ReadResult');
		TDRight.innerHTML = Line[4] + '.' + Line[5] + '.' + Line[6] + '.' + Line[7];
		TR.appendChild(TDRight);


		TR = document.createElement('tr');
		Table.appendChild(TR);
		TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["Timestamp"];
		TR.appendChild(TDLeft);
		TDRight = document.createElement('p');
		TDRight.setAttribute('id', 'ReadResult');
		date = new Date(Line[1] * 1000);
		if (Line[1] == 0) {
			TDRight.innerHTML = 'NA';
		} else {
			month = Number(date.getMonth()) + 1;
			TDRight.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
		}
		TR.appendChild(TDRight);

		return;
	}



	//Set Hourmeters
	if (LineNumber == 32 || LineNumber == 33 || LineNumber == 34 || LineNumber == 35 || LineNumber == 36) {

		Table = document.getElementById('topDefineDescription');

		TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);


		TR = document.createElement('tr');
		Table.appendChild(TR);
		MoCASLeft_2 = document.createElement('td');
		TR.appendChild(MoCASLeft_2);

		if (Number(sessionStorage.getItem('AccessLevel')) >= 8) {
			CheckLine = Line.toString();

			FormDiv_2 = document.createElement('div');
			FormDiv_2.setAttribute('id', 'MocasDivArea');
			Form_2 = document.createElement('form');
			Form_2.setAttribute('action', 'MoCAS/MoCAS_hourmeter.php');
			Form_2.setAttribute('method', 'POST');
			Form_2.setAttribute('name', 'MocasVerifyForm');

			//create elements for the form
			SerialNumberField_2 = document.createElement('input');
			ModelField_2 = document.createElement('input');
			UsernameField_2 = document.createElement('input');
			UseremailField_2 = document.createElement('input');
			AccessLevelField_2 = document.createElement('input');
			IndexField_2 = document.createElement('input');
			ModuleField_2 = document.createElement('input');
			TimeWindow_2 = document.createElement('input');
			TextareaField_2 = document.createElement('textarea');
			SubmitButton_2 = document.createElement('input');

			Hourmeter_2 = document.createElement('input');

			//create element labels for the ones showing in page
			SerialNumberField_label_2 = document.createElement('label');
			UsernameField_label_2 = document.createElement('label');
			TimeWindow_label_2 = document.createElement('label');
			Hourmeter_label_2 = document.createElement('label');

			//define the types for each element
			SerialNumberField_2.type = 'text';
			ModelField_2.type = 'text';
			UsernameField_2.type = 'text';
			UseremailField_2.type = 'text';
			AccessLevelField_2.type = 'text';
			IndexField_2.type = 'text';
			ModuleField_2.type = 'text';
			TimeWindow_2.type = 'text';
			TextareaField_2.type = 'text';
			SubmitButton_2.type = 'submit';

			Hourmeter_2.type = 'text';


			//create element names for POST
			SerialNumberField_2.setAttribute('name', 'SerialNumber');
			ModelField_2.setAttribute('name', 'Model');
			UsernameField_2.setAttribute('name', 'Username');
			UseremailField_2.setAttribute('name', 'Useremail');
			AccessLevelField_2.setAttribute('name', 'AccessLevel');
			IndexField_2.setAttribute('name', 'IndexNumber');
			ModuleField_2.setAttribute('name', 'Module');
			TimeWindow_2.setAttribute('name', 'TimeWindow');
			TextareaField_2.setAttribute('name', 'Comments');

			Hourmeter_2.setAttribute('name', 'Hourmeter');


			SerialNumberField_label_2.innerHTML = "<BR>Machine Serial Number<BR>";
			UsernameField_label_2.innerHTML = "<BR>Username<BR>";
			TimeWindow_label_2.innerHTML = "<BR>Update time window in seconds (ksw hourmeter)<BR>";
			Hourmeter_label_2.innerHTML = "<BR>New Hourmeter value in seconds<BR>";


			SerialNumberField_2.setAttribute('value', userParametersFileDict[4].split(',')[3]);
			ModelField_2.setAttribute('value', userParametersFileDict[2].split(',')[3]);
			UsernameField_2.setAttribute('value', sessionStorage.getItem('loggedinusername'));
			UseremailField_2.setAttribute('value', sessionStorage.getItem('loggedinemail'));
			AccessLevelField_2.setAttribute('value', sessionStorage.getItem('AccessLevel'));
			IndexField_2.setAttribute('value', LineNumber);
			ModuleField_2.setAttribute('value', document.getElementById('WorkSpaceTitle').innerHTML);
			TimeWindow_2.setAttribute('value', CheckLine.split(',')[5]);

			Hourmeter_2.setAttribute('value', CheckLine.split(',')[2]);


			SerialNumberField_2.setAttribute('readonly', 'readonly');
			ModelField_2.setAttribute('readonly', 'readonly');
			UsernameField_2.setAttribute('readonly', 'readonly');
			AccessLevelField_2.setAttribute('readonly', 'readonly');
			IndexField_2.setAttribute('readonly', 'readonly');
			ModuleField_2.setAttribute('readonly', 'readonly');

			UseremailField_2.setAttribute('style', 'display:none;');
			ModelField_2.setAttribute('style', 'display:none;');
			IndexField_2.setAttribute('style', 'display:none;');
			ModuleField_2.setAttribute('style', 'display:none;');
			AccessLevelField_2.setAttribute('style', 'display:none;');

			SerialNumberField_2.setAttribute('id', 'MocasFormSerialInput');
			UsernameField_2.setAttribute('id', 'MocasFormUsernameInput');
			TimeWindow_2.setAttribute('id', 'MocasFormTimeWindowInput');
			Hourmeter_2.setAttribute('id', 'MocasFormHourmeterInput');
			TextareaField_2.setAttribute('id', 'MocasFormTEXTInput');
			SubmitButton_2.setAttribute('id', 'MocasFormInputSubmit');

			TextareaField_2.setAttribute('placeholder', LanguageDict['Comments']);

			Form_2.appendChild(ModelField_2);
			Form_2.appendChild(IndexField_2);
			Form_2.appendChild(ModuleField_2);
			Form_2.appendChild(SerialNumberField_label_2);
			Form_2.appendChild(SerialNumberField_2);
			Form_2.appendChild(UsernameField_label_2);
			Form_2.appendChild(UsernameField_2);
			Form_2.appendChild(UseremailField_2);
			Form_2.appendChild(AccessLevelField_2);
			Form_2.appendChild(TimeWindow_label_2);
			Form_2.appendChild(TimeWindow_2);
			Form_2.appendChild(Hourmeter_label_2);
			Form_2.appendChild(Hourmeter_2);
			Form_2.appendChild(TextareaField_2);
			SubmitButton_2.setAttribute('value', LanguageDict['GetActivationCode']);
			Form_2.appendChild(SubmitButton_2);

			FormDiv_2.appendChild(Form_2);
			document.getElementById('topDefineDescription').appendChild(FormDiv_2);

			return;

		}

	}



	//MoCAS Values
	if (moCAS.includes(LineNumber)) {
		Table = document.getElementById('topDefineDescription');

		TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		TR = document.createElement('tr');
		Table.appendChild(TR);
		MoCASLeft = document.createElement('td');
		TR.appendChild(MoCASLeft);

		if (Number(userParametersFileDict[Number(LineNumber)].split(',')[2]) == 1 && Number(userParametersFileDict[Number(LineNumber)].split(',')[9]) <= Number(sessionStorage.getItem('AccessLevel'))) {
			try {
				document.getElementById('DropDownDivOption').innerHTML = '';
			}
			catch (err) {
			}
			CheckLine = Line.toString();
			MoCASDropDownDiv = document.createElement('div');
			MoCASDropDownDiv.setAttribute('id', 'DropDownDivOption');

			MoCASDropDown = document.createElement('select');
			MoCASDropDown.setAttribute('id', 'CurrentDropDownValue');
			MoCASDropDown.setAttribute('onchange', 'MocasUpdate(`' + CheckLine + '`)');

			MoCASDropDownOptionOn = document.createElement('option');
			MoCASDropDownOptionOn.innerHTML = LanguageDict['MocasOn'];
			MoCASDropDownOptionOn.value = '1';

			MoCASDropDownOptionOff = document.createElement('option');
			MoCASDropDownOptionOff.innerHTML = LanguageDict['MocasOff'];
			MoCASDropDownOptionOff.value = '0';

			MoCASDropDown.appendChild(MoCASDropDownOptionOn);
			MoCASDropDown.appendChild(MoCASDropDownOptionOff);

			MoCASDropDown.value = CheckLine.split(',')[1];
			//console.log('current value ' + CheckLine.split(',')[1]);

			MoCASDropDownDiv.appendChild(MoCASDropDown);
			document.getElementById('topDefineDescription').appendChild(MoCASDropDownDiv);
			return;
		} else {
			if (Number(userParametersFileDict[Number(LineNumber)].split(',')[2]) == 0 && Number(sessionStorage.getItem('AccessLevel')) >= 8) {

				try {
					document.getElementById('MocasDivArea').innerHTML = '';
				} catch (err) {
				}

				FormDiv = document.createElement('div');
				FormDiv.setAttribute('id', 'MocasDivArea');
				Form = document.createElement('form');
				Form.setAttribute('action', '../src/mocas/MoCAS.php');
				Form.setAttribute('method', 'POST');
				Form.setAttribute('name', 'MocasVerifyForm');


				//create elements for the form
				SerialNumberField = document.createElement('input');
				ModelField = document.createElement('input');
				UsernameField = document.createElement('input');
				UseremailField = document.createElement('input');
				AccessLevelField = document.createElement('input');
				IndexField = document.createElement('input');
				ModuleField = document.createElement('input');
				TextareaField = document.createElement('textarea');
				SubmitButton = document.createElement('input');


				//create element labels for the ones showing in page
				SerialNumberField_label = document.createElement('label');
				UsernameField_label = document.createElement('label');

				//define the types for each element
				SerialNumberField.type = 'text';
				ModelField.type = 'text';
				UsernameField.type = 'text';
				UseremailField.type = 'text';
				AccessLevelField.type = 'text';
				IndexField.type = 'text';
				ModuleField.type = 'text';
				TextareaField.type = 'text';
				SubmitButton.type = 'submit';

				//create element names for POST	
				SerialNumberField.setAttribute('name', 'SerialNumber');
				ModelField.setAttribute('name', 'Model');
				UsernameField.setAttribute('name', 'Username');
				UseremailField.setAttribute('name', 'Useremail');
				AccessLevelField.setAttribute('name', 'AccessLevel');
				IndexField.setAttribute('name', 'IndexNumber');
				ModuleField.setAttribute('name', 'Module');
				TextareaField.setAttribute('name', 'Comments');

				SerialNumberField_label.innerHTML = "<BR>Machine Serial Number<BR>";
				UsernameField_label.innerHTML = "<BR>Username<BR>";

				SerialNumberField.setAttribute('value', userParametersFileDict[4].split(',')[3]);
				ModelField.setAttribute('value', userParametersFileDict[2].split(',')[3]);
				UsernameField.setAttribute('value', sessionStorage.getItem('loggedinusername'));
				UseremailField.setAttribute('value', sessionStorage.getItem('loggedinemail'));
				AccessLevelField.setAttribute('value', sessionStorage.getItem('AccessLevel'));
				IndexField.setAttribute('value', LineNumber);
				ModuleField.setAttribute('value', document.getElementById('WorkSpaceTitle').innerHTML);


				SerialNumberField.setAttribute('readonly', 'readonly');
				ModelField.setAttribute('readonly', 'readonly');
				UsernameField.setAttribute('readonly', 'readonly');
				AccessLevelField.setAttribute('readonly', 'readonly');
				IndexField.setAttribute('readonly', 'readonly');
				ModuleField.setAttribute('readonly', 'readonly');

				UseremailField.setAttribute('style', 'display:none;');
				ModelField.setAttribute('style', 'display:none;');
				IndexField.setAttribute('style', 'display:none;');
				ModuleField.setAttribute('style', 'display:none;');
				AccessLevelField.setAttribute('style', 'display:none;');

				SerialNumberField.setAttribute('id', 'MocasFormSerialInput');
				UsernameField.setAttribute('id', 'MocasFormUsernameInput');
				TextareaField.setAttribute('id', 'MocasFormTEXTInput');
				SubmitButton.setAttribute('id', 'MocasFormInputSubmit');

				TextareaField.setAttribute('placeholder', LanguageDict['Comments']);


				Form.appendChild(ModelField);
				Form.appendChild(IndexField);
				Form.appendChild(ModuleField);
				Form.appendChild(SerialNumberField_label);
				Form.appendChild(SerialNumberField);
				Form.appendChild(UsernameField_label);
				Form.appendChild(UsernameField);
				Form.appendChild(UseremailField);
				Form.appendChild(AccessLevelField);
				Form.appendChild(TextareaField);
				SubmitButton.setAttribute('value', LanguageDict['GetActivationCode']);
				Form.appendChild(SubmitButton);

				FormDiv.appendChild(Form);
				document.getElementById('topDefineDescription').appendChild(FormDiv);

				//Form.submit();

				return;
			} else {

				MoCASRight = document.createElement('P');
				MoCASRight.setAttribute('id', 'MocasReadResult');
				if (Line[2] == 0) {
					MoCASRight.innerHTML = 'Off';
				} else if (Line[2] == 1) {
					MoCASRight.innerHTML = 'On';
				}
				MoCASLeft.appendChild(MoCASRight);
				return;
			}
		}

	}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = { ClearWorkSpace, AddFixedParameter };
}