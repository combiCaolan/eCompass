function AddParameter(LineNumber){
	alert(LineNumber);
	GeneralDefaultPath = String('http://167.71.128.196/API-Comparison/GeneralDefault.clp');
	//Opening Truck Directory for finding Truck Model
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", GeneralDefaultPath, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				var results = rawFile.responseText;
			if(results==''){
				ErrorMessage('Alert','That file is empty? Please choose another');
			}else{
				GeneralDefault = results;
			}
			}
		}
	}
	rawFile.send(null);
	
	counter = 0;
	while(GeneralDefault.split('\n')[counter] !== "undefined"){
		if(GeneralDefault.split('\n')[counter] == ""){
			ErrorMessage('Parameter Error','This Parameter can not be added');
			return;
		}
		
		if(GeneralDefault.split('\n')[counter].split(',')[0] == LineNumber){
			LineToAdd = GeneralDefault.split('\n')[counter];
			break;
		}
		counter++;
	}
	
	//add from here on 
	IndexNumber = LineToAdd.split(',')[0];
	counter = 0;
	while(sessionStorage.getItem('Parameters').split('\n')[counter] !== "undefined"){
		if(Number(sessionStorage.getItem('Parameters').split('\n')[counter].split(',')[0]) < IndexNumber){
			counter++
		}else{
			break;
		}
	}
	LineToEdit = sessionStorage.getItem('Parameters').split('\n')[counter - 1];
	NewParameterLocalStorage = sessionStorage.getItem('Parameters').replace(String(LineToEdit),String(LineToEdit) + '\n' + LineToAdd);
	sessionStorage.setItem('Parameters',NewParameterLocalStorage);
	
	//console.log(ParametersPresent);
	//Start ParametersPresent
	//This Function logs all the index from every parameter on this file - this is used with the integrity check - adding and removing parameters
	ParCounter = 0;
	var NewParametersPresent = [];
	Parameters = sessionStorage.getItem('Parameters').split('\n');
	while(Parameters[ParCounter] !== undefined){
		ParametersPresent.push(Parameters[ParCounter].split(',')[0]);
		ParCounter++;
	}
	//End ParametersPresent
	//Call Display Function
	//TreeViewClick(document.getElementById(LineNumber),LineNumber);
}