function NoPermission(){
	document.getElementById('topDefineDescription').innerHTML = '';

	IconDiv = document.createElement('div');
	IconDiv.setAttribute('style','width:100px; height:100px; background:gray; border-radius:50%; margin-left:45%; color:white; font-size:80px; font-weight:900; margin-top:30px; text-align:center;');

	IconDiv.innerHTML = '!';

	Title = document.createElement('h1');
	Title.innerHTML = 'No Permission';

	Msg = document.createElement('p');
	Msg.innerHTML = 'You do not have Permission to edit or view this parameter';

	Title.setAttribute('style','text-align:center;');
	Msg.setAttribute('style','text-align:center;');

	document.getElementById('topDefineDescription').appendChild(IconDiv);
	document.getElementById('topDefineDescription').appendChild(Title);
	document.getElementById('topDefineDescription').appendChild(Msg);
}

function ParameterNotPresent(LineNumber,HTMLObject){
	document.getElementById('topDefineDescription').innerHTML = ''	
	WorkSpaceTitle = document.createElement('p');
	WorkSpaceTitle.setAttribute('id','WorkSpaceTitle');
	
	try{
		WorkSpaceTitle.innerHTML = HTMLObject.innerHTML;
	}catch(err){
	}
	
	Description = document.createElement('p');
	Description.setAttribute('id','description');
	try{
		if(MainDescriptionsDict != undefined && MainDescriptionsDict[HTMLObject.id] != undefined){
			Description.innerHTML = MainDescriptionsDict[HTMLObject.id].replace('#' + HTMLObject.id,'');
		}
	}catch(err){
	}
	
	ParameterMsg = document.createElement('p');
	ParameterMsg.setAttribute('value','This Parameter is not present on this file');
	
	AddParameterButton = document.createElement('input');
	AddParameterButton.setAttribute('id','AddParameterButton');
	AddParameterButton.setAttribute('onclick','AddParmeterToClp("' + LineNumber + '","' + HTMLObject + '")');
	AddParameterButton.setAttribute('type','submit');
	AddParameterButton.setAttribute('value','Add "' + HTMLObject.innerHTML + '" to this file?');
	
	document.getElementById('topDefineDescription').appendChild(WorkSpaceTitle);
	document.getElementById('topDefineDescription').appendChild(Description);
	document.getElementById('topDefineDescription').appendChild(ParameterMsg);
	document.getElementById('topDefineDescription').appendChild(AddParameterButton);
}

/**/
UserParametersFileDict = {};
counter = 0;
while(sessionStorage.getItem('Parameters').split('\n')[counter] != undefined){
	UserParametersFileDict[sessionStorage.getItem('Parameters').split('\n')[counter].split(',')[0]] = sessionStorage.getItem('Parameters').split('\n')[counter];
	counter++;
}
/**/


function TreeViewClick(value,object,msg){
	Pre64 = [2,4];
	try{
		//console.log('Parent Node : ' + document.getElementById(object).parentNode.id);
		if(document.getElementById(object).parentNode.id[0] == 'G'){
			document.getElementsByClassName('SelectedThirdSubGroup')[0].setAttribute('class','ThirdSubGroup');
		}else{
			document.getElementsByClassName('SelectedThirdSubGroup')[0].setAttribute('class','TreeButton');
		}
	}catch(err){}
	
	if(document.getElementById(object).getAttribute('class') != 'BitTreeButton'){
		if(Pre64.includes(object)){
		}else{
			document.getElementById(object).setAttribute('class','SelectedThirdSubGroup');
		}
	}

	document.getElementById('topDefineTable').innerHTML = '';
	document.getElementById('topDefineDescription').innerHTML = '';
	
	if(msg == undefined){
		UserParametersFileDict = {};
		counter = 0;
		while(sessionStorage.getItem('Parameters').split('\n')[counter] != undefined){
			UserParametersFileDict[sessionStorage.getItem('Parameters').split('\n')[counter].split(',')[0]] = sessionStorage.getItem('Parameters').split('\n')[counter];
			counter++;
		}
	}
	
	if(UserParametersFileDict[object] == undefined){
		ParameterNotPresent(object,value);
		return;
	}
	
	try{
		if(Number(ReadPermissionDict[object]) > Number(AccessLevelForUser)){
			NoPermission();
			$('#topDefineDescription').fadeIn();
			return;
		}	
	}catch(err){
		//console.log('RedPermission Dictionary not set yet');
	}
	
	
	//Custom Bits Require Line in this format
	Line = UserParametersFileDict[object].split(',');
	//Current Line for comparison
	CurrentLine = UserParametersFileDict[object];
	
	IndexNumber = Line[0];
	
	//Serial Number
	if(IndexNumber == '4'){
		document.getElementById('topDefineDescription').innerHTML = '';
		SerialNumberFunction(Line,value);
		return;
	}

	if(passwordList.includes(IndexNumber) == true){
		document.getElementById('topDefineDescription').innerHTML = '';
		PasswordCustom(Line);
		return;
	}


	if(bitParameters999.includes(IndexNumber) == true){
		Bit999DisplayOptionsFunction(Line.toString(),document.getElementById(IndexNumber));
		return;
	}

	if(bitParameters1000.includes(IndexNumber) == true){
		Bit1000DisplayOptionsFunction(Line.toString(),document.getElementById(IndexNumber));
		return;
	}


	if(customParametersDropDown.includes(IndexNumber) == true){
		DropDownFunction(Line,value);
		return;
	}


	RegularParmeter(value,object);
}