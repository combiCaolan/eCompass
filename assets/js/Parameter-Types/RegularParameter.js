function RegularParmeter(value,object){
	/*Start Find and set Units*/
	counter = 0;
	while(sessionStorage.getItem('UnitsDirectory').split('\n')[counter] != undefined){
		if(sessionStorage.getItem('UnitsDirectory').split('\n')[counter].split(',')[1].replace('\r','') == Line[6]){
			UnitForIndex = sessionStorage.getItem('UnitsDirectory').split('\n')[counter].split(',')[0];
			break;
		}else{
			counter++;
		}
	}
	/*End of Fine and set Units*/
	
	/*Start Title*/
	 Title = document.createElement("p");
	Title.innerHTML = value.innerHTML;
	Title.setAttribute('id','WorkSpaceTitle');
	document.getElementById('topDefineDescription').appendChild(Title);
	/*End Title*/
	
	/*Opening Description*/
	descriptionArea = document.createElement('tr');
	DescriptionText = document.createElement('p');
	if(MainDescriptionsDict[object]){
		DescriptionText.innerHTML = MainDescriptionsDict[object].replace('#' + object,'');
	}
	
	DescriptionText.setAttribute('id','description');
	descriptionArea.appendChild(DescriptionText);
	document.getElementById('topDefineDescription').appendChild(descriptionArea);
	/*Closing Description*/


	/*STARTING EXPORT*/
	ExportDiv = document.createElement('div');
	//document.getElementById('topDefineDescription').appendChild(ExportDiv);

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

	/*invalue*/
	 invalueunitlabelValue = document.createElement("label");
	if(UnitForIndex != 'no units'){
		invalueunitlabelValue.innerHTML = '&nbsp&nbsp' + UnitForIndex;
	}
	invalueunitlabelValue.setAttribute('style','float:right;');

	 invalueDiv = document.createElement("div");
	document.getElementById('topDefineDescription').appendChild(invalueDiv);

	 invalueValueDivTABLE = document.createElement("table");
	 invalueValueTR = document.createElement("tr");
	 invalueLabel = document.createElement("label");
	invalueLabel.setAttribute('style','float:left;');
	invalueLabel.innerHTML = LanguageDict["CurrentValue"] + '<br>';
	

	//if(Number(AccessLevelForUser) >= Number(Line[8])){
		invalueDiv.setAttribute('style','margin:10px; padding:15px;');				

		 invalue = document.createElement("input");
		invalue.setAttribute('title','Current Value');
	
		if(Line[7] !== 1){
				invalue.value = Line[1] / Line[7];
				invalue.setAttribute("scale","true");
		}else{
				invalue.value = Line[1];
				invalue.setAttribute("scale","false");
		}
		
		invalue.type = 'number';
		invalue.setAttribute('style','float:left; text-align:right;');
		invalue.setAttribute('id','WorkSpaceCurrentValue');
		invalue.setAttribute('onchange','parameterchange("' + IndexNumber + '","' + 'CurrentValue' + '","' + Line[1] + '","' + IndexNumber + ',' + Line[1] + ',' + Line[2] + ',' + Line[3] + ',' + Line[4] + ',' + Line[5] + ',' + Line[6] + ',' + Line[7] + ',' + Line[8] + ',' + 	Line[9] + ',' + Line[10].replace('\r','') + '");');

		 invalueParInd = document.createElement('p');
		invalueParInd.innerHTML = '&nbsp&nbsp&nbsp';
		invalueParInd.setAttribute('style','float:right;');
		invalueDiv.appendChild(invalueValueDivTABLE);
		invalueValueDivTABLE.appendChild(invalueValueTR);
		invalueValueTR.appendChild(invalueLabel);
		invalueLabel.appendChild(invalueParInd);
		invalueParInd.appendChild(invalue);
		invalueParInd.appendChild(invalueunitlabelValue);

	/*}else{
		invalueDiv.setAttribute('style','margin:10px; padding:15px; background:whitesmoke;');				

		 invalue = document.createElement("label");
		if(Line[7] !== 1){
			invalue.innerHTML = '<br>' + Line[1] / Line[7];
			invalue.setAttribute("scale","true");
		}else{
			invalue.innerHTML = Line[1];
			invalue.setAttribute("scale","false");
		}
		invalue.type = 'number';
		invalue.setAttribute('style','float:left;');

		 invalueParInd = document.createElement('label');
		invalueParInd.innerHTML = '';
		invalueParInd.setAttribute('style','float:left;');
		invalueDiv.appendChild(invalueValueDivTABLE);
		invalueValueDivTABLE.appendChild(invalueValueTR);
		invalueValueTR.appendChild(invalueLabel);
		invalueLabel.appendChild(invalueParInd);
		invalueParInd.appendChild(invalue);
		invalue.appendChild(invalueunitlabelValue);
	}*/
	/*Closing invalue*/	


	/*Max*/
	MaxunitlabelValue = document.createElement("label");
		if(UnitForIndex == 'no units'){
		}else{
			MaxunitlabelValue.innerHTML = '&nbsp&nbsp' + UnitForIndex;
		}
	MaxunitlabelValue.setAttribute('style','float:right;');

	MaxDiv = document.createElement("div");
	document.getElementById('topDefineDescription').appendChild(MaxDiv);

	MaxValueDivTABLE = document.createElement("table");
	MaxValueTR = document.createElement("tr");
	MaxLabel = document.createElement("label");
	MaxLabel.setAttribute('style','float:left;');
	MaxLabel.innerHTML = LanguageDict["MaxValue"] + '<br>';

	if(Number(AccessLevelForUser) >= 8){//Number(Line[8])){
		MaxDiv.setAttribute('style','margin:10px; padding:15px;');				

		 Max = document.createElement("input");
		Max.setAttribute('title','Max Value');
		if(Line[7] !== 1){
			Max.value = Line[5] / Line[7];
			Max.setAttribute("scale","true");
		}else{
			Max.value = Line[5];
			Max.setAttribute("scale","false");
		}
		Max.type = 'number';
		Max.setAttribute('style','float:left; text-align:right;');
		Max.setAttribute('id','WorkSpaceMaxValue');
		Max.setAttribute('onchange','parameterchange("' + IndexNumber + '","' + 'MaxValue' + '","' + Line[1] + '","' + IndexNumber + ',' + Line[1] + ',' + Line[2] + ',' + Line[3] + ',' + Line[4] + ',' + Line[5] + ',' + Line[6] + ',' + Line[7] + ',' + Line[8] + ',' + Line[9] + ',' + Line[10].replace('\r','') + '");');

		 MaxParInd = document.createElement('p');
		MaxParInd.innerHTML = '&nbsp&nbsp&nbsp';
		MaxParInd.setAttribute('style','float:right;');
		MaxDiv.appendChild(MaxValueDivTABLE);
		MaxValueDivTABLE.appendChild(MaxValueTR);
		MaxValueTR.appendChild(MaxLabel);
		MaxLabel.appendChild(MaxParInd);
		MaxParInd.appendChild(Max);
		MaxParInd.appendChild(MaxunitlabelValue);

	}else{
		MaxDiv.setAttribute('style','margin:10px; padding:15px; background:whitesmoke;');				

		 Max = document.createElement("label");
		if(Line[7] !== 1){
			Max.innerHTML = '<br>' + Line[5] / Line[7];
			Max.setAttribute("scale","true");
		}else{
			Max.innerHTML = Line[5];
			Max.setAttribute("scale","false");
		}
		Max.type = 'number';
		Max.setAttribute('style','float:left;');

		 MaxParInd = document.createElement('label');
		MaxParInd.innerHTML = '&nbsp&nbsp&nbsp';
		MaxParInd.setAttribute('style','float:left;');
		MaxDiv.appendChild(MaxValueDivTABLE);
		MaxValueDivTABLE.appendChild(MaxValueTR);
		MaxValueTR.appendChild(MaxLabel);
		MaxLabel.appendChild(MaxParInd);
		MaxParInd.appendChild(Max);
		Max.appendChild(MaxunitlabelValue);
	}
	/*Closing Max*/	


	/*Min*/
	 MinunitlabelValue = document.createElement("label");
	if(UnitForIndex == 'no units'){
	}else{
	MinunitlabelValue.innerHTML = '&nbsp&nbsp' + UnitForIndex;
	}
	MinunitlabelValue.setAttribute('style','float:right;');

	 MinDiv = document.createElement("div");
	document.getElementById('topDefineDescription').appendChild(MinDiv);

	 MinValueDivTABLE = document.createElement("table");
	 MinValueTR = document.createElement("tr");
	 MinLabel = document.createElement("label");
	MinLabel.setAttribute('style','float:left;');
	MinLabel.innerHTML = LanguageDict["MinValue"] + '<br>';

	if(Number(AccessLevelForUser) >= 8){//Number(Line[8])){
	MinDiv.setAttribute('style','margin:10px; padding:15px;');				

	 Min = document.createElement("input");
	Min.setAttribute('title','Min Value');
	if(Line[7] !== 1){
		Min.value = Line[4] / Line[7];
		Min.setAttribute("scale","true");
	}else{
		Min.value = Line[4];
		Min.setAttribute("scale","false");
	}
	Min.type = 'number';
	Min.setAttribute('style','float:left; text-align:right;');
	Min.setAttribute('id','WorkSpaceMinValue');
	Min.setAttribute('onchange','parameterchange("' + IndexNumber + '","' + 'MinValue' + '","' + Line[1] + '","' + IndexNumber + ',' + Line[1] + ',' + Line[2] + ',' + Line[3] + ',' + Line[4] + ',' + Line[5] + ',' + Line[6] + ',' + Line[7] + ',' + Line[8] + ',' + Line[9] + ',' + Line[10].replace('\r','') + '");');

	 MinParInd = document.createElement('p');
	MinParInd.innerHTML = '&nbsp&nbsp&nbsp';
	MinParInd.setAttribute('style','float:right;');
	MinDiv.appendChild(MinValueDivTABLE);
	MinValueDivTABLE.appendChild(MinValueTR);
	MinValueTR.appendChild(MinLabel);
	MinLabel.appendChild(MinParInd);
	MinParInd.appendChild(Min);
	MinParInd.appendChild(MinunitlabelValue);

	}else{
	MinDiv.setAttribute('style','margin:10px; padding:15px; background:whitesmoke;');				

	 Min = document.createElement("label");
	if(Line[7] !== 1){
		Min.innerHTML = '<br>' + Line[4] / Line[7];
		Min.setAttribute("scale","true");
	}else{
		Min.innerHTML = Line[4];
		Min.setAttribute("scale","false");
	}
	Min.type = 'number';
	Min.setAttribute('style','float:left;');

	 MinParInd = document.createElement('label');
	MinParInd.innerHTML = '&nbsp&nbsp&nbsp';
	MinParInd.setAttribute('style','float:left;');
	MinDiv.appendChild(MinValueDivTABLE);
	MinValueDivTABLE.appendChild(MinValueTR);
	MinValueTR.appendChild(MinLabel);
	MinLabel.appendChild(MinParInd);
	MinParInd.appendChild(Min);
	Min.appendChild(MinunitlabelValue);
	}
	/*Closing Min*/	

	/*Default*/
	 DefaultunitlabelValue = document.createElement("label");
	if(UnitForIndex == 'no units'){
	}else{
	DefaultunitlabelValue.innerHTML = '&nbsp&nbsp' + UnitForIndex;
	}
	DefaultunitlabelValue.setAttribute('style','float:right;');

	 DefaultDiv = document.createElement("div");
	document.getElementById('topDefineDescription').appendChild(DefaultDiv);

	 DefaultValueDivTABLE = document.createElement("table");
	 DefaultValueTR = document.createElement("tr");
	 DefaultLabel = document.createElement("label");
	DefaultLabel.setAttribute('style','float:left;');
	DefaultLabel.innerHTML = LanguageDict["DefaultValue"] + '<br>';

	if(Number(AccessLevelForUser) >= 8){
	DefaultDiv.setAttribute('style','margin:10px; padding:15px;');				

	 Default = document.createElement("input");
	Default.setAttribute('title','Default Value');
	if(Line[7] !== 1){
		Default.value = Line[2] / Line[7];
		Default.setAttribute("scale","true");
	}else{
		Default.value = Line[2];
		Default.setAttribute("scale","false");
	}
	Default.type = 'number';
	Default.setAttribute('style','float:left; text-align:right;');
	Default.setAttribute('id','WorkSpaceDefaultValue');
	Default.setAttribute('onchange','parameterchange("' + IndexNumber + '","' + 'DefaultValue' + '","' + Line[1] + '","' + IndexNumber + ',' + Line[1] + ',' + Line[2] + ',' + Line[3] + ',' + Line[4] + ',' + Line[5] + ',' + Line[6] + ',' + Line[7] + ',' + Line[8] + ',' + Line[9] + ',' + Line[10].replace('\r','') + '");');

	 DefaultParInd = document.createElement('p');
	DefaultParInd.innerHTML = '&nbsp&nbsp&nbsp';
	DefaultParInd.setAttribute('style','float:right;');
	DefaultDiv.appendChild(DefaultValueDivTABLE);
	DefaultValueDivTABLE.appendChild(DefaultValueTR);
	DefaultValueTR.appendChild(DefaultLabel);
	DefaultLabel.appendChild(DefaultParInd);
	DefaultParInd.appendChild(Default);
	DefaultParInd.appendChild(DefaultunitlabelValue);

	}else{
	DefaultDiv.setAttribute('style','margin:10px; padding:15px; background:whitesmoke;');				

	 Default = document.createElement("label");
	if(Line[7] !== 1){
		Default.innerHTML = '<br>' + Line[2] / Line[7];
		Default.setAttribute("scale","true");
	}else{
		Default.innerHTML = Line[2];
		Default.setAttribute("scale","false");
	}
	Default.type = 'number';
	Default.setAttribute('style','float:left;');

	 DefaultParInd = document.createElement('label');
	DefaultParInd.innerHTML = '&nbsp&nbsp&nbsp';
	DefaultParInd.setAttribute('style','float:left;');
	DefaultDiv.appendChild(DefaultValueDivTABLE);
	DefaultValueDivTABLE.appendChild(DefaultValueTR);
	DefaultValueTR.appendChild(DefaultLabel);
	DefaultLabel.appendChild(DefaultParInd);
	DefaultParInd.appendChild(Default);
	Default.appendChild(DefaultunitlabelValue);
	}
	/*Closing Default*/	

	/*Factory*/
	 FactoryunitlabelValue = document.createElement("label");
	if(UnitForIndex == 'no units'){
	}else{
	FactoryunitlabelValue.innerHTML = '&nbsp&nbsp' + UnitForIndex;
	}
	FactoryunitlabelValue.setAttribute('style','float:right;');

	 FactoryDiv = document.createElement("div");
	document.getElementById('topDefineDescription').appendChild(FactoryDiv);

	 FactoryValueDivTABLE = document.createElement("table");
	 FactoryValueTR = document.createElement("tr");
	 FactoryLabel = document.createElement("label");
	FactoryLabel.setAttribute('style','float:left;');
	FactoryLabel.innerHTML = LanguageDict["FactoryValue"] + '<br>';

	if(Number(AccessLevelForUser) >= 8){
		FactoryDiv.setAttribute('style','margin:10px; padding:15px;');				

		 Factory = document.createElement("input");
		Default.setAttribute('title','Factory Value');
	if(Line[7] !== 1){
		Factory.value = Line[3] / Line[7];
		Factory.setAttribute("scale","true");
	}else{
		Factory.value = Line[3];
		Factory.setAttribute("scale","false");
	}
	Factory.type = 'number';
	Factory.setAttribute('style','float:left; text-align:right;');
	Factory.setAttribute('id','WorkSpaceFactoryValue');
	Factory.setAttribute('onchange','parameterchange("' + IndexNumber + '","' + 'FactoryValue' + '","' + IndexNumber + '","' + IndexNumber + ',' + Line[1] + ',' + Line[2] + ',' + Line[3] + ',' + Line[4] + ',' + Line[5] + ',' + Line[6] + ',' + Line[7] + ',' + Line[8] + ',' + Line[9] + ',' + Line[10].replace('\r','') + '");');

	 FactoryParInd = document.createElement('p');
	FactoryParInd.innerHTML = '&nbsp&nbsp&nbsp';
	FactoryParInd.setAttribute('style','float:right;');
	FactoryDiv.appendChild(FactoryValueDivTABLE);
	FactoryValueDivTABLE.appendChild(FactoryValueTR);
	FactoryValueTR.appendChild(FactoryLabel);
	FactoryLabel.appendChild(FactoryParInd);
	FactoryParInd.appendChild(Factory);
	FactoryParInd.appendChild(FactoryunitlabelValue);

	}else{
		FactoryDiv.setAttribute('style','margin:10px; padding:15px; background:whitesmoke;');				

		 Factory = document.createElement("label");
		if(Line[7] !== 1){
			Factory.innerHTML = '<br>' + Line[3] / Line[7];
			Factory.setAttribute("scale","true");
		}else{
			Factory.innerHTML = Line[3];
			Factory.setAttribute("scale","false");
		}
		Factory.type = 'number';
		Factory.setAttribute('style','float:left;');

		 FactoryParInd = document.createElement('label');
		FactoryParInd.innerHTML = '&nbsp&nbsp&nbsp';
		FactoryParInd.setAttribute('style','float:left;');
		FactoryDiv.appendChild(FactoryValueDivTABLE);
		FactoryValueDivTABLE.appendChild(FactoryValueTR);
		FactoryValueTR.appendChild(FactoryLabel);
		FactoryLabel.appendChild(FactoryParInd);
		FactoryParInd.appendChild(Factory);
		Factory.appendChild(FactoryunitlabelValue);
	}
	/*Closing Factory*/	
	if(Number(WritePermissionDict[object]) > Number(AccessLevelForUser)){
		try{
			document.getElementById('WorkSpaceCurrentValue').setAttribute('disabled','disabled');
			document.getElementById('WorkSpaceCurrentValue').setAttribute('onclick','');
		}catch(err){
			//console.log('No input available');
		}
	}else{
		//console.log('I could not work it either');
	}
	
	$('#topDefineDescription').fadeIn();
}