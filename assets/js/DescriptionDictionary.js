SpecialDescriptionsDict = {};
SpecialDescription = sessionStorage.getItem('Description_special');

counter = 0;
StartIndex = SpecialDescription.split('\n')[counter].split(',')[0];
while(SpecialDescription.split('\n')[counter] != undefined){
	if(SpecialDescription.split('\n')[counter][0] == '#'){
			ParameterIndex = SpecialDescription.split('\n')[counter].replace('#','').replace(',','.');
			counter++;
			DescriptionContent = '';
//			console.log(ParameterIndex);
			while(SpecialDescription.split('\n')[counter] != undefined && SpecialDescription.split('\n')[counter][0] != '#'){
//				console.log(SpecialDescription.split('\n')[counter]);
				DescriptionContent = DescriptionContent + SpecialDescription.split('\n')[counter].toString() + '\n';
				counter++;
			}
			//SpecialDescriptionsDict[Number(ParameterIndex)] = DescriptionContent;
			SpecialDescriptionsDict[ParameterIndex] = DescriptionContent;
//			console.log(SpecialDescriptionsDict[ParameterIndex]);
//			console.log(DescriptionContent);
	}
}

MainDescriptionsDict = {};

Description = sessionStorage.getItem('DescriptionMain');
Description = Description.replace(/undefined/g,'')
counter = 0;
while(Description.split('\n')[counter] != undefined){
	if(Description.split('\n')[counter][0] == '#'){
		Index = Description.split('\n')[counter].replace('#','');
		IndexDescription = '';
		counter++;
		while(Description.split('\n')[counter] != undefined && Description.split('\n')[counter] != "undefined" && Description.split('\n')[counter][0] != '#'){
			IndexDescription = IndexDescription + '\n' + Description.split('\n')[counter];
			counter++;
		}
		MainDescriptionsDict[Index] = '#' + Index.replace(/undefined/g,'') + IndexDescription.replace(/undefined/g,'') + '\n';
	}else{
		counter++;
	}
}