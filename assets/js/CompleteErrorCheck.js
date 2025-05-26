function CompleteErrorCheck(){
	var LabelDict = new Object();

	var LabelDict = {};

	ParameterMain = sessionStorage.getItem('ParameterMain').split('\n');
	counter = 0;
	while(ParameterMain[counter] != undefined){
		LabelDict[ParameterMain[counter].split(',')[0]] = ParameterMain[counter].split(',')[3];
		counter++;
	}
			
	MaxErrors = [];
	MinErrors = [];

	counter = 0;
	Parameters = sessionStorage.getItem('Parameters');
	while(Parameters.split('\n')[counter] != undefined){
		Line = Parameters.split('\n')[counter];
		//console.log(Line.replace(/,/g,''));
		Index = Parameters.split('\n')[counter].split(',')[0];
		CurrentValue = Parameters.split('\n')[counter].split(',')[1];
		Min = Parameters.split('\n')[counter].split(',')[4];
		Max = Parameters.split('\n')[counter].split(',')[5];
		
		if(Number(CurrentValue) > Number(Max)){
			MaxErrors.push(Index);
		}
		
		if(Number(CurrentValue) < Number(Min)){
			MinErrors.push(Index);
		}
		counter++;
	}

	UnorderedList = document.createElement('ul');
	document.getElementById('ErrorReport').appendChild(UnorderedList);

	//Fill Error Report
	counter = 0;
	while(MaxErrors[counter] != undefined){
		Option = document.createElement('li');
		Option.innerHTML = LabelDict[MaxErrors[counter]];
		Option.setAttribute('title','Out of Max Value');
		Option.setAttribute('style','color:blue; text-decoration:underline;');
		Option.setAttribute("onclick","TreeViewClick(document.getElementById('" + MaxErrors[counter] + "'),'" + MaxErrors[counter] + "')");
		UnorderedList.appendChild(Option);
		counter++;
	}

	counter = 0;
	while(MinErrors[counter] != undefined){
		Option = document.createElement('li');
		Option.innerHTML = LabelDict[MinErrors[counter]];
		Option.setAttribute('title','Out of Min Value');
		Option.setAttribute('style','color:blue; text-decoration:underline;');
		Option.setAttribute("onclick","TreeViewClick(document.getElementById('" + MinErrors[counter] + "'),'" + MinErrors[counter] + "')");
		UnorderedList.appendChild(Option);
		counter++;
	}


	if(MaxErrors[0] == undefined && MinErrors[0] == undefined){
		AllGoodTitle = document.createElement('li');
		AllGoodTitle.innerHTML = 'No Paramter Errors - All Good!';
		UnorderedList.appendChild(AllGoodTitle);
	}
}

CompleteErrorCheck();