import { checkParameterErrors } from './error.js';

/**
 * MenuLogic.js
 * 
 * Handles dynamic menu logic and UI state for eCompass based on the current page and user access level.
 * Uses best practices for variable naming, code structure, and documentation.
 */

/**
 * Clears session and redirects to support site.
 */
function ExitEcompass() {
    sessionStorage.clear();
    location.href = 'https://support.combilift.net';
}

/**
 * Applies menu logic and UI changes based on the current page and error state.
 */
function MenuLogic() {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'frontpage.php') {
        // Remove or disable certain buttons on the front page
        const SelectStyle = "background:darkgray; opacity:0.5;";
        try { document.getElementById('SearchIconButton').remove(); } catch (e) {}
        try { document.getElementById('SpecialBlocksButton').remove(); } catch (e) {}

        document.getElementById('SaveFileButton').setAttribute('style', SelectStyle);
        document.getElementById('CloseFileButton').setAttribute('style', SelectStyle);
        document.getElementById('ErrorButton').setAttribute('style', SelectStyle);
        document.getElementById('FileActionsButton').setAttribute('style', SelectStyle);

        try {
            document.getElementById('SpecialBlocksButton').setAttribute('style', SelectStyle);
        } catch (err) {}

        document.getElementById('SaveFileButton').setAttribute('onclick', null);
        document.getElementById('CloseFileButton').setAttribute('onclick', null);
        document.getElementById('ErrorButton').setAttribute('onclick', null);
        document.getElementById('FileActionsButton').setAttribute('onclick', null);
        try {
            document.getElementById('SpecialBlocks').setAttribute('onclick', null);
        } catch (err) {}

        if (Number(sessionStorage.getItem('AccessLevel')) === 8) {
            const InProgressSelectStyle = "background:yellow; opacity:0.5;";
            const WorkMsg = 'This function is being worked on by combilift - please remember this while using';
            document.getElementById('SpecialBlocksButton').setAttribute('style', InProgressSelectStyle);
        } else {
            try { document.getElementById('SearchIconButton').remove(); } catch (e) {}
            try { document.getElementById('NewFileButton').remove(); } catch (e) {}
        }
    }

    if (currentPage === 'parameter-editor.html') {
        if (ErrorsPresent === false) {
            const SelectStyle = "background:darkgray; opacity:0.5;";
            document.getElementById('ErrorButton').setAttribute('style', SelectStyle);
            document.getElementById('ErrorButton').setAttribute('onclick', null);
        } else {
            document.getElementById('ErrorButton').setAttribute('onclick', 'ErrorAlertDialog()');

            // List Min Errors
            let UnorderedList = document.createElement('ul');
            let counter = 0;
            while (MinError[counter] !== undefined) {
                const MinLink = document.createElement('li');
                if (LabelDict[Number(MinError[counter])] !== undefined) {
                    MinLink.innerHTML = LabelDict[Number(MinError[counter])];
                    const Element = document.getElementById(Number(MinError[counter]));
                    if (Element !== null) {
                        const LineNumber = Number(MinError[counter]);
                        MinLink.setAttribute('onclick', 'DynamicMenuOpenTool(' + LineNumber + ');');
                        if (LineNumber > 64) {
                            UnorderedList.appendChild(MinLink);
                        }
                    }
                }
                counter++;
            }
            document.getElementById('MinErrorsList').appendChild(UnorderedList);

            if (MinError.length === 0) {
                document.getElementById('MinErrorsList').setAttribute('style', 'display:none;');
            }

            // List Max Errors
            UnorderedList = document.createElement('ul');
            counter = 0;
            while (MaxError[counter] !== undefined) {
                const MaxLink = document.createElement('li');
                if (LabelDict[Number(MaxError[counter])] !== undefined) {
                    MaxLink.innerHTML = LabelDict[Number(MaxError[counter])];
                    const Element = document.getElementById(Number(MaxError[counter]));
                    if (Element !== null) {
                        const LineNumber = Number(MaxError[counter]);
                        MaxLink.setAttribute('onclick', 'DynamicMenuOpenTool(' + LineNumber + ');');
                        if (LineNumber > 64) {
                            UnorderedList.appendChild(MaxLink);
                        }
                    }
                }
                counter++;
            }

            if (MaxError.length === 0) {
                document.getElementById('MaxErrorsList').setAttribute('style', 'display:none;');
            }

            document.getElementById('MaxErrorsList').appendChild(UnorderedList);
        }

        document.getElementById('SaveFileButton').setAttribute(
            'onclick',
            document.getElementById('SaveFileButton').getAttribute('onclick')
        );

        if (Number(sessionStorage.getItem('AccessLevel')) === 8) {
            const InProgressSelectStyle = "background:yellow; opacity:0.5;";
            document.getElementById('SpecialBlocksButton').setAttribute('style', InProgressSelectStyle);
        } else {
            try { document.getElementById('NewFileButton').remove(); } catch (e) {}
        }

        if (Number(sessionStorage.getItem('AccessLevel')) < 7) {
            try { document.getElementById('SpecialBlocksButton').remove(); } catch (e) {}
        }
    }
}

// Run menu logic on script load
MenuLogic();