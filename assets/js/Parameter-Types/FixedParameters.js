import sessionStorageService from "../modules/sessionStorageService.js";
import { moCAS, hydFunctionsInputSetup, passwordList, hydFunctionIdList } from "../main.js";
import { MocasUpdate } from '../Parameter-Manipulation/UpdateParameters/update-parameters.js'
// import { ChangeBuildDate } from "../Parameter-Manipulation/UpdateParameters/change-build-date.js";

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
	workSpaceTitle.innerHTML = htmlObject.innerHTML.replace('-', '') || 'unkown';

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

export function MenuParametersOnclick(Line, HTMLObject) {
	if (Line == 'empty') {
		ClearWorkSpace();
		AddFixedParameter(HTMLObject);
		return;
	}

	$('#topDefineDescription').fadeIn();
	let LineNumber = Line.split(',')[0];

	ClearWorkSpace();
	let Parameters = sessionStorageService.get('Parameters').split('\n');
	let parcounter = 0;
	while (Parameters[parcounter] != undefined) {
		if (LineNumber == Parameters[parcounter].split(',')[0]) {
			Line = Parameters[parcounter].split(',');
			break;
		}
		parcounter++;
	}

	//Description
	let descriptionArea = document.createElement('tr');
	let DescriptionText = document.createElement('p');

	try {
		DescriptionText.innerHTML = MainDescriptionsDict[Number(HTMLObject.id)].replace('#' + HTMLObject.id, '');
	} catch (err) {
		DescriptionText.innerHTML = 'No description available';
	}
	DescriptionText.setAttribute('id', 'description');
	descriptionArea.appendChild(DescriptionText);


	//Update Mode
	if (LineNumber == 1) {

		let Table = document.getElementById('topDefineDescription');

		let TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.innerHTML;
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);


		let TR = document.createElement('tr');
		Table.appendChild(TR);
		MoCASLeft_1 = document.createElement('td');
		TR.appendChild(MoCASLeft_1);

		if (Number(sessionStorageService.get('AccessLevel')) >= 8) {
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

	// Helper: Format a UNIX timestamp as DD/MM/YYYY or 'NA'
	function formatDateField(seconds) {
		const date = new Date(seconds * 1000);
		if (date.getFullYear() === 1970 || seconds === 0) return 'NA';
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	}

	// Helper: Create a Bootstrap form group for a date field
	function createDateField(label, value) {
		const group = document.createElement('div');
		group.className = 'mb-3 row align-items-center';

		const labelElem = document.createElement('label');
		labelElem.className = 'col-sm-4 col-form-label fw-bold';
		labelElem.textContent = label;

		const valueElem = document.createElement('div');
		valueElem.className = 'col-sm-8';
		valueElem.innerHTML = `<span class="form-control-plaintext">${value}</span>`;

		group.appendChild(labelElem);
		group.appendChild(valueElem);
		return group;
	}

	// Helper: Create a Bootstrap form group for updating a date
	function createDateUpdateField(id, label, onClickHandler) {
		const group = document.createElement('div');
		group.className = 'mb-3 row align-items-center';

		const labelElem = document.createElement('label');
		labelElem.className = 'col-sm-4 col-form-label fw-bold';
		labelElem.setAttribute('for', id);
		labelElem.textContent = label;

		const inputDiv = document.createElement('div');
		inputDiv.className = 'col-sm-8 d-flex align-items-center gap-2';

		const input = document.createElement('input');
		input.type = 'date';
		input.className = 'form-control w-auto';
		input.id = id;

		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'btn btn-primary ms-2';
		button.textContent = `Update ${label}`;
		button.onclick = onClickHandler;

		inputDiv.appendChild(input);
		inputDiv.appendChild(button);

		group.appendChild(labelElem);
		group.appendChild(inputDiv);
		return group;
	}

	// Modular section renderer for Truck Build Date
	function renderTruckBuildDateSection(Line, HTMLObject, container) {
		container.innerHTML = '';

		// Title
		const title = document.createElement('h5');
		title.className = 'mb-3';
		title.id = 'WorkSpaceTitle';
		title.textContent = HTMLObject.childNodes[0].innerHTML | "";
		container.appendChild(title);

		// Description (if you have one)
		// const desc = document.createElement('p');
		// desc.className = 'text-muted';
		// desc.id = 'description';
		// desc.textContent = MainDescriptionsDict[HTMLObject.id]?.replace('#' + HTMLObject.id, '') || '';
		// container.appendChild(desc);

		// Dates
		container.appendChild(createDateField(LanguageDict["TruckBuildDate"], formatDateField(Line[3])));
		container.appendChild(createDateField(LanguageDict["TruckDealerDate"], formatDateField(Line[4])));
		container.appendChild(createDateField(LanguageDict["TruckCustomerDate"], formatDateField(Line[5])));

		// If user can update, show update fields
		if (Number(sessionStorageService.get('AccessLevel')) >= 8) {
			container.appendChild(
				createDateUpdateField(
					'UpdateBuildDate',
					LanguageDict["TruckBuildDate"],
					() => ChangeBuildDate()
				)
			);
			container.appendChild(
				createDateUpdateField(
					'UpdateDealerDate',
					LanguageDict["TruckDealerDate"],
					() => ChangeDealerDate()
				)
			);
			container.appendChild(
				createDateUpdateField(
					'UpdateCustomerDate',
					LanguageDict["TruckCustomerDate"],
					() => ChangeCustomerDate()
				)
			);
		}
	}

	// Usage in your MenuParametersOnclick:
	if (LineNumber == 5) {
		const container = document.getElementById('topDefineDescription');
		renderTruckBuildDateSection(Line, HTMLObject, container);
		return;
	}

	//Parameter File Version
	if (LineNumber == 6) {
		const container = document.getElementById('topDefineDescription');
		container.innerHTML = '';

		// Card wrapper
		const card = document.createElement('div');
		card.className = 'card my-3 shadow-sm';

		// Card body
		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';

		// Title
		const title = document.createElement('h5');
		title.className = 'card-title mb-3';
		title.id = 'WorkSpaceTitle';
		title.textContent = HTMLObject.innerHTML;
		cardBody.appendChild(title);

		// Description (if you want to add it)
		// cardBody.appendChild(descriptionArea); // Uncomment if you want to show the description

		// API Version row
		const apiVersionRow = document.createElement('div');
		apiVersionRow.className = 'row mb-2 align-items-center';

		const apiVersionLabel = document.createElement('div');
		apiVersionLabel.className = 'col-6 fw-bold';
		apiVersionLabel.textContent = LanguageDict["ApiVersion"];

		const apiVersionValue = document.createElement('div');
		apiVersionValue.className = 'col-6';
		apiVersionValue.textContent = Line[3];

		apiVersionRow.appendChild(apiVersionLabel);
		apiVersionRow.appendChild(apiVersionValue);
		cardBody.appendChild(apiVersionRow);

		card.appendChild(cardBody);
		container.appendChild(card);
		return;
	}

	//File Cloned Info // File Exported Info
	if (LineNumber == 7 || LineNumber == 8) {

		const container = document.getElementById('topDefineDescription');
		container.innerHTML = '';

		// Card wrapper
		const card = document.createElement('div');
		card.className = 'caFd my-3 shadow-sm';

		// Card body
		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';

		// Title
		const title = document.createElement('h5');
		title.className = 'card-title mb-3';
		title.id = 'WorkSpaceTitle';
		title.textContent = HTMLObject.childNodes[0].innerHTML;
		cardBody.appendChild(title);

		// Timestamp row
		const timestampRow = document.createElement('div');
		timestampRow.className = 'row mb-2 align-items-center';
		const timestampLabel = document.createElement('div');
		timestampLabel.className = 'col-6 fw-bold';
		timestampLabel.textContent = LanguageDict["Timestamp"];
		const date = new Date(Line[1] * 1000);
		const timestampValue = document.createElement('div');
		timestampValue.className = 'col-6';
		timestampValue.textContent = (date.getFullYear() == 1970) ? 'NA' : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
		timestampRow.appendChild(timestampLabel);
		timestampRow.appendChild(timestampValue);
		cardBody.appendChild(timestampRow);

		// Hourmeter rows (if access level > 6)
		if (Number(sessionStorageService.get('AccessLevel')) > 6) {
			// Keyswitch Hourmeter
			const keyswitchRow = document.createElement('div');
			keyswitchRow.className = 'row mb-2 align-items-center';
			const keyswitchLabel = document.createElement('div');
			keyswitchLabel.className = 'col-6 fw-bold';
			keyswitchLabel.textContent = LanguageDict["KeyswitchHourmeter"];
			const keyswitchValue = document.createElement('div');
			keyswitchValue.className = 'col-6';
			keyswitchValue.textContent = `${String(Line[2] / 3600).split('.')[0]} hr`;
			keyswitchRow.appendChild(keyswitchLabel);
			keyswitchRow.appendChild(keyswitchValue);
			cardBody.appendChild(keyswitchRow);

			// Interlock Hourmeter
			const interlockRow = document.createElement('div');
			interlockRow.className = 'row mb-2 align-items-center';
			const interlockLabel = document.createElement('div');
			interlockLabel.className = 'col-6 fw-bold';
			interlockLabel.textContent = LanguageDict["InterlockHourmeter"];
			const interlockValue = document.createElement('div');
			interlockValue.className = 'col-6';
			interlockValue.textContent = `${String(Line[3] / 3600).split('.')[0]} hr`;
			interlockRow.appendChild(interlockLabel);
			interlockRow.appendChild(interlockValue);
			cardBody.appendChild(interlockRow);

			// Traction Hourmeter
			const tractionRow = document.createElement('div');
			tractionRow.className = 'row mb-2 align-items-center';
			const tractionLabel = document.createElement('div');
			tractionLabel.className = 'col-6 fw-bold';
			tractionLabel.textContent = LanguageDict["TractionHourmeter"];
			const tractionValue = document.createElement('div');
			tractionValue.className = 'col-6';
			tractionValue.textContent = `${String(Line[4] / 3600).split('.')[0]} hr`;
			tractionRow.appendChild(tractionLabel);
			tractionRow.appendChild(tractionValue);
			cardBody.appendChild(tractionRow);

			// Hydraulic Hourmeter
			const hydraulicRow = document.createElement('div');
			hydraulicRow.className = 'row mb-2 align-items-center';
			const hydraulicLabel = document.createElement('div');
			hydraulicLabel.className = 'col-6 fw-bold';
			hydraulicLabel.textContent = LanguageDict["HydraulicHourmeter"];
			const hydraulicValue = document.createElement('div');
			hydraulicValue.className = 'col-6';
			hydraulicValue.textContent = `${String(Line[5] / 3600).split('.')[0]} hr`;
			hydraulicRow.appendChild(hydraulicLabel);
			hydraulicRow.appendChild(hydraulicValue);
			cardBody.appendChild(hydraulicRow);

			// Active User (if LineNumber == 7)
			if (LineNumber == 7) {
				const activeUserRow = document.createElement('div');
				activeUserRow.className = 'row mb-2 align-items-center';
				const activeUserLabel = document.createElement('div');
				activeUserLabel.className = 'col-6 fw-bold';
				activeUserLabel.textContent = LanguageDict["ActiveUser"];
				const activeUserValue = document.createElement('div');
				activeUserValue.className = 'col-6';

				let activeUserText = 'unknown';
				switch (Number(Line[9])) {
					case 0: activeUserText = 'Generic Operator'; break;
					case 1: activeUserText = 'Novice Operator'; break;
					case 2: activeUserText = 'Standard Operator'; break;
					case 3: activeUserText = 'Experienced Operator'; break;
					case 4: activeUserText = 'Service'; break;
					case 5: activeUserText = 'Manager'; break;
					case 6: activeUserText = 'Dealer'; break;
					case 7: activeUserText = 'Combilift'; break;
					case 8: activeUserText = 'Developer'; break;
				}
				activeUserValue.textContent = activeUserText;
				activeUserRow.appendChild(activeUserLabel);
				activeUserRow.appendChild(activeUserValue);
				cardBody.appendChild(activeUserRow);
			}
		}

		card.appendChild(cardBody);
		container.appendChild(card);
	}

	//First Service // Standard Service // Full Service
	if (LineNumber == 9 || LineNumber == 10 || LineNumber == 11) {

		const container = document.getElementById('topDefineDescription');
		container.innerHTML = '';

		// Card wrapper
		const card = document.createElement('div');
		card.className = 'card my-3 shadow-sm';

		// Card body
		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';

		// Title
		const title = document.createElement('h5');
		title.className = 'card-title mb-3';
		title.id = 'WorkSpaceTitle';
		title.textContent = HTMLObject.childNodes[0].innerHTML | "";
		cardBody.appendChild(title);

		// Description (if you want to add it)
		// cardBody.appendChild(descriptionArea); // Uncomment if you want to show the description

		// Timestamp row
		const timestampRow = document.createElement('div');
		timestampRow.className = 'row mb-2 align-items-center';
		const timestampLabel = document.createElement('div');
		timestampLabel.className = 'col-6 fw-bold';
		timestampLabel.textContent = LanguageDict["Timestamp"];
		const date = new Date(Line[1] * 1000);
		const timestampValue = document.createElement('div');
		timestampValue.className = 'col-6';
		timestampValue.textContent = (date.getFullYear() == 1970) ? 'NA' : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
		timestampRow.appendChild(timestampLabel);
		timestampRow.appendChild(timestampValue);
		cardBody.appendChild(timestampRow);

		// Hourmeter rows (if access level > 6)
		if (Number(sessionStorageService.get('AccessLevel')) > 6) {
			// Keyswitch Hourmeter
			const keyswitchRow = document.createElement('div');
			keyswitchRow.className = 'row mb-2 align-items-center';
			const keyswitchLabel = document.createElement('div');
			keyswitchLabel.className = 'col-6 fw-bold';
			keyswitchLabel.textContent = LanguageDict["KeyswitchHourmeter"];
			const keyswitchValue = document.createElement('div');
			keyswitchValue.className = 'col-6';
			keyswitchValue.textContent = `${String(Line[2] / 3600).split('.')[0]} hr`;
			keyswitchRow.appendChild(keyswitchLabel);
			keyswitchRow.appendChild(keyswitchValue);
			cardBody.appendChild(keyswitchRow);

			// Interlock Hourmeter
			const interlockRow = document.createElement('div');
			interlockRow.className = 'row mb-2 align-items-center';
			const interlockLabel = document.createElement('div');
			interlockLabel.className = 'col-6 fw-bold';
			interlockLabel.textContent = LanguageDict["InterlockHourmeter"];
			const interlockValue = document.createElement('div');
			interlockValue.className = 'col-6';
			interlockValue.textContent = `${String(Line[3] / 3600).split('.')[0]} hr`;
			interlockRow.appendChild(interlockLabel);
			interlockRow.appendChild(interlockValue);
			cardBody.appendChild(interlockRow);

			// Traction Hourmeter
			const tractionRow = document.createElement('div');
			tractionRow.className = 'row mb-2 align-items-center';
			const tractionLabel = document.createElement('div');
			tractionLabel.className = 'col-6 fw-bold';
			tractionLabel.textContent = LanguageDict["TractionHourmeter"];
			const tractionValue = document.createElement('div');
			tractionValue.className = 'col-6';
			tractionValue.textContent = `${String(Line[4] / 3600).split('.')[0]} hr`;
			tractionRow.appendChild(tractionLabel);
			tractionRow.appendChild(tractionValue);
			cardBody.appendChild(tractionRow);

			// Hydraulic Hourmeter
			const hydraulicRow = document.createElement('div');
			hydraulicRow.className = 'row mb-2 align-items-center';
			const hydraulicLabel = document.createElement('div');
			hydraulicLabel.className = 'col-6 fw-bold';
			hydraulicLabel.textContent = LanguageDict["HydraulicHourmeter"];
			const hydraulicValue = document.createElement('div');
			hydraulicValue.className = 'col-6';
			hydraulicValue.textContent = `${String(Line[5] / 3600).split('.')[0]} hr`;
			hydraulicRow.appendChild(hydraulicLabel);
			hydraulicRow.appendChild(hydraulicValue);
			cardBody.appendChild(hydraulicRow);
		}

		card.appendChild(cardBody);
		container.appendChild(card);
		return;
	}

	//Pump Controller Info // Traction Rear Right (TRR) Controller Info // Traction Rear Left (TRL) Controller Info // Traction Front Right (TFR) Controller Info // Traction Front Left (TFL) Controller Info
	//Steer Rear Right (SRR) Controller Info // Steer Rear Left (SRL) Controller Info  // Steer Front Right (SFR) Controller Info  // Steer Front Left (SFL) Controller Info 
	if (LineNumber == 12 || LineNumber == 13 || LineNumber == 14 || LineNumber == 15 || LineNumber == 16 || LineNumber == 17 || LineNumber == 18 || LineNumber == 19 || LineNumber == 20) {

		const container = document.getElementById('topDefineDescription');
		container.innerHTML = '';

		// Title
		const title = document.createElement('h5');
		title.className = 'mb-3';
		title.id = 'WorkSpaceTitle';
		title.textContent = HTMLObject.childNodes[0].innerHTML | "";
		container.appendChild(title);
		container.appendChild(descriptionArea);

		// Card wrapper
		const card = document.createElement('div');
		card.className = 'card my-3 shadow-sm';
		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';

		// Helper to create a row
		function createInfoRow(label, value) {
			const row = document.createElement('div');
			row.className = 'row mb-2 align-items-center';
			const labelDiv = document.createElement('div');
			labelDiv.className = 'col-6 fw-bold';
			labelDiv.textContent = label;
			const valueDiv = document.createElement('div');
			valueDiv.className = 'col-6';
			valueDiv.textContent = value;
			row.appendChild(labelDiv);
			row.appendChild(valueDiv);
			return row;
		}

		// VCL Version (if applicable)
		if ([12, 13, 14, 15, 16].includes(LineNumber)) {
			cardBody.appendChild(createInfoRow(LanguageDict["VCLVersion"], Line[2]));
		}

		// OS Version
		cardBody.appendChild(createInfoRow(LanguageDict["OSVersion"], Line[4]));

		// OS Build
		cardBody.appendChild(createInfoRow(LanguageDict["OSBuild"], Line[5]));

		// Model Number
		cardBody.appendChild(createInfoRow(LanguageDict["ModelNumber"], Line[6]));

		// Serial Number or OS Build (depending on LineNumber)
		cardBody.appendChild(
			createInfoRow(
				LineNumber == 12 ? LanguageDict['SerialNumber'] : LanguageDict["OSBuild"],
				Line[7]
			)
		);

		// Timestamp
		const date = new Date(Line[1] * 1000);
		const timestamp = (Line[1] == 0)
			? 'NA'
			: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
		cardBody.appendChild(createInfoRow(LanguageDict["Timestamp"], timestamp));

		card.appendChild(cardBody);
		container.appendChild(card);


		return;
	}


	//PLC Info
	if (LineNumber == 21) {

		let Table = document.getElementById('topDefineDescription');

		let TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.childNodes[0].innerHTML | "";
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		let TR = document.createElement('tr');
		Table.appendChild(TR);
		let TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["AppInfo"];
		TR.appendChild(TDLeft);
		let TDRight = document.createElement('p');
		TDRight.setAttribute('id', 'ReadResult');
		TDRight.setAttribute('id', 'ReadResult');
		TDRight.innerHTML = Line[2] + '.' + Line[3] + '.' + Line[4] + '.' + Line[5];
		TR.appendChild(TDRight);


		let DefaultTR = document.createElement('tr');
		Table.appendChild(DefaultTR);
		let DefaultLeft = document.createElement('p');
		DefaultLeft.setAttribute('id', 'ReadTitle');
		DefaultLeft.innerHTML = LanguageDict["RTSInfo"];
		DefaultTR.appendChild(DefaultLeft);
		let DefaultRight = document.createElement('p');
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
		let date = new Date(Line[1] * 1000);
		if (Line[1] == 0) {
			TDRight.innerHTML = 'NA';
		} else {
			let month = Number(date.getMonth()) + 1;
			TDRight.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
		}
		TR.appendChild(TDRight);


		return;
	}


	//Screen Info
	if (LineNumber == 22) {
		let Table = document.getElementById('topDefineDescription');

		let TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.childNodes[0].innerHTML | "";
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		let TR = document.createElement('tr');
		Table.appendChild(TR);
		let TDLeft = document.createElement('p');
		TDLeft.setAttribute('id', 'ReadTitle');
		TDLeft.innerHTML = LanguageDict["AppInfo"];
		TR.appendChild(TDLeft);
		let TDRight = document.createElement('p');
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
		let date = new Date(Line[1] * 1000);
		if (Line[1] == 0) {
			TDRight.innerHTML = 'NA';
		} else {
			let month = Number(date.getMonth()) + 1;
			TDRight.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
		}
		TR.appendChild(TDRight);

		return;
	}


	console.log(LineNumber);
	//Set Hourmeters
	if (LineNumber == 32 || LineNumber == 33 || LineNumber == 34 || LineNumber == 35 || LineNumber == 36) {

		const container = document.getElementById('topDefineDescription');

		// Title
		const title = document.createElement('h5');
		title.className = 'mb-3';
		title.id = 'WorkSpaceTitle';
		title.textContent = 'CAOLAN';//HTMLObject.innerHTML;
		container.appendChild(title);
		container.appendChild(descriptionArea);

		// Bootstrap Card for the form
		const card = document.createElement('div');
		card.className = 'card my-3 shadow-sm';
		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';

		// Form
		const form = document.createElement('form');
		form.setAttribute('action', 'MoCAS/MoCAS_hourmeter.php');
		form.setAttribute('method', 'POST');
		form.setAttribute('name', 'MocasVerifyForm');

		// Helper to create a Bootstrap form group
		function createFormGroup(labelText, inputElem, labelFor) {
			const group = document.createElement('div');
			group.className = 'mb-3 row align-items-center';

			const label = document.createElement('label');
			label.className = 'col-sm-4 col-form-label fw-bold';
			label.textContent = labelText;
			if (labelFor) label.setAttribute('for', labelFor);

			const col = document.createElement('div');
			col.className = 'col-sm-8';
			col.appendChild(inputElem);

			group.appendChild(label);
			group.appendChild(col);
			return group;
		}

		// Create and configure all fields
		const SerialNumberField = document.createElement('input');
		SerialNumberField.type = 'text';
		SerialNumberField.className = 'form-control';
		SerialNumberField.id = 'MocasFormSerialInput';
		SerialNumberField.name = 'SerialNumber';
		SerialNumberField.value = userParametersFileDict[4].split(',')[3];
		SerialNumberField.readOnly = true;

		const ModelField = document.createElement('input');
		ModelField.type = 'hidden';
		ModelField.name = 'Model';
		ModelField.value = userParametersFileDict[2].split(',')[3];

		const UsernameField = document.createElement('input');
		UsernameField.type = 'text';
		UsernameField.className = 'form-control';
		UsernameField.id = 'MocasFormUsernameInput';
		UsernameField.name = 'Username';
		UsernameField.value = sessionStorage.getItem('loggedinusername');
		UsernameField.readOnly = true;

		const UseremailField = document.createElement('input');
		UseremailField.type = 'hidden';
		UseremailField.name = 'Useremail';
		UseremailField.value = sessionStorage.getItem('loggedinemail');

		const AccessLevelField = document.createElement('input');
		AccessLevelField.type = 'hidden';
		AccessLevelField.name = 'AccessLevel';
		AccessLevelField.value = sessionStorage.getItem('AccessLevel');

		const IndexField = document.createElement('input');
		IndexField.type = 'hidden';
		IndexField.name = 'IndexNumber';
		IndexField.value = LineNumber;

		const ModuleField = document.createElement('input');
		ModuleField.type = 'hidden';
		ModuleField.name = 'Module';
		ModuleField.value = document.getElementById('WorkSpaceTitle').innerHTML;

		const TimeWindowField = document.createElement('input');
		TimeWindowField.type = 'text';
		TimeWindowField.className = 'form-control';
		TimeWindowField.id = 'MocasFormTimeWindowInput';
		TimeWindowField.name = 'TimeWindow';
		TimeWindowField.value = CheckLine.split(',')[5];

		const HourmeterField = document.createElement('input');
		HourmeterField.type = 'text';
		HourmeterField.className = 'form-control';
		HourmeterField.id = 'MocasFormHourmeterInput';
		HourmeterField.name = 'Hourmeter';
		HourmeterField.value = CheckLine.split(',')[2];

		const TextareaField = document.createElement('textarea');
		TextareaField.className = 'form-control';
		TextareaField.id = 'MocasFormTEXTInput';
		TextareaField.name = 'Comments';
		TextareaField.placeholder = LanguageDict['Comments'];

		const SubmitButton = document.createElement('input');
		SubmitButton.type = 'submit';
		SubmitButton.className = 'btn btn-primary mt-3';
		SubmitButton.id = 'MocasFormInputSubmit';
		SubmitButton.value = LanguageDict['GetActivationCode'];

		// Add fields to form using Bootstrap groups
		form.appendChild(ModelField);
		form.appendChild(IndexField);
		form.appendChild(ModuleField);
		form.appendChild(UseremailField);
		form.appendChild(AccessLevelField);

		form.appendChild(createFormGroup("Machine Serial Number", SerialNumberField, 'MocasFormSerialInput'));
		form.appendChild(createFormGroup("Username", UsernameField, 'MocasFormUsernameInput'));
		form.appendChild(createFormGroup("Update time window in seconds (ksw hourmeter)", TimeWindowField, 'MocasFormTimeWindowInput'));
		form.appendChild(createFormGroup("New Hourmeter value in seconds", HourmeterField, 'MocasFormHourmeterInput'));
		form.appendChild(createFormGroup(LanguageDict['Comments'], TextareaField, 'MocasFormTEXTInput'));
		form.appendChild(SubmitButton);

		cardBody.appendChild(form);
		card.appendChild(cardBody);
		container.appendChild(card);

	}



	//MoCAS Values
	if (moCAS.includes(LineNumber)) {
		let Table = document.getElementById('topDefineDescription');

		let TH = document.createElement('p');
		TH.setAttribute('id', 'WorkSpaceTitle');
		TH.innerHTML = HTMLObject.childNodes[0].innerHTML || 'not available';
		Table.appendChild(TH);
		document.getElementById('topDefineDescription').appendChild(descriptionArea);

		// let TR = document.createElement('tr');
		// Table.appendChild(TR);
		// let MoCASLeft = document.createElement('td');
		// TR.appendChild(MoCASLeft);

		userParametersFileDict = {};
		const parametersArr = (sessionStorage.getItem('Parameters') || '').split('\n');
		parametersArr.forEach(line => {
			if (line) {
				const parts = line.split(',');
				userParametersFileDict[parts[0]] = line;
			}
		});

		if (Number(userParametersFileDict[Number(LineNumber)].split(',')[2]) == 1 && Number(userParametersFileDict[Number(LineNumber)].split(',')[9]) <= Number(sessionStorage.getItem('AccessLevel'))) {
			try {
				document.getElementById('DropDownDivOption').innerHTML = '';
			}
			catch (err) {
			}
			let CheckLine = Line.toString();

			let MoCASDropDownDiv = document.createElement('div');
			MoCASDropDownDiv.setAttribute('id', 'DropDownDivOption');
			MoCASDropDownDiv.className = 'mb-3'; // Bootstrap margin-bottom

			// Use Bootstrap form-group and label
			let formGroup = document.createElement('div');
			formGroup.className = 'form-group';

			let label = document.createElement('label');
			label.setAttribute('for', 'CurrentDropDownValue');
			label.className = 'form-label fw-bold'; // Bootstrap label
			label.innerHTML = LanguageDict['MoCASStatus'] || 'MoCAS Status';
			formGroup.appendChild(label);

			// Bootstrap select
			let MoCASDropDown = document.createElement('select');
			MoCASDropDown.setAttribute('id', 'CurrentDropDownValue');
			MoCASDropDown.className = 'form-select w-auto d-inline-block'; // Bootstrap select
			MoCASDropDown.addEventListener('change', function () {
				MocasUpdate(CheckLine);
			});

			// Options
			let MoCASDropDownOptionOn = document.createElement('option');
			MoCASDropDownOptionOn.innerHTML = LanguageDict['MocasOn'];
			MoCASDropDownOptionOn.value = '1';

			let MoCASDropDownOptionOff = document.createElement('option');
			MoCASDropDownOptionOff.innerHTML = LanguageDict['MocasOff'];
			MoCASDropDownOptionOff.value = '0';

			MoCASDropDown.appendChild(MoCASDropDownOptionOn);
			MoCASDropDown.appendChild(MoCASDropDownOptionOff);

			MoCASDropDown.value = CheckLine.split(',')[1];

			// Add select to form group
			formGroup.appendChild(MoCASDropDown);

			// Add form group to main div
			MoCASDropDownDiv.appendChild(formGroup);

			// Optionally, wrap in a Bootstrap card for better appearance
			let card = document.createElement('div');
			card.className = 'card my-3';
			let cardBody = document.createElement('div');
			cardBody.className = 'card-body';
			cardBody.appendChild(MoCASDropDownDiv);
			card.appendChild(cardBody);

			document.getElementById('topDefineDescription').appendChild(card);
			return;
		} else {
			if (Number(userParametersFileDict[Number(LineNumber)].split(',')[2]) == 0 && Number(sessionStorage.getItem('AccessLevel')) >= 8) {

				try {
					document.getElementById('MocasDivArea').innerHTML = '';
				} catch (err) {
				}

				let FormDiv = document.createElement('div');
				FormDiv.setAttribute('id', 'MocasDivArea');
				let Form = document.createElement('form');
				Form.setAttribute('action', '../src/mocas/MoCAS.php');
				Form.setAttribute('method', 'POST');
				Form.setAttribute('name', 'MocasVerifyForm');


				//create elements for the form
				let SerialNumberField = document.createElement('input');
				let ModelField = document.createElement('input');
				let UsernameField = document.createElement('input');
				let UseremailField = document.createElement('input');
				let AccessLevelField = document.createElement('input');
				let IndexField = document.createElement('input');
				let ModuleField = document.createElement('input');
				let TextareaField = document.createElement('textarea');
				let SubmitButton = document.createElement('input');


				//create element labels for the ones showing in page
				let SerialNumberField_label = document.createElement('label');
				let UsernameField_label = document.createElement('label');

				//define the types for each element
				SerialNumberField.type = 'text';
				ModelField.type = 'text';
				UsernameField.type = 'text';
				UseremailField.type = 'text';
				AccessLevelField.type = 'text';
				IndexField.type = 'text';
				ModuleField.type = 'text';
				// TextareaField.type = 'text';
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

	let Table = document.getElementById('topDefineDescription');

	let TH = document.createElement('p');
	TH.setAttribute('id', 'WorkSpaceTitle');
	TH.innerHTML = HTMLObject.innerHTML;
	Table.appendChild(TH);
	document.getElementById('topDefineDescription').appendChild(descriptionArea);

	let TR = document.createElement('tr');
	Table.appendChild(TR);
	let TDLeft = document.createElement('p');
	TDLeft.setAttribute('id', 'ReadTitle');
	TDLeft.innerHTML = LanguageDict["AppInfo"];
	TR.appendChild(TDLeft);
	let TDRight = document.createElement('p');
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
	let date = new Date(Line[1] * 1000);
	if (Line[1] == 0) {
		TDRight.innerHTML = 'NA';
	} else {
		let month = Number(date.getMonth()) + 1;
		TDRight.innerHTML = date.getDate() + '/' + month + '/' + date.getFullYear();
	}
	TR.appendChild(TDRight);
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = { ClearWorkSpace, AddFixedParameter, MenuParametersOnclick };
}