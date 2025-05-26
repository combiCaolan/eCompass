<?php include_once('includes/Verify.php'); ?>

<!DOCTYPE html>
<html>
	<head>
		<?php include_once('includes/headContents.html'); ?>
		</head>
	<body>
	<?php include_once('includes/EmptyWebHeader.html'); ?>

	<div id="row_usr">
		<div id="right_row">
			<img id="LogoHead" src="https://support.combilift.net/wp-content/uploads/2020/09/Combilift-Master-logo-opt.png">
			<br/>
			<h1 style="font-weight:100;" id="WelcomeBack">COMBI_PAR.clp<h1 style="font-weight:100;" id="ConcatName"></h1></h1> <br/><br/>
			<button id="$start">Download file</button>
		</div>
	</div>
	<script>

		//FORM FOR LOG REGISTRATION
		UserParametersFileDict = {};
		counter = 0;
		while(sessionStorage.getItem('Parameters').split('\n')[counter] != undefined)
		{
			UserParametersFileDict[sessionStorage.getItem('Parameters').split('\n')[counter].split(',')[0]] = sessionStorage.getItem('Parameters').split('\n')[counter];
			counter++;
		}
		
		EmptyDiv = document.createElement('div');
		EmptyDiv.setAttribute('style','display:none;')
		
		Form = document.createElement('form');
		Form.setAttribute('action','includes/openfile.php');
		Form.setAttribute('method','POST');
		Form.setAttribute('name','LogRegForm');
		
		Model = document.createElement('input');
		Model.type = 'text';
		Model.setAttribute('name','Model');
		Model.value = UserParametersFileDict[2].split(',')[3];
		
		FileName = document.createElement('input');
		FileName.type = 'text';
		FileName.setAttribute('name','FileName');
		
		FilePathLength = sessionStorage.getItem('ParametersFileName').toString().split('\\').length - 1;
		FilePath = sessionStorage.getItem('ParametersFileName').split('\\')[FilePathLength];
		FileName.value = FilePath;
		
		Form.appendChild(FileName);
		
		SerialNumber = document.createElement('input');
		SerialNumber.type = 'text';
		SerialNumber.setAttribute('name','SerialNumber');
		SerialNumber.value = UserParametersFileDict[4].split(',')[3];
		
		Form.appendChild(SerialNumber);
		
		UserName = document.createElement('input');
		UserName.type = 'text';
		UserName.setAttribute('name','Username');
		UserName.value = sessionStorage.getItem('loggedinusername');
		
		Form.appendChild(UserName);

		Useremail = document.createElement('input');
		Useremail.type = 'text';
		Useremail.setAttribute('name','Useremail');
		Useremail.value = sessionStorage.getItem('loggedinemail');
					
		Form.appendChild(Useremail);

		AccessLevel = document.createElement('input');
		AccessLevel.type = 'text';
		AccessLevel.setAttribute('name','AccessLevel');
		AccessLevel.value = sessionStorage.getItem('AccessLevel');
		
		Form.appendChild(AccessLevel);
		
		ActionInput = document.createElement('input');
		ActionInput.type = 'text';
		ActionInput.setAttribute('name','ActionInput');
		ActionInput.value = 'Download';
		
		Form.appendChild(ActionInput);
		
		SubmitForm = document.createElement('input');
		SubmitForm.type = 'submit';
		
		Form.appendChild(SubmitForm);
		
		EmptyDiv.appendChild(Form);
		document.getElementById('myTopnav').appendChild(EmptyDiv);
		
//		SubmitForm.click();

</script>
    <script src="assets/js/download.js"></script>
    <script>
      $start.onclick = () => {
		
        const blob = new Blob([sessionStorage.getItem('Parameters').replace(/^\s*[\r\n]/gm, '')],{type: 'text/plain'})
		download(blob, "COMBI_PAR.clp", "text/plain");

		SubmitForm.click();
      }
    </script>



	</body>

</html>