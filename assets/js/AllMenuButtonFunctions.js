CurrentPage = window.location.pathname.split('/')[window.location.pathname.split('/').length-1];
ReadPermissionDict = {};
WritePermissionDict = {};


Template = sessionStorage.getItem('TemplateFile');
counter = 0;
while(Template.split('\n')[counter] != undefined){
	ReadPermissionDict[Template.split('\n')[counter].split(',')[0]] = Template.split('\n')[counter].split(',')[8];
	WritePermissionDict[Template.split('\n')[counter].split(',')[0]] = Template.split('\n')[counter].split(',')[9];
	counter++;
}

document.getElementById('CloseFileDialog').title = LanguageDict["Close"];
document.getElementById('CloseFileDialog').innerHTML = LanguageDict["CloseFileDialogMessage"];

//Set elements for User Dropdown
document.getElementById('UsernameLocal').innerHTML = sessionStorage.getItem('loggedinusername');
document.getElementById('AccessLevel').innerHTML = LanguageDict[Number(sessionStorage.getItem('AccessLevel'))];
//ApiVersion = ParametersDirForUsersFile[6].split(',')[3];
document.getElementById('APIVersion').innerHTML = sessionStorage.getItem('APIV'); //ApiVersion[0] + '.' + ApiVersion.replace(ApiVersion[0],'');


ChangesMadePreDownload = false;

function OpenInNewTab(PassName){
	localStorage.setItem('OpenInNewTab',PassName);
	window.open('https://support.combilift.net/ecompass');
}

function OpenNewFile(){
	if(ChangesMadePreDownload == true){
		Check = confirm(LanguageDict['GeneralFileLostWarning']);
		if(Check != true){
			return;
		}
	}
	OpenInNewTab('OpenNew');
	//$( "#OpenInNewTabDefaultFileList").dialog();
}

