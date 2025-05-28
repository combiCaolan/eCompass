function SerialNumberFunction(Line,object){

	object = document.getElementById('4');	

	ParameterID = object.name;
	
	Title = document.createElement('p');
	Title.setAttribute('id','WorkSpaceTitle');
	Title.innerHTML = object.innerHTML;
	document.getElementById('topDefineTable').appendChild(Title);
	
	/*START DESCRIPTION SYSTEM*/
		DescriptionDirectory = sessionStorage.getItem('DescriptionMain');
		i = 0;
					
		while(DescriptionDirectory.split('\n')[i] !== undefined){
		if(DescriptionDirectory.split('\n')[i][0] == '#'){
				if(DescriptionDirectory.split('\n')[i].replace('#','').replace('\r','') == Line[0]){
					i++;
					Description = DescriptionDirectory.split('\n')[i];
					DescriptionText = DescriptionDirectory.split('\n')[i];
					break;
				}
		}
			i++;
		}
	/*END DESCRIPTION SYSTEM*/
	
	TRDescription = document.createElement('tr');
	document.getElementById('topDefineTable').appendChild(TRDescription);
	
	descriptionDiv = document.createElement("div");
	TRDescription.appendChild(descriptionDiv);

	description = document.createElement("p");
	description.innerHTML = DescriptionText;
	description.setAttribute("id","description"); 
	descriptionDiv.appendChild(description);
	
	/*Start create div*/
	Serialdiv = document.createElement('div');
	Serialdiv.setAttribute('style','margin:10px; padding:15px;');
	//Serialdiv.appendChild(CurrentValueLeftTD);
	
	SerialTable = document.createElement('table');
	SerialTR = document.createElement('tr');
	SerialLabel = document.createElement('p');
	SerialLabel.setAttribute('id','ReadTitle');
	SerialLabel.innerHTML  = LanguageDict["TruckSerialNumber"] + '<br/>';
	SerialBreak = document.createElement('br');
	SerialParagraph = document.createElement('p');
	SerialParagraph.setAttribute('style','float:right; margin:0px;');
	SerialParagraph.appendChild(SerialBreak);
	SerialLabel.appendChild(SerialParagraph);
	
	if(Number(writePermissionDict[4]) <= Number(AccessLevelForUser)){
		SerialInput = document.createElement('input');
		SerialInput.setAttribute('id','SerialInput');
		SerialInput.setAttribute('style','style="float:left; text-align:right;"');
		
		SerialInput.setAttribute('type','number');
		SerialInput.setAttribute('onchange','UpdateSerialNumber(`' + Line + '`);');
		SerialInput.value = Line[3];
		document.getElementById('topDefineTable').appendChild(SerialLabel);
		document.getElementById('topDefineTable').appendChild(SerialInput);	
	}else{
		SerialInput = document.createElement('p');
		SerialInput.setAttribute('id','ReadResult');
	
		SerialInput.innerHTML = Line[3];
		document.getElementById('topDefineTable').appendChild(SerialLabel);
		document.getElementById('topDefineTable').appendChild(SerialInput);
	}
	
		
	SerialTable.appendChild(SerialTR);
	document.getElementById('topDefineTable').appendChild(Serialdiv);
	Serialdiv.appendChild(SerialTable);
	/*End create div*/
	
	var LabelForTruckSerialNumber = document.createElement('label');
	LabelForTruckSerialNumber.innerHTML = LanguageDict["TruckSerialNumber"] + '<br/>';
	LabelForTruckSerialNumber.setAttribute('id','ReadTitle');
	
}


function UpdateSerialNumber(Line){	
	
	//constructing new line
	NewLine = Line.split(',')[0] + ',' + Line.split(',')[1] + "," + Line.split(',')[2] + ',' + document.getElementById('SerialInput').value.replace(/[^0-9.]/g, "") + ',' + Line.split(',')[4] + "," + Line.split(',')[5] + "," + Line.split(',')[6] + "," + Line.split(',')[7] + "," + Line.split(',')[8] + "," + Line.split(',')[9] + "," + Line.split(',')[10];
	
	//constructing new Parameters file
	NewParameters = sessionStorage.getItem('Parameters').replace(String(Line.replace('\n','')),String(NewLine.replace('\n','')));
	
	//set new local parameters file
	sessionStorage.setItem('Parameters',NewParameters);
	
	//running click serial number again to update functions understanding of new line
	TreeViewClick(document.getElementsByName('4')[0],"4");
	
	//setting input text box to blue to show the user we've changed the value
	document.getElementById('SerialInput').setAttribute('style','background:blue; color:white;');
	document.getElementById('SerialInput').style.backgroundColor = 'blue';
	document.getElementById('SerialInput').style.color = 'white';
	
}