function AddParmeterToClp(LineNumber){
	//alert('Add Parameter To Clp Function Ran');
	//console.log(LineNumber);
	APIFile = sessionStorage.getItem('TemplateFile');
	
	counter = 0;
	while(APIFile.split('\n')[counter] != undefined){
		if(APIFile.split('\n')[counter].split(',')[0] == LineNumber.toString()){
			RequestedParameter = APIFile.split('\n')[counter];
		}
		counter++;
	}
	
	ParametersFile = sessionStorage.getItem('Parameters');
	
	counter = 0;
	
	while(ParametersFile.split('\n')[counter] != undefined){
		if(Number(ParametersFile.split('\n')[counter].split(',')[0]) < Number(RequestedParameter.split(',')[0])){
		}else{
			AddHereCounter = counter;
			break;
		}
		counter++;
	}
	
	//Replace with new file
	try{
		NewFile =  sessionStorage.getItem('Parameters').replace(sessionStorage.getItem('Parameters').split('\n')[AddHereCounter], RequestedParameter + '\n' + sessionStorage.getItem('Parameters').split('\n')[AddHereCounter])
		sessionStorage.setItem('Parameters',NewFile);
		//console.log(NewFile);
	}catch(err){
		//console.log('Adding counter problem');
	}
	
	if(document.getElementById(LineNumber).getAttribute('onclick').split('(')[0] == 'TreeViewClick'){
		//document.getElementById(LineNumber).setAttribute('onclick','TreeViewClick(document.getElementById(' + LineNumber.toString()) + ',' + LineNumber.toString() + ')');
		location.reload();
		//TreeViewClick(document.getElementById(LineNumber.toString()),LineNumber.toString());
	}else{
		if(ParametersPresent[LineNumber] != undefined){
					
			//console.log(document.getElementById(LineNumber));
			//location.reload();
			document.getElementById(LineNumber).setAttribute('onclick','MenuParametersOnclick(`' + RequestedParameter + '`,document.getElementById(' + LineNumber + '))');
			MenuParametersOnclick(RequestedParameter,document.getElementById(LineNumber));
		}else{
			MenuParametersOnclick(`empty`,document.getElementById(LineNumber));
		}
	}
}