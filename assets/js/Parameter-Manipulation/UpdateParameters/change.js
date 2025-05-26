function parameterchange(LineNumber,ParameterType,OldValue,Line) {
	
	NewLine = null;
	if(ParameterType == "CurrentValue"){
		document.getElementById('WorkSpaceCurrentValue').style.background = 'blue';
		document.getElementById('WorkSpaceCurrentValue').style.color = 'white';
		LogMsgParType = document.getElementById('WorkSpaceCurrentValue').value;
	}
	
	if(ParameterType == "MaxValue"){
		document.getElementById('WorkSpaceMaxValue').style.background = 'blue';
		document.getElementById('WorkSpaceMaxValue').style.color = 'white';
		LogMsgParType = document.getElementById('WorkSpaceMaxValue').value;
	}
	
	if(ParameterType == "MinValue"){
		document.getElementById('WorkSpaceMinValue').style.background = 'blue';
		document.getElementById('WorkSpaceMinValue').style.color = 'white';
		LogMsgParType = document.getElementById('WorkSpaceMinValue').value;
	}

	if(ParameterType == "DefaultValue"){
		document.getElementById('WorkSpaceDefaultValue').style.background = 'blue';
		document.getElementById('WorkSpaceDefaultValue').style.color = 'white';
		LogMsgParType = document.getElementById('WorkSpaceDefaultValue').value;
	}

	if(ParameterType == "FactoryValue"){
		document.getElementById('WorkSpaceFactoryValue').style.background = 'blue';
		document.getElementById('WorkSpaceFactoryValue').style.color = 'white';
		LogMsgParType = document.getElementById('WorkSpaceFactoryValue').value;
	}

	//Start Check if Parameter Needs to be scaled
	if(Line.split(',')[7] !== '1'){
		scaled = true;
	}else{
		scaled = false;
	}

	if(scaled = true){
		LogMsgParType = LogMsgParType * Number(Line.split(',')[7]);
	}
	LogMsg = sessionStorage.getItem('loggedinusername') + ' changed ' + ParameterType + ' from ' + OldValue + ' to ' + LogMsgParType;
	
	UserLogMsg = sessionStorage.getItem('UserMadeChanges');
	sessionStorage.setItem('UserMadeChanges',UserLogMsg + '\n' + LogMsg)

	//End Check if Parameter Needs to be scaled
	CurrentLineSplit = Line.split(',');

	//START CHECK IF ANY VALUE EMPTY
	if(Number(AccessLevelForUser) == 8){
		if(document.getElementById('WorkSpaceCurrentValue').value == ""){
			ErrorMessageDialog('Update Issue',ErrorMessageUpdateIssue);
			document.getElementById('WorkSpaceCurrentValue').value == CurrentLineSplit[1];
			return;
		}

		if(document.getElementById('WorkSpaceMaxValue').value == ""){
			ErrorMessageDialog('Update Issue','Max Value is empty? Setting Back to Previous Value');
			document.getElementById('WorkSpaceMaxValue').value == CurrentLineSplit[5];
			return;
		}

		if(document.getElementById('WorkSpaceMinValue').value == ""){
			ErrorMessageDialog('Update Issue','Min Value is empty? Setting Back to Previous Value');
			document.getElementById('WorkSpaceMinValue').value == CurrentLineSplit[4];
			return;
		}

		if(document.getElementById('WorkSpaceDefaultValue').value == ""){
			ErrorMessageDialog('Update Issue','Default Value is empty? Setting Back to Previous Value');
			document.getElementById('WorkSpaceDefaultValue').value == CurrentLineSplit[2];
			return;
		}

		if(document.getElementById('WorkSpaceFactoryValue').value == ""){
			ErrorMessageDialog('Update Issue','Factory Value is empty? Setting Back to Previous Value');
			document.getElementById('WorkSpaceFactoryValue').value == CurrentLineSplit[3];
			return;
		}
	}else{
		if(document.getElementById('WorkSpaceCurrentValue').value == ""){
			ErrorMessageDialog('Update Issue','Current Value is empty? Setting Back to Previous Value');
			document.getElementById('WorkSpaceCurrentValue').value == CurrentLineSplit[1];
			return;
		}
	}
	//END CHECK IF ANY VALUE EMPTY
	
	//START IF OUT OF SCALE CHECK
	if(ParameterType == "CurrentValue"){
		//Max Value
		if(scaled == true){
			MaxValue = document.getElementById('WorkSpaceCurrentValue').value * CurrentLineSplit[7];
		}else{
			MaxValue = document.getElementById('WorkSpaceCurrentValue').value
		}
	
		if(Number(MaxValue) > Number(CurrentLineSplit[5])){
			//alert(MaxValue);
			//alert(CurrentLineSplit[5]);
			ErrorMessageDialog('Scale Issue','You cannot make your current value larger than your maximum value');
			if(scaled == true){
				document.getElementById('WorkSpaceCurrentValue').value = CurrentLineSplit[1] / CurrentLineSplit[7];
				return;
			}else{
				document.getElementById('WorkSpaceCurrentValue').value = CurrentLineSplit[1];
				return;
			}
		}

		if(Number(MaxValue) < Number(CurrentLineSplit[4])){
			ErrorMessageDialog('Scale Issue','You cannot make your current value smaller than your minimum value');
			if(scaled == true){
				document.getElementById('WorkSpaceCurrentValue').value = CurrentLineSplit[1] / CurrentLineSplit[7];
				return;
			}else{
				document.getElementById('WorkSpaceCurrentValue').value = CurrentLineSplit[1];
				return;
			}
		}
	}

	if(ParameterType == "DefaultValue"){
		if(scaled == true){
			MaxValue = document.getElementById('WorkSpaceDefaultValue').value * CurrentLineSplit[7];
		}else{
			MaxValue = document.getElementById('WorkSpaceDefaultValue').value
		}
		
		if(Number(MaxValue) > Number(CurrentLineSplit[5])){
			ErrorMessageDialog('Scale Issue','You cannot make your Default value larger than your maximum value');
			document.getElementById('WorkSpaceDefaultValue').value = CurrentLineSplit[2];
			return;
		}

		if(Number(MaxValue) < Number(CurrentLineSplit[4])){
			ErrorMessageDialog('Scale Issue','You cannot make your Default value smaller than your minimum value');
			document.getElementById('WorkSpaceDefaultValue').value = CurrentLineSplit[2];
			return;
		}
	}

	if(ParameterType == "FactoryValue"){
		if(scaled == true){
			MaxValue = document.getElementById('WorkSpaceFactoryValue').value * CurrentLineSplit[7];
		}else{
			MaxValue = document.getElementById('WorkSpaceFactoryValue').value
		}
		
		if(Number(MaxValue) > Number(CurrentLineSplit[5])){
			ErrorMessageDialog('Scale Issue','You cannot make your Factory value larger than your maximum value');
			document.getElementById('WorkSpaceFactoryValue').value = CurrentLineSplit[3];
			return;
		}
		
		if(Number(MaxValue) < Number(CurrentLineSplit[4])){
			ErrorMessageDialog('Scale Issue','You cannot make your Factory value larger than your maximum value');
			document.getElementById('WorkSpaceFactoryValue').value = CurrentLineSplit[3];
			return;
		}
	}
	//END IF OUT OF SCALE CHECK

	//START IF NOT NUMBER CHECK
	if(ParameterType == "CurrentValue"){
		if(isNaN(document.getElementById('WorkSpaceCurrentValue').value) == true){
			ErrorMessageDialog('Not Number Value','A non number has been placed in the current value input');
			document.getElementById('WorkSpaceCurrentValue').value = CurrentLineSplit[1];
			return;
		}
	}

	if(ParameterType == "MinValue"){
		if(isNaN(document.getElementById('WorkSpaceMinValue').value) == true){
			ErrorMessageDialog('Not Number Value','A non number has been placed in the min value input');
			document.getElementById('WorkSpaceMinValue').value = CurrentLineSplit[4];
			return;
		}
	}
	
	if(ParameterType == "MaxValue"){
		if(isNaN(document.getElementById('WorkSpaceMaxValue').value) == true){
			ErrorMessageDialog('Not Number Value','A non number has been placed in the max value input');
			document.getElementById('WorkSpaceMaxValue').value = CurrentLineSplit[5];
			return;
		}
	}
	
	if(ParameterType == "DefaultValue"){
		if(isNaN(document.getElementById('WorkSpaceDefaultValue').value) == true){
			ErrorMessageDialog('Not Number Value','A non number has been placed in the Default value input');
			document.getElementById('WorkSpaceDefaultValue').value = CurrentLineSplit[2];
			return;
		}
	}
	
	if(ParameterType == "FactoryValue"){
		if(isNaN(document.getElementById('WorkSpaceFactoryValue').value) == true){
			document.getElementById('WorkSpaceFactoryValue').value = CurrentLineSplit[3];
			return;
		}
	}
	//END IF NOT NUMBER CHECK
	
	//START MAKING NEW LINE
	if(AccessLevelForUser == 8){
		if(ParameterType == 'CurrentValue'){
			if(scaled == true){
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + Number(document.getElementById('WorkSpaceCurrentValue').value) * CurrentLineSplit[7] + ',' + CurrentLineSplit[2] + ',' + CurrentLineSplit[3] + ',' + CurrentLineSplit[4] + ',' + CurrentLineSplit[5] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}else{
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + document.getElementById('WorkSpaceCurrentValue').value + ',' + CurrentLineSplit[2] + ',' + CurrentLineSplit[3] + ',' + CurrentLineSplit[4] + ',' + CurrentLineSplit[5] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}
		}
		
		if(ParameterType == 'MaxValue'){
			if(scaled == true){
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + CurrentLineSplit[1] + ',' + CurrentLineSplit[2] + ',' + CurrentLineSplit[3] + ',' + CurrentLineSplit[4] + ',' + document.getElementById('WorkSpaceMaxValue').value * CurrentLineSplit[7] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}else{
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + CurrentLineSplit[1] + ',' + CurrentLineSplit[2] + ',' + CurrentLineSplit[3] + ',' + CurrentLineSplit[4] + ',' + document.getElementById('WorkSpaceMaxValue').value + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}
		}
		
		if(ParameterType == 'MinValue'){
			if(scaled == true){
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + CurrentLineSplit[1] + ',' + CurrentLineSplit[2] + ',' + CurrentLineSplit[3] + ',' + document.getElementById('WorkSpaceMinValue').value * CurrentLineSplit[7] + ',' + CurrentLineSplit[5] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}else{
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + CurrentLineSplit[1] + ',' + CurrentLineSplit[2] + ',' + CurrentLineSplit[3] + ',' + document.getElementById('WorkSpaceMinValue').value + ',' + CurrentLineSplit[5] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}
		}
		if(ParameterType == 'DefaultValue'){
			if(scaled == true){
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + CurrentLineSplit[1] + ',' + document.getElementById('WorkSpaceDefaultValue').value * CurrentLineSplit[7] + ',' + CurrentLineSplit[3] + ',' + CurrentLineSplit[4] + ',' + CurrentLineSplit[5] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}else{
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + CurrentLineSplit[1] + ',' + document.getElementById('WorkSpaceDefaultValue').value + ',' + CurrentLineSplit[3] + ',' + CurrentLineSplit[4] + ',' + CurrentLineSplit[5] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}
		}
		if(ParameterType == 'FactoryValue'){
			if(scaled == true){
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + CurrentLineSplit[1] + ',' + CurrentLineSplit[2] + ',' + document.getElementById('WorkSpaceFactoryValue').value * CurrentLineSplit[7] + ',' + CurrentLineSplit[4] + ',' + CurrentLineSplit[5] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}else{
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + CurrentLineSplit[1] + ',' + CurrentLineSplit[2] + ',' + document.getElementById('WorkSpaceFactoryValue').value + ',' + CurrentLineSplit[4] + ',' + CurrentLineSplit[5] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}
		}
	}else{
		if(ParameterType == 'CurrentValue'){
			if(scaled == true){
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + Number(document.getElementById('WorkSpaceCurrentValue').value) * CurrentLineSplit[7] + ',' + CurrentLineSplit[2] + ',' + CurrentLineSplit[3] + ',' + CurrentLineSplit[4] + ',' + CurrentLineSplit[5] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}else{
				NewLine = JSON.stringify(CurrentLineSplit[0] + ',' + document.getElementById('WorkSpaceCurrentValue').value + ',' + CurrentLineSplit[2] + ',' + CurrentLineSplit[3] + ',' + CurrentLineSplit[4] + ',' + CurrentLineSplit[5] + ',' + CurrentLineSplit[6] + ',' + CurrentLineSplit[7] + ',' + CurrentLineSplit[8] + ',' + CurrentLineSplit[9] + ',' + CurrentLineSplit[10].replace('\r',''));
			}
		}
	}

	if(ParameterType == 'CurrentValue'){
		document.getElementById('WorkSpaceCurrentValue').setAttribute("onchange",'parameterchange("' + CurrentLineSplit[0] + '",' + '"CurrentValue",' + '"' + CurrentLineSplit[1] + '",'  + NewLine + ')');
	}

	//START UPDATE ONCHANGE VALUES

	document.getElementById('WorkSpaceCurrentValue').setAttribute('onchange','parameterchange("' + NewLine.replace(/"/g,'')[0] + '","CurrentValue","' + NewLine.replace(/"/g,'')[0] + '","' + NewLine.replace(/"/g,'') + '")');

if(AccessLevelForUser == 8){
	document.getElementById('WorkSpaceMaxValue').setAttribute('onchange','parameterchange("' + NewLine.replace(/"/g,'')[0] + '","MaxValue","' + NewLine.replace(/"/g,'')[0] + '","' + NewLine.replace(/"/g,'') + '")');
	document.getElementById('WorkSpaceMinValue').setAttribute('onchange','parameterchange("' + NewLine.replace(/"/g,'')[0] + '","MinValue","' + NewLine.replace(/"/g,'')[0] + '","' + NewLine.replace(/"/g,'') + '")');
	document.getElementById('WorkSpaceDefaultValue').setAttribute('onchange','parameterchange("' + NewLine.replace(/"/g,'')[0] + '","DefaultValue","' + NewLine.replace(/"/g,'')[0] + '","' + NewLine.replace(/"/g,'') + '")');
	document.getElementById('WorkSpaceFactoryValue').setAttribute('onchange','parameterchange("' + NewLine.replace(/"/g,'')[0] + '","FactoryValue","' + NewLine.replace(/"/g,'')[0] + '","' + NewLine.replace(/"/g,'') + '")');

}

	NewParameters = sessionStorage.getItem('Parameters').replace(Line,NewLine.replace(/"/g,''));
	sessionStorage.setItem('Parameters','');
	sessionStorage.setItem('Parameters',NewParameters);

	if(sessionStorage.getItem('Parameters') == NewParameters){
		ChangesMadePreDownload = true;
	}
}