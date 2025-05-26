//Setting Basic Language Structure for workspace
if(sessionStorage.getItem('LanguageFileContents')){
	var LanguageDict = new Object();

	var LanguageDict = {};

	LanguageMap = sessionStorage.getItem('LanguageFileContents').split('\n');
	counter = 0;
	while(LanguageMap[counter] != undefined){
		CurrentLine = LanguageMap[counter].split(':');
		LanguageDict[CurrentLine[0]] = CurrentLine[1];
		counter++;
	}
}
