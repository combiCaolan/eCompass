function HideAllMenus(){
}

counter = 0;
UnorderedList = document.createElement('ul');
while(TruckDefaultDir[counter] !== undefined){
	ListItem = document.createElement('li');
	a = document.createElement('button');
	a.innerHTML = TruckDefaultDir[counter];
	Path = sessionStorage.getItem('ServerPath') + '/ecompass/Truck_Default_Files/' + TruckDefaultDir[counter];
	a.setAttribute("onclick","readDefaultFile('" + Path + "')");
	a.setAttribute("style","margin:10px;");
	ListItem.appendChild(a);
	
	SecondListItem = document.createElement('li');
	a = document.createElement('button');
	a.innerHTML = TruckDefaultDir[counter];
	Path = sessionStorage.getItem('ServerPath') + '/ecompass/Truck_Default_Files/' + TruckDefaultDir[counter];
	a.setAttribute("onclick","OpenInNewTab('" + Path + "')");
	a.setAttribute("style","margin:10px;");
	SecondListItem.appendChild(a);
	
	document.getElementById('DefaultFilesDiv').appendChild(ListItem);
	document.getElementById('OpenInNewTabDefaultFileList').appendChild(SecondListItem);
	counter++;
}

function LogViewerDialog() {
	window.open('https://support.combilift.net/elogs');
}

function SearchDialog() {
	$( "#SearchParameterDialog" ).dialog();
	SearchFunctionOptions();
}

function ApiDialog() {
	$( "#ChangeApiButton" ).dialog();
}

function ChangeUserDialog() {
	$( "#ChangeLanguageDialog" ).dialog();
}

function ErrorAlertDialog(){
	$( "#ErrorAlertDialog" ).dialog();
}

