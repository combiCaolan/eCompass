ErrorsPresent = false;

function OnStartupErrorCheck(){
	
	MinError = [];
	MaxError = [];
	
	counter = 0;
	Parameters = sessionStorage.getItem('Parameters');
	while(Parameters.split('\n')[counter] != undefined){
		if(Number(ReadPermissionDict[Parameters.split('\n')[counter].split(',')[0]]) <= Number(AccessLevelForUser)){
			//Min Check
			if(Parameters.split('\n')[counter].split(',')[4] != undefined){
			
				if(Number(Parameters.split(	'\n')[counter].split(',')[1]) < Number(Parameters.split(	'\n')[counter].split(',')[4])){
					MinError.push(Parameters.split('\n')[counter].split(',')[0]);
					ErrorsPresent = true;
				}
			}
		
			//Max Check
			if(Parameters.split('\n')[counter].split(',')[5] != undefined){
			
				if(Number(Parameters.split(	'\n')[counter].split(',')[1]) > Number(Parameters.split('\n')[counter].split(',')[5])){
					MaxError.push(Parameters.split('\n')[counter].split(',')[0]);
					ErrorsPresent = true;
				}
			}
		}
		counter++;
	}
}