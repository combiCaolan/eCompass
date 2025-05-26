//needed for removing from array
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

//Being used in the export tick box functionality - adds parameter number to array - which all numbers in array will be removed from file at export
function exportonchange(LineNumber,checkboxinput) {
	//console.log(LineNumber);
	//console.log(checkboxinput);
	Parameters = sessionStorage.getItem('Parameters').split('\n');
	var counter = 0;
	while(typeof Parameters[counter]!== "undefined"){
		if(Parameters[counter].split(',')[0] == LineNumber){
			//console.log(Parameters[counter]);
			removedParameters.push(Parameters[counter]);
			break;
		}
		counter++;
	}
	
	
	if(removedParametersCounters.includes(Parameters[counter]) == false){
		CancelledParameter = Parameters[counter];
		//console.log('you unchecked the export box');
		removedParametersCounters.push(Parameters[counter]);
		document.getElementById('topDefine').setAttribute('style','opacity:0.4;');
	}else{
		//remove from array list 
		//console.log('removing from list');
		removeA(removedParametersCounters,Parameters[counter]);
		document.getElementById('topDefine').setAttribute('style','opacity:1;');
	}
	
}