function SpecialBlockDialog(){
	document.getElementById('topDefineTable').innerHTML = '';
	document.getElementById('topDefineDescription').innerHTML = '';
	WorkSpaceTitle = document.createElement('p');
	WorkSpaceTitle.setAttribute('id','WorkSpaceTitle');
	WorkSpaceTitle.innerHTML = LanguageDict["SpecialBlocks"];
	
	DescriptionArea = document.createElement('tr');
	Description = document.createElement('p');
	Description.innerHTML = LanguageDict["SpecialBlocksDescription"];
	Description.setAttribute('id','description');

	EmptySpace0 = document.createElement('tr');
	EmptySpace0 = document.createElement('p');
	EmptySpace0.innerHTML = 'GENERAL BLOCKS';
	EmptySpace0.setAttribute('id','description');
	EmptySpace1 = document.createElement('tr');
	EmptySpace1 = document.createElement('p');
	EmptySpace1.innerHTML = 'MoCAS BLOCKS';
	EmptySpace1.setAttribute('id','description');
	EmptySpace2 = document.createElement('tr');
	EmptySpace2 = document.createElement('p');
	EmptySpace2.innerHTML = 'PASSWORD BLOCKS';
	EmptySpace2.setAttribute('id','description');

	GeneralUnorderedList = document.createElement('ul');
	PasswordsUnorderedList = document.createElement('ul');
	MocasUnorderedList = document.createElement('ul');


	UnorderedList = document.createElement('ul');

	EmptySpace = document.createElement('p');
	EmptySpace.innerHTML = '----------------------------------------';

	ListItemOne = document.createElement('li');
	ListItemTwo = document.createElement('li');
	ListItemThree = document.createElement('li');
	ListItemFour = document.createElement('li');
	ListItemFive = document.createElement('li');
	ListItemSix = document.createElement('li');
	ListItemSeven = document.createElement('li');
	ListItemEight = document.createElement('li');
	ListItemNine = document.createElement('li');
	ListItemTen = document.createElement('li');
	ListItemEleven = document.createElement('li');
	ListItemTwelve = document.createElement('li');
	ListItemThirteen = document.createElement('li');
	ListItemFourteen = document.createElement('li');


	AllBlocksLabel = document.createElement('label');
	AllBlocksLabel.innerHTML = 'Full block of parameters';
	AllBlocks = document.createElement('input');
	AllBlocks.type = 'submit';
	AllBlocks.setAttribute('value','Add');
	AllBlocks.setAttribute('onclick',"SpecialBlocksLogic('AllBlocks.txt')");
	AllBlocksRemove = document.createElement('input');
	AllBlocksRemove.type = 'submit';
	AllBlocksRemove.setAttribute('value','Remove');
	AllBlocksRemove.setAttribute('onclick',"DynamicRemoveParameters('AllBlocks.txt')");

	InitialSetupVarsLabel = document.createElement('label');
	InitialSetupVarsLabel.innerHTML = 'Inital Setup Block';
	InitialSetupVars = document.createElement('input');
	InitialSetupVars.type = 'submit';
	InitialSetupVars.setAttribute('value','Add');
	InitialSetupVars.setAttribute('onclick',"SpecialBlocksLogic('InitialSetupVars.txt')");
	InitialSetupVarsRemove = document.createElement('input');
	InitialSetupVarsRemove.type = 'submit';
	InitialSetupVarsRemove.setAttribute('value','Remove');
	InitialSetupVarsRemove.setAttribute('onclick',"DynamicRemoveParameters('InitialSetupVars.txt')");

	MainInfoBlockLabel = document.createElement('label');
	MainInfoBlockLabel.innerHTML = 'Main Info Block';
	MainInfoBlock = document.createElement('input');
	MainInfoBlock.type = 'submit';
	MainInfoBlock.setAttribute('value','Add');
	MainInfoBlock.setAttribute('onclick',"SpecialBlocksLogic('MainInfoBlock.txt')");
	MainInfoBlockRemove = document.createElement('input');
	MainInfoBlockRemove.type = 'submit';
	MainInfoBlockRemove.setAttribute('value','Remove');
	MainInfoBlockRemove.setAttribute('onclick',"SpecialBlocksLogic('MainInfoBlock.txt')");




	MocasHourmeterLabel = document.createElement('label');
	MocasHourmeterLabel.innerHTML = 'MoCAS Hourmeters Block';
	MocasHourmeter = document.createElement('input');
	MocasHourmeter.type = 'submit';
	MocasHourmeter.setAttribute('value','Add');
	MocasHourmeter.setAttribute('onclick',"SpecialBlocksLogic('MocasHourmeter.txt')");
	MocasHourmeterRemove = document.createElement('input');
	MocasHourmeterRemove.type = 'submit';
	MocasHourmeterRemove.setAttribute('value','Remove');
	MocasHourmeterRemove.setAttribute('onclick',"SpecialBlocksLogic('MocasHourmeter.txt')");

	MocasModulesLabel = document.createElement('label');
	MocasModulesLabel.innerHTML = 'MoCAS Modules Block';
	MocasModules = document.createElement('input');
	MocasModules.type = 'submit';
	MocasModules.setAttribute('value','Add');
	MocasModules.setAttribute('onclick',"SpecialBlocksLogic('MocasModules.txt')");
	MocasModulesRemove = document.createElement('input');
	MocasModulesRemove.type = 'submit';
	MocasModulesRemove.setAttribute('value','Remove');
	MocasModulesRemove.setAttribute('onclick',"SpecialBlocksLogic('MocasModules.txt')");
	
		
	UsersPasswordLabel = document.createElement('label');
	UsersPasswordLabel.innerHTML = 'Full Passwords Block';
	UsersPassword = document.createElement('input');
	UsersPassword.type = 'submit';
	UsersPassword.setAttribute('value','Add');
	UsersPassword.setAttribute('onclick',"SpecialBlocksLogic('UsersPasswords.txt')");
	UsersPasswordRemove = document.createElement('input');
	UsersPasswordRemove.type = 'submit';
	UsersPasswordRemove.setAttribute('value','Remove');
	UsersPasswordRemove.setAttribute('onclick',"DynamicRemoveParameters('UsersPasswords.txt')");
		
	PasswordOneLabel = document.createElement('label');
	PasswordOneLabel.innerHTML = 'Password - Operator 1';
	PasswordOne = document.createElement('input');
	PasswordOne.type = 'submit';
	PasswordOne.setAttribute('value','Add');
	PasswordOne.setAttribute('onclick',"SpecialBlocksLogic('PasswordOne.txt')");
	PasswordOneRemove = document.createElement('input');
	PasswordOneRemove.type = 'submit';
	PasswordOneRemove.setAttribute('value','Remove');
	PasswordOneRemove.setAttribute('onclick',"DynamicRemoveParameters('PasswordOne.txt')");
		
	PasswordTwoLabel = document.createElement('label');
	PasswordTwoLabel.innerHTML = 'Password - Operator 2';
	PasswordTwo = document.createElement('input');
	PasswordTwo.type = 'submit';
	PasswordTwo.setAttribute('value','Add');
	PasswordTwo.setAttribute('onclick',"SpecialBlocksLogic('PasswordTwo.txt')");
	PasswordTwoRemove = document.createElement('input');
	PasswordTwoRemove.type = 'submit';
	PasswordTwoRemove.setAttribute('value','Remove');
	PasswordTwoRemove.setAttribute('onclick',"DynamicRemoveParameters('PasswordTwo.txt')");
		
	PasswordThreeLabel = document.createElement('label');
	PasswordThreeLabel.innerHTML = 'Password - Operator 3';
	PasswordThree = document.createElement('input');
	PasswordThree.type = 'submit';
	PasswordThree.setAttribute('value','Add');
	PasswordThree.setAttribute('onclick',"SpecialBlocksLogic('PasswordThree.txt')");
	PasswordThreeRemove = document.createElement('input');
	PasswordThreeRemove.type = 'submit';
	PasswordThreeRemove.setAttribute('value','Remove');
	PasswordThreeRemove.setAttribute('onclick',"DynamicRemoveParameters('PasswordThree.txt')");
		
	PasswordFourLabel = document.createElement('label');
	PasswordFourLabel.innerHTML = 'Password - Technician';
	PasswordFour = document.createElement('input');
	PasswordFour.type = 'submit';
	PasswordFour.setAttribute('value','Add');
	PasswordFour.setAttribute('onclick',"SpecialBlocksLogic('PasswordFour.txt')");
	PasswordFourRemove = document.createElement('input');
	PasswordFourRemove.type = 'submit';
	PasswordFourRemove.setAttribute('value','Remove');
	PasswordFourRemove.setAttribute('onclick',"DynamicRemoveParameters('PasswordFour.txt')");
		
	PasswordFiveLabel = document.createElement('label');
	PasswordFiveLabel.innerHTML = 'Password - Manager';
	PasswordFive = document.createElement('input');
	PasswordFive.type = 'submit';
	PasswordFive.setAttribute('value','Add');
	PasswordFive.setAttribute('onclick',"SpecialBlocksLogic('PasswordFive.txt')");
	PasswordFiveRemove = document.createElement('input');
	PasswordFiveRemove.type = 'submit';
	PasswordFiveRemove.setAttribute('value','Remove');
	PasswordFiveRemove.setAttribute('onclick',"DynamicRemoveParameters('PasswordFive.txt')");
		
	PasswordSixLabel = document.createElement('label');
	PasswordSixLabel.innerHTML = 'Password - Dealer';
	PasswordSix = document.createElement('input');
	PasswordSix.type = 'submit';
	PasswordSix.setAttribute('value','Add');
	PasswordSix.setAttribute('onclick',"SpecialBlocksLogic('PasswordSix.txt')");
	PasswordSixRemove = document.createElement('input');
	PasswordSixRemove.type = 'submit';
	PasswordSixRemove.setAttribute('value','Remove');
	PasswordSixRemove.setAttribute('onclick',"DynamicRemoveParameters('PasswordSix.txt')");
		
	PasswordSevenLabel = document.createElement('label');
	PasswordSevenLabel.innerHTML = 'Password - Combilift';
	PasswordSeven = document.createElement('input');
	PasswordSeven.type = 'submit';
	PasswordSeven.setAttribute('value','Add');
	PasswordSeven.setAttribute('onclick',"SpecialBlocksLogic('PasswordSeven.txt')");
	PasswordSevenRemove = document.createElement('input');
	PasswordSevenRemove.type = 'submit';
	PasswordSevenRemove.setAttribute('value','Remove');
	PasswordSevenRemove.setAttribute('onclick',"DynamicRemoveParameters('PasswordSeven.txt')");
		
	PasswordEightLabel = document.createElement('label');
	PasswordEightLabel.innerHTML = 'Password - Developer';
	PasswordEight = document.createElement('input');
	PasswordEight.type = 'submit';
	PasswordEight.setAttribute('value','Add');
	PasswordEight.setAttribute('onclick',"SpecialBlocksLogic('PasswordEight.txt')");
	PasswordEightRemove = document.createElement('input');
	PasswordEightRemove.type = 'submit';
	PasswordEightRemove.setAttribute('value','Remove');
	PasswordEightRemove.setAttribute('onclick',"DynamicRemoveParameters('PasswordEight.txt')");
	
	AllBlocks.setAttribute('id','FileActionsButtonWorkSpace');
	AllBlocksRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	MainInfoBlock.setAttribute('id','FileActionsButtonWorkSpace');
	MainInfoBlockRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	InitialSetupVars.setAttribute('id','FileActionsButtonWorkSpace');
	InitialSetupVarsRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	MocasHourmeter.setAttribute('id','FileActionsButtonWorkSpace');
	MocasHourmeterRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	MocasModules.setAttribute('id','FileActionsButtonWorkSpace');
	MocasModulesRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	UsersPasswordRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	UsersPassword.setAttribute('id','FileActionsButtonWorkSpace');
	PasswordOneRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	PasswordTwoRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	PasswordThreeRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	PasswordFourRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	PasswordFiveRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	PasswordSixRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	PasswordSevenRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	PasswordEightRemove.setAttribute('id','FileActionsRemoveButtonWorkSpace');
	PasswordOne.setAttribute('id','FileActionsButtonWorkSpace');
	PasswordTwo.setAttribute('id','FileActionsButtonWorkSpace');
	PasswordThree.setAttribute('id','FileActionsButtonWorkSpace');
	PasswordFour.setAttribute('id','FileActionsButtonWorkSpace');
	PasswordFive.setAttribute('id','FileActionsButtonWorkSpace');
	PasswordSix.setAttribute('id','FileActionsButtonWorkSpace');
	PasswordSeven.setAttribute('id','FileActionsButtonWorkSpace');
	PasswordEight.setAttribute('id','FileActionsButtonWorkSpace');
	
	Log = document.createElement('div');
	try{
		Log.innerHTML = CurentFileActionLog;
	}catch(err){
		//CurrentFileActionLog Doesn't exist
	}
	Log.setAttribute('id','SpecialBlockLog');
	

	

	ListItemOne.appendChild(AllBlocks);
	//ListItemOne.appendChild(AllBlocksRemove);
	ListItemTwo.appendChild(MainInfoBlock);
	//ListItemTwo.appendChild(MainInfoBlockRemove);
	ListItemThree.appendChild(InitialSetupVars);
	//ListItemThree.appendChild(InitialSetupVarsRemove);
	
	ListItemFour.appendChild(MocasHourmeter);
	ListItemFour.appendChild(MocasHourmeterRemove);
	ListItemFive.appendChild(MocasModules);
	ListItemFive.appendChild(MocasModulesRemove);
	
	ListItemSix.appendChild(UsersPassword);
	ListItemSix.appendChild(UsersPasswordRemove);
	ListItemSeven.appendChild(PasswordOne);
	ListItemSeven.appendChild(PasswordOneRemove);
	ListItemEight.appendChild(PasswordTwo);
	ListItemEight.appendChild(PasswordTwoRemove);
	ListItemNine.appendChild(PasswordThree);
	ListItemNine.appendChild(PasswordThreeRemove);
	ListItemTen.appendChild(PasswordFour);
	ListItemTen.appendChild(PasswordFourRemove);
	ListItemEleven.appendChild(PasswordFive);
	ListItemEleven.appendChild(PasswordFiveRemove);
	ListItemTwelve.appendChild(PasswordSix);
	ListItemTwelve.appendChild(PasswordSixRemove);
	ListItemThirteen.appendChild(PasswordSeven);
	ListItemThirteen.appendChild(PasswordSevenRemove);
	ListItemFourteen.appendChild(PasswordEight);
	ListItemFourteen.appendChild(PasswordEightRemove);

	
	DescriptionArea.appendChild(Description);
	
	//$( "#SpecialBlockDialog" ).dialog();

	
	GeneralUnorderedList.appendChild(AllBlocksLabel);
	GeneralUnorderedList.appendChild(ListItemOne);
//	GeneralUnorderedList.appendChild(EmptySpace);
	GeneralUnorderedList.appendChild(MainInfoBlockLabel);
	GeneralUnorderedList.appendChild(ListItemTwo);
//	GeneralUnorderedList.appendChild(EmptySpace);
	GeneralUnorderedList.appendChild(InitialSetupVarsLabel);
	GeneralUnorderedList.appendChild(ListItemThree);
//	GeneralUnorderedList.appendChild(EmptySpace);
	
	MocasUnorderedList.appendChild(MocasHourmeterLabel);
	MocasUnorderedList.appendChild(ListItemFour);
//	MocasUnorderedList.appendChild(EmptySpace);
	MocasUnorderedList.appendChild(MocasModulesLabel);
	MocasUnorderedList.appendChild(ListItemFive);
//	MocasUnorderedList.appendChild(EmptySpace);

	PasswordsUnorderedList.appendChild(UsersPasswordLabel);
	PasswordsUnorderedList.appendChild(ListItemSix);
//	PasswordsUnorderedList.appendChild(EmptySpace);
	PasswordsUnorderedList.appendChild(PasswordOneLabel);
	PasswordsUnorderedList.appendChild(ListItemSeven);
//	PasswordsUnorderedList.appendChild(EmptySpace);
	PasswordsUnorderedList.appendChild(PasswordTwoLabel);
	PasswordsUnorderedList.appendChild(ListItemEight);
//	PasswordsUnorderedList.appendChild(EmptySpace);
	PasswordsUnorderedList.appendChild(PasswordThreeLabel);
	PasswordsUnorderedList.appendChild(ListItemNine);
//	PasswordsUnorderedList.appendChild(EmptySpace);
	PasswordsUnorderedList.appendChild(PasswordFourLabel);
	PasswordsUnorderedList.appendChild(ListItemTen);
//	PasswordsUnorderedList.appendChild(EmptySpace);
	PasswordsUnorderedList.appendChild(PasswordFiveLabel);
	PasswordsUnorderedList.appendChild(ListItemEleven);
//	PasswordsUnorderedList.appendChild(EmptySpace);
	PasswordsUnorderedList.appendChild(PasswordSixLabel);
	PasswordsUnorderedList.appendChild(ListItemTwelve);
//	PasswordsUnorderedList.appendChild(EmptySpace);
	PasswordsUnorderedList.appendChild(PasswordSevenLabel);
	PasswordsUnorderedList.appendChild(ListItemThirteen);
//	PasswordsUnorderedList.appendChild(EmptySpace);
	PasswordsUnorderedList.appendChild(PasswordEightLabel);
	PasswordsUnorderedList.appendChild(ListItemFourteen);
//	PasswordsUnorderedList.appendChild(EmptySpace);	
	
	document.getElementById('topDefineDescription').appendChild(WorkSpaceTitle);
	document.getElementById('topDefineDescription').appendChild(DescriptionArea);
	document.getElementById('topDefineDescription').appendChild(EmptySpace0);
	document.getElementById('topDefineDescription').appendChild(GeneralUnorderedList);
	document.getElementById('topDefineDescription').appendChild(EmptySpace1);
	document.getElementById('topDefineDescription').appendChild(MocasUnorderedList);
	document.getElementById('topDefineDescription').appendChild(EmptySpace2);
	document.getElementById('topDefineDescription').appendChild(PasswordsUnorderedList);

	document.getElementById('topDefineDescription').appendChild(Log);
	
}

