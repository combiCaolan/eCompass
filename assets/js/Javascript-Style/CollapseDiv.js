/*START OF COLLAPSEDIV.JS*/

//This is simply the code for the Parameters/settings tab to drop down the menu options when clicked

function DropDownUni(DivID,DivToToggle) {
	if(document.getElementById(DivID)){
		if(document.getElementById(DivID).style.display === 'none'){
			$("#"+ DivID).slideToggle();
			document.getElementById(DivToToggle).value = '\u25B2';
		}else{
			$("#" + DivID).slideToggle();
			document.getElementById(DivToToggle).value = '\u25BC';
		}
	}
}


function DropDownMachineDetails() {
	//console.log('Function Discontinued');
}
	
function DropDownFileDetails() {
	//console.log('Function Discontinued');
}

function DropDownSoftware() {
	//console.log('Function Discontinued');
}
	
function DropDownService() {
	//console.log('Function Discontinued');
} 
	
function DropDownParameters() {
	//console.log('Function Discontinued');
}
	
function DropDownMoCAS() {
	//console.log('Function Discontinued');
}

function UniversalDropDown(ID){
	$("#ParametersDiv" + ID).slideToggle();
}

/*END OF COLLAPSEDIV.JS*/
