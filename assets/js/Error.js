/**
 * Checks if a value is below its minimum.
 * @param {number} value
 * @param {number} min
 * @returns {boolean}
 */
function isBelowMin(value, min) {
    return value < min;
}

/**
 * Checks if a value is above its maximum.
 * @param {number} value
 * @param {number} max
 * @returns {boolean}
 */
function isAboveMax(value, max) {
    return value > max;
}

/**
 * Checks all parameters for min/max violations.
 * @param {string} parametersStr - CSV string from sessionStorage.
 * @param {Object} readPermissionDict - Permissions dictionary.
 * @param {number} accessLevelForUser - User's access level.
 * @returns {{ minError: string[], maxError: string[], errorsPresent: boolean }}
 */
export function checkParameterErrors(parametersStr, readPermissionDict, accessLevelForUser) {
    const minError = [];
    const maxError = [];
    let errorsPresent = false;

    if (!parametersStr) return { minError, maxError, errorsPresent };

    const parameters = parametersStr.split('\n');
    for (const paramLine of parameters) {
        const parts = paramLine.split(',');
        const paramId = parts[0];
        if (!paramId) continue;

        if (Number(readPermissionDict[paramId]) <= Number(accessLevelForUser)) {
            const value = Number(parts[1]);
            const min = Number(parts[4]);
            const max = Number(parts[5]);

            if (!isNaN(value) && !isNaN(min) && isBelowMin(value, min)) {
                minError.push(paramId);
                errorsPresent = true;
            }
            if (!isNaN(value) && !isNaN(max) && isAboveMax(value, max)) {
                maxError.push(paramId);
                errorsPresent = true;
            }
        }
    }
    return { minError, maxError, errorsPresent };
}

// Example usage:
const { minError, maxError, errorsPresent } = checkParameterErrors(
    sessionStorage.getItem('Parameters'),
    ReadPermissionDict,
    AccessLevelForUser
);
// You can now use minError, maxError, errorsPresent as needed.