setInterval(function() {
	if(sessionStorage.getItem('AccessLevel') != AccessLevelForUser){
		alert('Variables necessary for basic functionality have been messed with.');
		location.reload();
	}
}, 10 * 1000); // 10 * 1000 milsec


function LoadDisplay(){
	document.getElementById('LoadingScreen').setAttribute('style','display:none;');
	document.getElementById('Container').setAttribute('style','display:block;');
}

if(!sessionStorage.getItem('Parameters')){
	location = sessionStorage.getItem('ServerPath') + '/ecompass/index.php';
}

ChangesMadePreDownload = false;

//SETS ErrorCount TO FALSE -- USED IN integrity check later on to allow user to export or not to export file.

var ErrorCount = false;

//Opening Directory for comparing files
ParameterDirectoryPath = String(sessionStorage.getItem('ServerPath') + '/ecompass/Settings-files/' + sessionStorage.getItem('APIV')  + '/' + localStorage.getItem('Language') + '/Description_Main.txt');
var rawFile = new XMLHttpRequest();
rawFile.open("GET", ParameterDirectoryPath, false);
rawFile.onreadystatechange = function ()
{
	if(rawFile.readyState === 4)
	{
		if(rawFile.status === 200 || rawFile.status == 0)
		{
			var data = rawFile.responseText;
			//sessionStorage.setItem('ParametersDescription',data);
		}
	}
}
rawFile.send(null);

//Setting path to the backup on the sofware

var UserBackupDirectory = 'https://support.combilift.com/wptest/ecompass/User_Backup';



//IDENTIFYING LANGUAGE PREFERNCE FILE PATH

LanguagePreferenceFile = 'https://support.combilift.com/wptest/ecompass/UserPreferences.txt';


//List of parameters to remove from file - all parameter indexs or parameter lines listed here will be removed on saving the file

removedParameters = [];

removedParametersCounters = [];



//Grouping Custom Parameters Together & Declaring Parameter Type here
var ParametersToBeRemoved = [];

var CustomParametersSwitch = ['115','130','135','138','141','143','145','146','147','148','159','160','175','205','221','222','239','240','257','258','275','276','293','294','311','312','329','330','347','348','365','366','383','384','401','402','472','487','505','506','522','527','552','553','600','617','646','654','663','665','690','703','716','729','742','755','941'];

//999 Parameters File
var BitParameters999 = [];
Ninefile = sessionStorage.getItem('Bit999');

counter = 0;
while(Ninefile.split('\n')[counter] !== undefined){
	if(Ninefile.split('\n')[counter][0] == '#'){
		BitParameters999.push(Ninefile.split('\n')[counter].replace('#','').replace(/\r/g,''));
	}
	counter++;
}

//1000 Parameters File
var BitParameters1000 = [];
Thousandfile = sessionStorage.getItem('Bit1000');

counter = 0;
while(Thousandfile.split('\n')[counter] !== undefined){
	if(Thousandfile.split('\n')[counter][0] == '#'){
		BitParameters1000.push(Thousandfile.split('\n')[counter].replace('#','').replace(/\r/g,''));
	}
	counter++;
}

CustomParametersDropDown = [];
ParameterMain = sessionStorage.getItem('ParameterMain');

counter = 0;
while(ParameterMain.split('\n')[counter] !== undefined){
	if(ParameterMain.split('\n')[counter].split(',')[2] != '0'){
		if(BitParameters999.includes(Number(ParameterMain.split('\n')[counter].split(',')[0])) || BitParameters1000.includes(Number(ParameterMain.split('\n')[counter].split(',')[0]))){
			console.log(BitParameters999.includes(Number(ParameterMain.split('\n')[counter].split(',')[0])));
		}else{
			CustomParametersDropDown.push(ParameterMain.split('\n')[counter].split(',')[0]);
		}
	}
	counter++;
}

HydraulicBitCustomList = ['221','222','239','240','257','258','275','276','293','294','311','312','329','330','347','348','365','366','383','384','401','402','565'];

HydFunctionIDList = ['220','238','256','274','292','310','328','346','364','382','400'];

PasswordList = ['104','105','106','107','108','109','110','111'];

HydFunctionsOutputSetup = ['222','240','258','276','294','312','330','348','366','384','402','565'];

HydFunctionsInputSetup = ['221','239','257','275','293','311','329','347','365','383','401'];

MoCAS = ['37','38','39','40','41','42','43','44','45','46','47','48'];