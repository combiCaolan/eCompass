LabelDict = new Object();

LabelDict = {};

try {
	ParameterMain = sessionStorage.getItem('ParameterMain').split('\n');
	counter = 0;
	while (ParameterMain[counter] != undefined) {
		LabelDict[ParameterMain[counter].split(',')[0]] = ParameterMain[counter].split(',')[3];
		counter++;
	}
	function PostCompareFile() {
		var input = document.createElement('input');
		input.type = 'file';

		input.onchange = e => {
			// getting a hold of the file reference
			var file = e.target.files[0];
			// setting up the reader
			var reader = new FileReader();
			reader.readAsText(file, 'UTF-8');
			// here we tell the reader what to do when it's done reading...
			reader.onload = readerEvent => {
				var data = readerEvent.target.result; // this is the content!
				sessionStorage.setItem("CompareParametersFile", data);
				document.getElementById('ContentDiv').style.display = "block";
				document.getElementById('SecondFileName').innerHTML = input.value;
				document.getElementById('FirstFileName').innerHTML = sessionStorage.getItem('ParametersFileName');
				if (data == '') {
					return;
				}
			}
		}

		input.click();

	}
	function Compare() {
		DontRead = [];
		LinesInLeft = '';
		LinesInRight = '';
		CompareElementOne = sessionStorage.getItem('Parameters');
		CompareElementTwo = sessionStorage.getItem('CompareParametersFile');

		if (CompareElementOne == '' || CompareElementTwo == '') {
			alert('There seems to be a problem here - function not working.');
			return;
		} else {
			if (CompareElementOne == CompareElementTwo) {
				document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p class="identicalTag">Files Are Identical</p>';
			} else {

				splitValOne = sessionStorage.getItem('Parameters').split('\n');
				splitValTwo = sessionStorage.getItem('CompareParametersFile').split('\n');

				//Getting Parameters Used in first Val
				ValOneCounter = 0;
				ParametersUsedInFirstFile = [];
				while (typeof CompareElementOne.split('\n')[ValOneCounter] !== "undefined") {
					ParametersUsedInFirstFile.push(CompareElementOne.split('\n')[ValOneCounter].split(',')[0]);
					ValOneCounter++;
					LinesInLeft = ValOneCounter;
				}
				//Finished Getting Parameters Used in first Val

				//Getting Parameters Used in Second Val
				ValTwoCounter = 0;
				ParametersUsedInSecondFile = [];
				while (typeof CompareElementTwo.split('\n')[ValTwoCounter] !== "undefined") {
					ParametersUsedInSecondFile.push(CompareElementTwo.split('\n')[ValTwoCounter].split(',')[0]);
					ValTwoCounter++;
					LinesInRight = ValTwoCounter;
				}
				//Finished Getting Parameters Used in Second Val

				//Check for which parameters are not in both

				DRC = 0;
				while (ParametersUsedInFirstFile[DRC]) {
					if (ParametersUsedInSecondFile.includes(ParametersUsedInFirstFile[DRC])) {
					} else {
						DontRead.push(ParametersUsedInFirstFile[DRC]);
					}
					DRC++;
				}

				DRC = 0;
				while (ParametersUsedInSecondFile[DRC]) {
					if (ParametersUsedInFirstFile.includes(ParametersUsedInSecondFile[DRC])) {
					} else {
						DontRead.push(ParametersUsedInSecondFile[DRC]);
					}
					DRC++;
				}
				//Finished Check for which parameters are not in both

				//Remove Parameters
				RemoveTheseLines = [];


				FindLinesToRemoveCounter = 0;
				while (typeof splitValOne[FindLinesToRemoveCounter] !== "undefined") {
					if (DontRead.includes(splitValOne[FindLinesToRemoveCounter].split(',')[0])) {
						CompareElementOne = CompareElementOne.replace('\n' + splitValOne[FindLinesToRemoveCounter].toString(), '');
					}
					FindLinesToRemoveCounter++;
				}

				FindLinesToRemoveCounter = 0;
				while (typeof splitValTwo[FindLinesToRemoveCounter] !== "undefined") {
					if (DontRead.includes(splitValTwo[FindLinesToRemoveCounter].split(',')[0])) {
						CompareElementOne = CompareElementOne.replace('\n' + splitValTwo[FindLinesToRemoveCounter].toString(), '');
					}
					FindLinesToRemoveCounter++;
				}
				//Finished Remove Parameters

				//REMEMBER TO COUNT HOW MANY LINES IN BOTH FILES AND DISPLAY THEM
				counter = 0;
				LineNumber = 0;
				ValueCurrent = 1;
				Default = 2;
				Factory = 3;
				Min = 4;
				Max = 5;
				Units = 6;
				Scale = 7;
				UserRead = 8;
				UserWrite = 9;
				while (splitValOne[counter] && splitValTwo[counter]) {
					if (splitValOne[counter].split(',')[0] == splitValTwo[counter].split(',')[0]) {

						if (splitValOne[counter] == splitValTwo[counter]) {
							counter++;
						} else {
							//Checking Line
							d = 0;
							while (typeof splitValOne[counter].split(',')[d] !== "undefined" || typeof splitValTwo[counter].split(',')[d] !== "undefined") {
								if (splitValOne[counter].split(',')[d] == splitValTwo[counter].split(',')[d]) {
								} else {

									if (d == ValueCurrent) {
										document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p onclick="TreeViewClick(document.getElementById(`' + splitValOne[counter].split(',')[0] + '`),`' + splitValOne[counter].split(',')[0] + '`)" class="DifferentTag">[On Line ' + splitValOne[counter].split(',')[0] + ']' + LabelDict[splitValOne[counter].split(',')[0]] + ' the Current Value is different</p>';
									}

									if (d == Default) {
										document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p onclick="TreeViewClick(document.getElementById(`' + splitValOne[counter].split(',')[0] + '`),`' + splitValOne[counter].split(',')[0] + '`)" class="DifferentTag">[On Line ' + splitValOne[counter].split(',')[0] + ']' + LabelDict[splitValOne[counter].split(',')[0]] + ' the Default Value is different</p>';
									}

									if (d == Factory) {
										document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p onclick="TreeViewClick(document.getElementById(`' + splitValOne[counter].split(',')[0] + '`),`' + splitValOne[counter].split(',')[0] + '`)" class="DifferentTag">[On Line ' + splitValOne[counter].split(',')[0] + ']' + LabelDict[splitValOne[counter].split(',')[0]] + ' the Factory Value is different</p>';
									}

									if (d == Min) {
										document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p onclick="TreeViewClick(document.getElementById(`' + splitValOne[counter].split(',')[0] + '`),`' + splitValOne[counter].split(',')[0] + '`)" class="DifferentTag">[On Line ' + splitValOne[counter].split(',')[0] + ']' + LabelDict[splitValOne[counter].split(',')[0]] + ' the Min Value is different</p>';
									}

									if (d == Max) {
										document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p onclick="TreeViewClick(document.getElementById(`' + splitValOne[counter].split(',')[0] + '`),`' + splitValOne[counter].split(',')[0] + '`)" class="DifferentTag">[On Line ' + splitValOne[counter].split(',')[0] + ']' + LabelDict[splitValOne[counter].split(',')[0]] + ' the Max Value is different</p>';
									}
								}
								d++;
							}
							counter++;
						}
					} else {
						counter++;
					}
				}
			}
		}

		if (DontRead[0] !== undefined) {
			counter = 0;
			document.getElementById('AddParametersQuery').setAttribute('style', 'overflow:auto; height:200px; background:whitesmoke;');
			while (DontRead[counter] != undefined) {
				document.getElementById('AddParametersQuery').innerHTML = document.getElementById('AddParametersQuery').innerHTML + '<input type="submit" onclick="AddParameter(' + DontRead[counter] + ')", value="' + LabelDict[DontRead[counter]] + '"/> <br/> <br/>';
				counter++;
			}
			document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + ' Missing These Parameters ' + DontRead;
		}

	}

	function Clear() {
		document.getElementById('results').innerHTML = '';
		document.getElementById('AddParametersQuery').innerHTML = '';
	}
} catch (err) { }