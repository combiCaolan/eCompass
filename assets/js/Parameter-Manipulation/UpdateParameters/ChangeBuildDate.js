function ChangeBuildDate(){
	if(document.getElementById('UpdateBuildDate').value != ""){
		DateTimeValue = document.getElementById('UpdateBuildDate').value;
		newDate = new Date(document.getElementById('UpdateBuildDate').value);
		EpochTime = newDate.getTime();
		EpochTime = EpochTime / 1000
		UpdateFactoryValue('5',EpochTime.toString());
		alert('Updated Build Date');
	}else{
		alert("Please choose a build date for the truck.");
	}
}

function ChangeDealerDate(){
	if(document.getElementById('UpdateDealerDate').value != ""){
		DateTimeValue = document.getElementById('UpdateDealerDate').value;
		newDate = new Date(document.getElementById('UpdateDealerDate').value);
		EpochTime = newDate.getTime();
		EpochTime = EpochTime / 1000
		UpdateMinValue('5',EpochTime.toString());
		alert('Updated Dealer Date');
	}else{
		alert("Please choose a dealer date for the truck.");
	}
}


function ChangeCustomerDate(){
	if(document.getElementById('UpdateCustomerDate').value != ""){
		DateTimeValue = document.getElementById('UpdateCustomerDate').value;
		newDate = new Date(document.getElementById('UpdateCustomerDate').value);
		EpochTime = newDate.getTime();
		EpochTime = EpochTime / 1000
		UpdateMaxValue('5',EpochTime.toString());
		alert('Updated Customer Date');
	}else{
		alert("Please choose a customer date for the truck.");
	}
}