function WebdownloadFile(filename,text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', 'COMBI_PAR.clp');

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function MobileMenuFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function HomeMenuClick() {
	if(document.getElementsByClassName('tree')[0].getAttribute('state') !== 'clicked' || document.getElementsByClassName('tree')[0].getAttribute('state') == null){   
		$(".tree").animate({left: '-40%'});
		document.getElementsByClassName('tree')[0].setAttribute('style','display:none;');
		$("#viewer").animate({marginLeft: '5%'});
		$("#viewer").animate({width: '90%'});
		document.getElementsByClassName('tree')[0].setAttribute('state','clicked');
	}else{
		document.getElementsByClassName('tree')[0].removeAttribute('style');
		document.getElementById('viewer').removeAttribute('style');
		document.getElementsByClassName('tree')[0].removeAttribute('state');
	}
}


function ParametersMenuToggle(){
	if(document.getElementById('MenuLink').innerHTML == 'Parameters Menu'){
		document.getElementById('MenuLink').innerHTML = 'View Parameter';
		document.getElementById('MobileMenuButtonForText').style.display = "none";
	}else{
		document.getElementById('MenuLink').innerHTML = 'Parameters Menu';
		document.getElementById('MobileMenuButtonForText').style.display = "unset";
	}
	$(".tree").toggle();
	$("#viewer").toggle();
}


function readParameters(DefaultFileName) {
	
	if(CurrentPage == 'editor.php'){
		Check = confirm(LanguageDict['GeneralFileLostWarning']);
		if(Check != true){
			return;
		}
	}
	
	if(sessionStorage.getItem('API') == null){
		sessionStorage.setItem('API','GeneralDefault_API_1.clp');
	}
		var input = document.createElement('input');
		input.type = 'file';
		input.setAttribute('accept','.clp');
		input.onchange = e => { 
			//getting a hold of the file reference
			var file = e.target.files[0]; 
			// setting up the reader
			var reader = new FileReader();
			reader.readAsText(file,'UTF-8');
			// here we tell the reader what to do when it's done reading...
			reader.onload = readerEvent => {
			var data = readerEvent.target.result; // this is the content!
			//Check Parameters
				//console.log('will check here');
			//finished checking parameters
			sessionStorage.setItem("ParametersFileName",input.value);			
			window.sessionStorage.setItem('Parameters', data);
			//window.sessionStorage.setItem('BobJoe', data);
			if(data==''){
				return;
			}
			
			if(ParametersDirectoryFileName!==null){
				if(ParametersFileName!==null){
					var ParametersDirectoryFileName = sessionStorage.getItem('ParametersDirectoryFileName');
					var ParametersFileName = sessionStorage.getItem('ParametersFileName');
					//window.location.href = 'editor.php';
					UserParametersFileDict = {};
					counter = 0;
					while(sessionStorage.getItem('Parameters').split('\n')[counter] != undefined){
						UserParametersFileDict[sessionStorage.getItem('Parameters').split('\n')[counter].split(',')[0]] = sessionStorage.getItem('Parameters').split('\n')[counter];
						counter++;
					}
					
					//FORM FOR LOG REGISTRATION
					
					EmptyDiv = document.createElement('div');
					EmptyDiv.setAttribute('style','display:none;')
					
					//console.log(UserParametersFileDict[2]);
					Form = document.createElement('form');
					Form.setAttribute('action','includes/openfile.php');
					Form.setAttribute('method','POST');
					Form.setAttribute('name','LogRegForm');
					
					Model = document.createElement('input');
					Model.type = 'text';
					Model.setAttribute('name','Model');
					Model.value = UserParametersFileDict[2].split(',')[3];

					Form.appendChild(Model);
					
					FileName = document.createElement('input');
					FileName.type = 'text';
					FileName.setAttribute('name','FileName');
					
					FilePathLength = input.value.toString().split('\\').length - 1;
					FilePath = input.value.split('\\')[FilePathLength];
					FileName.value = FilePath;
					
					Form.appendChild(FileName);
					
					SerialNumber = document.createElement('input');
					SerialNumber.type = 'text';
					SerialNumber.setAttribute('name','SerialNumber');
					SerialNumber.value = UserParametersFileDict[4].split(',')[3];
					
					Form.appendChild(SerialNumber);
					
					UserName = document.createElement('input');
					UserName.type = 'text';
					UserName.setAttribute('name','Username');
					UserName.value = sessionStorage.getItem('loggedinusername');
					
					Form.appendChild(UserName);
					
					Useremail = document.createElement('input');
					Useremail.type = 'text';
					Useremail.setAttribute('name','Useremail');
					Useremail.value = sessionStorage.getItem('loggedinemail');
					//console.log(Useremail.value);
								
					Form.appendChild(Useremail);					
					
					AccessLevel = document.createElement('input');
					AccessLevel.type = 'text';
					AccessLevel.setAttribute('name','AccessLevel');
					AccessLevel.value = sessionStorage.getItem('AccessLevel');
					
					Form.appendChild(AccessLevel);
					
					ActionInput = document.createElement('input');
					ActionInput.type = 'text';
					ActionInput.setAttribute('name','ActionInput');
					ActionInput.value = 'Opened File';
					
					Form.appendChild(ActionInput);
					
					SubmitForm = document.createElement('input');
					SubmitForm.type = 'submit';
					
					Form.appendChild(SubmitForm);
					
					EmptyDiv.appendChild(Form);
					document.getElementById('myTopnav').appendChild(EmptyDiv);
					
					SubmitForm.click();
				}
			}
			}
		}
		input.click();
}

//Default Files Onclick
function readDefaultFile(Path) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	sessionStorage.setItem('ParametersFileName',Path)
    window.sessionStorage.setItem('Parameters', this.responseText);
	File = this.responseText;
	ParametersDirectoryFileName = sessionStorage.getItem('ParametersDirectoryFileName');
	//ParametersFileName = sessionStorage.getItem('ParametersFileName');
	counter = 0;
	while(File.split('\n')[counter] != undefined){
		if(File.split('\n')[counter].split(',')[0] == '6'){
			ApiVersion = File.split('\n')[counter].split(',')[3];
		}
		counter++;
	}
	
	UserParametersFileDict = {};
	counter = 0;
	while(File.split('\n')[counter] != undefined){
		UserParametersFileDict[File.split('\n')[counter].split(',')[0]] = File.split('\n')[counter];
		counter++;
	}
	
	try{
		//console.log(ApiVersion);
		if('API-' + ApiVersion == sessionStorage.getItem('APIV')){
			//console.log('The Api on this files matches the api loaded');
		}else{
			//alert('Api Version of this file is ' + ApiVersion + ' will have to change this');
			alert('Api Version of this file is ' + ApiVersion + ' ');
		}
		
		
		//FORM FOR LOG REGISTRATION
					
		EmptyDiv = document.createElement('div');
		EmptyDiv.setAttribute('style','display:none;')
		
		Form = document.createElement('form');
		Form.setAttribute('action','includes/openfile.php');
		Form.setAttribute('method','POST');
		Form.setAttribute('name','LogRegForm');
		
		Model = document.createElement('input');
		Model.type = 'text';
		Model.setAttribute('name','Model');
		Model.value = UserParametersFileDict[2].split(',')[3];

		Form.appendChild(Model);
		
		FileName = document.createElement('input');
		FileName.type = 'text';
		FileName.setAttribute('name','FileName');
		
		FilePathLength = Path.toString().split('/').length - 1;
		FilePath = Path.split('/')[FilePathLength];
		FileName.value = FilePath;
		
		Form.appendChild(FileName);
		
		SerialNumber = document.createElement('input');
		SerialNumber.type = 'text';
		SerialNumber.setAttribute('name','SerialNumber');
		SerialNumber.value = UserParametersFileDict[4].split(',')[3];
		
		Form.appendChild(SerialNumber);
		
		UserName = document.createElement('input');
		UserName.type = 'text';
		UserName.setAttribute('name','Username');
		UserName.value = sessionStorage.getItem('loggedinusername');
		
		Form.appendChild(UserName);
		
		AccessLevel = document.createElement('input');
		AccessLevel.type = 'text';
		AccessLevel.setAttribute('name','AccessLevel');
		AccessLevel.value = sessionStorage.getItem('AccessLevel');
		
		Form.appendChild(AccessLevel);
		
		ActionInput = document.createElement('input');
		ActionInput.type = 'text';
		ActionInput.setAttribute('name','ActionInput');
		ActionInput.value = 'Opened New File';
		
		Form.appendChild(ActionInput);
		
		SubmitForm = document.createElement('input');
		SubmitForm.type = 'submit';
		
		Form.appendChild(SubmitForm);
		
		EmptyDiv.appendChild(Form);
		document.getElementById('myTopnav').appendChild(EmptyDiv);
		
		SubmitForm.click();
		
		
	}catch(err){
		alert('Combi General Error - Log 404');
	}

    }
  };
  xhttp.open("GET", Path, true);
  xhttp.send();
}