function AboutUsDialog() {
	$( "#AboutUsDialog" ).dialog();
}

function UsernameDialog() {
	$( "#UsernameDialog" ).dialog();
}

function AccessLevelDialog() {
	$( "#ChangeUserDialog" ).dialog();
}

function ContactSupportDialog() {
	$( "#ContactSupportDialog" ).dialog();
}

function ChangeLanguageDialog() {
	$( "#ChangeLanguageDialog" ).dialog();
}

function AdminPageDialog() {
	$( "#AdminPageDialog" ).dialog();
}

function ErrorMessageDialog(Title,Message){
	$( "#ParameterChangeError" ).dialog();
	document.getElementById('ErrorDialogMessage').innerHTML = Message;
}

function FileActionsDialog(){
	document.getElementById('topDefineTable').innerHTML = '';
	document.getElementById('topDefineDescription').innerHTML = '';
	WorkSpaceTitle = document.createElement('p');
	WorkSpaceTitle.setAttribute('id','WorkSpaceTitle');
	WorkSpaceTitle.innerHTML = LanguageDict["FileActions"];
	
	DescriptionArea = document.createElement('tr');
	
	Description = document.createElement('p');
	Description.innerHTML = LanguageDict["FileActionsDescription"];
	Description.setAttribute('id','description');
	
	UnorderedList = document.createElement('ul');
	
	ListItemOne = document.createElement('li');
	ListItemTwo = document.createElement('li');
	ListItemThree = document.createElement('li');
	ListItemFour = document.createElement('li');
	
	RunDefault = document.createElement('input');
	RunDefault.type = 'submit';
	RunDefault.setAttribute('value','Load Default Values to Current Values');
	RunDefault.setAttribute('onclick',"SBSetDefaults()");
	
	RunFactory = document.createElement('input');
	RunFactory.type = 'submit';
	RunFactory.setAttribute('value','Load Factory Default to Current Values');
	RunFactory.setAttribute('onclick',"SBSetFactory()");
	
	SetDefault = document.createElement('input');
	SetDefault.type = 'submit';
	SetDefault.setAttribute('value','Copy Current Values to Default Values');
	SetDefault.setAttribute('onclick',"MakeDefaultFileActions()");
	
	SetFactory = document.createElement('input');
	SetFactory.type = 'submit';
	SetFactory.setAttribute('value','Copy Current Values to Factory Values');
	SetFactory.setAttribute('onclick',"MakeFactoryFileActions()");
	
	RunDefault.setAttribute('id','FileActionsButtonWorkSpace');
	RunFactory.setAttribute('id','FileActionsButtonWorkSpace');
	SetDefault.setAttribute('id','FileActionsButtonWorkSpace');
	SetFactory.setAttribute('id','FileActionsButtonWorkSpace');
	
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
	UnorderedList.appendChild(ListItemOne);
	UnorderedList.appendChild(ListItemTwo);
	
	if(Number(sessionStorage.getItem('AccessLevel')) > 7){
		UnorderedList.appendChild(ListItemFour);
	}
	
	if(Number(sessionStorage.getItem('AccessLevel')) > 4){
		UnorderedList.appendChild(ListItemThree);
	}
	
	ListItemOne.appendChild(RunDefault);
	ListItemTwo.appendChild(RunFactory);
	ListItemThree.appendChild(SetDefault);
	ListItemFour.appendChild(SetFactory);
	
	DescriptionArea.appendChild(Description);
	
}