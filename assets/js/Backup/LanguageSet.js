if(localStorage.getItem('Language')){
	CurrentLanguage = localStorage.getItem('Language').replace('\r','');
	CurrentLanguageDirectory = sessionStorage.getItem('ServerPath') + String('/ecompass/Settings-files/' + sessionStorage.getItem('APIV') + '/' + localStorage.getItem('Language') +  '/LANGUAGE_' + localStorage.getItem('Language') + '.txt');
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", CurrentLanguageDirectory, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				LanguageFile = rawFile.responseText;
				//LanguageFileRead - Setting to sessionStorage so can read later and asign global variables
				sessionStorage.setItem('LanguageFileContents',LanguageFile);	
			}
		}
	}
	rawFile.send(null);
}