function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}


function WebDownloadFile(){
	if(MinError.length != 0 || MaxError.length != 0){
		UserAuth = confirm('Errors still exist on this file - are you sure you want to download?');
		if(UserAuth == true){
		}else{
			return;
		}
	}
	
	if(removedParametersCounters.length !== 0){
		var counter = 0;
		while(removedParametersCounters[counter] !== undefined){
			NewPar = sessionStorage.getItem('Parameters').replace(removedParametersCounters[counter] + '\n','');
			sessionStorage.setItem('Parameters',NewPar);
			counter++;
		}
	}

	location.href = 'Download.php';//?changes=' + sessionStorage.getItem('UserMadeChanges');	
	ChangesMadePreDownload = false;
}

function CloseFileDialog() {
	if(ChangesMadePreDownload == true){
		Check = confirm(LanguageDict['GeneralFileLostWarning']);
		if(Check != true){
			return;
		}
		location.href= sessionStorage.getItem('ServerPath') + "/ecompass/index.php";
	}else{
		location.href= sessionStorage.getItem('ServerPath') + "/ecompass/index.php";
	}
	
}

function CompareDialog() {
	document.getElementById('topDefineTable').innerHTML = '';
	document.getElementById('topDefineDescription').innerHTML = '';
	WorkSpaceTitle = document.createElement('p');
	WorkSpaceTitle.setAttribute('id','WorkSpaceTitle');
	WorkSpaceTitle.innerHTML = LanguageDict["CompareTitle"];
	
	DescriptionArea = document.createElement('tr');
	
	Description = document.createElement('p');
	Description.innerHTML = LanguageDict["CompareDescription"];
	Description.setAttribute('id','description');
	
	UnorderedList = document.createElement('ul');
	
	ListItemOne = document.createElement('li');
	ListItemTwo = document.createElement('li');
	
	FileButton = document.createElement('input');
	FileButton.type = 'submit';
	FileButton.setAttribute('value','Choose File to compare with');
	FileButton.setAttribute('onclick','PostCompareFile()');
	
	Results = document.createElement('div');
	Results.setAttribute('id','results');
	
	CompareBTN = document.createElement('input');
	CompareBTN.setAttribute('type','submit');
	CompareBTN.setAttribute('onclick','Compare()');
	CompareBTN.setAttribute('value','Compare Files');
	
	/*
	FactoryButton = document.createElement('input');
	FactoryButton.type = 'submit';
	FactoryButton.setAttribute('value','Set Current Values to Factory');
	FactoryButton.setAttribute('onclick','SBSetFactory()');
	*/
	FileButton.setAttribute('id','FileActionsButtonWorkSpace');
	CompareBTN.setAttribute('id','FileActionsButtonWorkSpace');
	
	
	Log = document.createElement('div');
	try{
		Log.innerHTML = CurentFileActionLog;
	}catch(err){
		//CurrentFileActionLog Doesn't exist
	}
	Log.setAttribute('id','SpecialBlockLog');
	
	document.getElementById('topDefineDescription').appendChild(WorkSpaceTitle);
	document.getElementById('topDefineDescription').appendChild(DescriptionArea);
	document.getElementById('topDefineDescription').appendChild(UnorderedList);
	document.getElementById('topDefineDescription').appendChild(Log);
	document.getElementById('topDefineDescription').appendChild(Results);
	//document.getElementById('topDefineDescription').appendChild(CompareBTN);
	UnorderedList.appendChild(ListItemOne);
	UnorderedList.appendChild(ListItemTwo);
	ListItemOne.appendChild(FileButton);
	ListItemTwo.appendChild(CompareBTN);
	DescriptionArea.appendChild(Description);
	
	$( "#CompareDialog" ).dialog();
}

function NewFile(){
	if(ChangesMadePreDownload == true){
		Check = confirm(LanguageDict['GeneralFileLostWarning']);
		if(Check != true){
			return;
		}
	}
	$( "#DefaultFileList").dialog();
}