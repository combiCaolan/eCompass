/*START OF COLLAPSEDIV.JS*/

// Toggle a div and update the toggle button's arrow direction
function DropDownUni(DivID, DivToToggle) {
    const div = document.getElementById(DivID);
    const toggle = document.getElementById(DivToToggle);
    if (div && toggle) {
        $("#"+DivID).slideToggle();
        toggle.value = (div.style.display === 'none') ? '\u25B2' : '\u25BC';
    }
}

// Universal dropdown for parameter divs
function UniversalDropDown(ID) {
    $("#ParametersDiv" + ID).slideToggle();
}

/*END OF COLLAPSEDIV.JS*/