// /**
//  * CompleteErrorCheck.js
//  * 
//  * Checks all parameters for values outside their min/max bounds and displays errors in the UI.
//  * Highlights parameters that are out of range and allows navigation to them.
//  * 
//  * Best practices:
//  * - Uses let/const for variable declarations
//  * - Adds docstrings and inline comments
//  * - Uses descriptive variable names
//  * - Handles errors gracefully
//  */

// /**
//  * Checks parameter values against their min and max limits.
//  * Populates the error report UI with any out-of-range parameters.
//  */
// function CompleteErrorCheck() {
//     // Build a dictionary of parameter labels from ParameterMain
//     const labelDict = {};
//     const parameterMain = (sessionStorage.getItem('ParameterMain') || '').split('\n');
//     for (const line of parameterMain) {
//         const parts = line.split(',');
//         if (parts.length > 3) {
//             labelDict[parts[0]] = parts[3];
//         }
//     }

//     // Arrays to hold parameter IDs with errors
//     const maxErrors = [];
//     const minErrors = [];

//     // Check each parameter for min/max violations
//     const parameters = (sessionStorage.getItem('Parameters') || '').split('\n');
//     for (const line of parameters) {
//         const parts = line.split(',');
//         if (parts.length > 5) {
//             const index = parts[0];
//             const currentValue = Number(parts[1]);
//             const min = Number(parts[4]);
//             const max = Number(parts[5]);
//             if (currentValue > max) {
//                 maxErrors.push(index);
//             }
//             if (currentValue < min) {
//                 minErrors.push(index);
//             }
//         }
//     }

//     // Create and populate the error report list
//     const errorReportElem = document.getElementById('ErrorReport');
//     if (!errorReportElem) return;
//     errorReportElem.innerHTML = ''; // Clear previous errors
//     const unorderedList = document.createElement('ul');
//     errorReportElem.appendChild(unorderedList);

//     // Add max errors to the list
//     for (const index of maxErrors) {
//         const option = document.createElement('li');
//         option.innerHTML = labelDict[index] || index;
//         option.title = 'Out of Max Value';
//         option.style = 'color:blue; text-decoration:underline;';
//         option.onclick = () => TreeViewClick(document.getElementById(index), index);
//         unorderedList.appendChild(option);
//     }

//     // Add min errors to the list
//     for (const index of minErrors) {
//         const option = document.createElement('li');
//         option.innerHTML = labelDict[index] || index;
//         option.title = 'Out of Min Value';
//         option.style = 'color:blue; text-decoration:underline;';
//         option.onclick = () => TreeViewClick(document.getElementById(index), index);
//         unorderedList.appendChild(option);
//     }

//     // If no errors, show a success message
//     if (maxErrors.length === 0 && minErrors.length === 0) {
//         const allGoodTitle = document.createElement('li');
//         allGoodTitle.innerHTML = 'No Parameter Errors - All Good!';
//         unorderedList.appendChild(allGoodTitle);
//     }
// }

// // Run the error check on script load
// CompleteErrorCheck();