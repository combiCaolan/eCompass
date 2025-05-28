/**
 * Error.js
 * 
 * Checks for parameter values outside their min/max bounds on startup.
 * Populates MinError and MaxError arrays and sets ErrorsPresent flag.
 * 
 * Best practices:
 * - Uses let/const for variable declarations
 * - Adds docstrings and inline comments
 * - Uses descriptive variable names
 * - Handles errors gracefully
 */

let ErrorsPresent = false;
let MinError = [];
let MaxError = [];

/**
 * Checks all parameters for min/max violations on startup.
 * Populates MinError and MaxError arrays and sets ErrorsPresent flag.
 */
function OnStartupErrorCheck() {
    ErrorsPresent = false;
    MinError = [];
    MaxError = [];

    const parameters = (sessionStorage.getItem('Parameters') || '').split('\n');
    for (let i = 0; i < parameters.length; i++) {
        const parts = parameters[i].split(',');
        if (!parts[0]) continue;

        // Check read permission
        if (Number(ReadPermissionDict[parts[0]]) <= Number(AccessLevelForUser)) {
            // Min check
            if (parts[4] !== undefined && parts[1] !== undefined) {
                if (Number(parts[1]) < Number(parts[4])) {
                    MinError.push(parts[0]);
                    ErrorsPresent = true;
                }
            }
            // Max check
            if (parts[5] !== undefined && parts[1] !== undefined) {
                if (Number(parts[1]) > Number(parts[5])) {
                    MaxError.push(parts[0]);
                    ErrorsPresent = true;
                }
            }
        }
    }
}