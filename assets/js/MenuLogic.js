function ExitEcompass() {
	
	sessionStorage.clear();
	location.href = 'https://support.combilift.net';
}

function MenuLogic(){
	const urrentPage = window.location.pathname.split('/')[window.location.pathname.split('/').length-1];
	
	if(CurrentPage == 'frontpage.php'){
		document.getElementById('SearchIconButton').remove();	
		document.getElementById('SpecialBlocksButton').remove();
		
		SelectStyle = "background:darkgray; opacity:0.5;";
		document.getElementById('SaveFileButton').setAttribute('style',SelectStyle);
		document.getElementById('CloseFileButton').setAttribute('style',SelectStyle);
		document.getElementById('ErrorButton').setAttribute('style',SelectStyle);
		document.getElementById('FileActionsButton').setAttribute('style',SelectStyle);

		try{
			document.getElementById('SpecialBlocksButton').setAttribute('style',SelectStyle);
		}catch(err){
			
		}
		 
		Function = '';
		document.getElementById('SaveFileButton').setAttribute('onclick',null);
		document.getElementById('CloseFileButton').setAttribute('onclick',null);
		document.getElementById('ErrorButton').setAttribute('onclick',null);
		document.getElementById('FileActionsButton').setAttribute('onclick',null);
		try{
			document.getElementById('SpecialBlocks').setAttribute('onclick',null);
		}catch(err){
		
		}
		

		if(Number(sessionStorage.getItem('AccessLevel')) == 8){
			InProgressSelectStyle = "background:yellow; opacity:0.5;";
			WorkMsg = 'This function is being worked on by combilift - please rememeber this while using';
		}else{
			if(document.getElementById('SearchIconButton')){
				document.getElementById('SearchIconButton').remove();
			}
			document.getElementById('NewFileButton').remove();
		}
	}

	if(CurrentPage == 'editor.php'){
		if(ErrorsPresent == false){
			SelectStyle = "background:darkgray; opacity:0.5;";
			document.getElementById('ErrorButton').setAttribute('style',SelectStyle);
			Function = '';
			document.getElementById('ErrorButton').setAttribute('onclick',null);
		}else{
			document.getElementById('ErrorButton').setAttribute('onclick','ErrorAlertDialog()');
			
			//List Problems
			//Min Problems
			UnorderedList = document.createElement('ul');
			counter = 0;
			while(MinError[counter] != undefined){
				MinLink = document.createElement('li');
				if(LabelDict[Number(MinError[counter])] != undefined){
					MinLink.innerHTML = LabelDict[Number(MinError[counter])];
					Element = document.getElementById(Number(MinError[counter]));
					if(Element != null){	
						LineNumber = Number(MinError[counter])
						MinLink.setAttribute('onclick','DynamicMenuOpenTool(' + LineNumber + ');');
						if(LineNumber > 64){
							UnorderedList.appendChild(MinLink);
						}
					}
				}
				counter++;
			}
			document.getElementById('MinErrorsList').appendChild(UnorderedList);
			
			if(MinError.length == 0){
				document.getElementById('MinErrorsList').setAttribute('style','display:none;');
			}
			
			//Max Problems
			UnorderedList = document.createElement('ul');
			counter = 0;
			while(MaxError[counter] != undefined){
				MaxLink = document.createElement('li');
				if(LabelDict[Number(MaxError[counter])] != undefined){
					MaxLink.innerHTML = LabelDict[Number(MaxError[counter])];
					Element = document.getElementById(Number(MaxError[counter]));
					if(Element != null){
						LineNumber = Number(MaxError[counter]);
						MaxLink.setAttribute('onclick','DynamicMenuOpenTool(' + LineNumber + ');');
						if(LineNumber > 64){
							UnorderedList.appendChild(MaxLink);
						}
					}
				}
				counter++;
			}
			
			if(MaxError.length == 0){
				document.getElementById('MaxErrorsList').setAttribute('style','display:none;');
			}
			
			document.getElementById('MaxErrorsList').appendChild(UnorderedList);
		}
		
		
		document.getElementById('SaveFileButton').setAttribute('onclick',document.getElementById('SaveFileButton').getAttribute('onclick')); 
		if(Number(sessionStorage.getItem('AccessLevel')) == 8){
			InProgressSelectStyle = "background:yellow; opacity:0.5;";
			document.getElementById('SpecialBlocksButton').setAttribute('style',InProgressSelectStyle);
		}else{
			document.getElementById('NewFileButton').remove();
		}
		
		if(Number(sessionStorage.getItem('AccessLevel')) < 7){
			document.getElementById('SpecialBlocksButton').remove();
		}
	}
}

MenuLogic();