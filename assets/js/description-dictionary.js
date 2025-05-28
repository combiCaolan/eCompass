/**
 * DescriptionDictionary.js
 * 
 * Builds dictionaries for parameter descriptions from sessionStorage.
 * - MainDescriptionsDict: maps parameter indices to their main descriptions.
 * - SpecialDescriptionsDict: maps parameter indices to their special descriptions.
 * 
 * Best practices:
 * - Uses let/const for variable declarations
 * - Adds docstrings and inline comments
 * - Uses descriptive variable names
 * - Handles errors gracefully
 */

let SpecialDescriptionsDict = {};
let MainDescriptionsDict = {};

try {
    // Build SpecialDescriptionsDict from sessionStorage
    const specialDescription = sessionStorage.getItem('Description_special') || '';
    let counter = 0;
    while (specialDescription.split('\n')[counter] !== undefined) {
        const line = specialDescription.split('\n')[counter];
        if (line && line[0] === '#') {
            const parameterIndex = line.replace('#', '').replace(',', '.');
            counter++;
            let descriptionContent = '';
            while (
                specialDescription.split('\n')[counter] !== undefined &&
                specialDescription.split('\n')[counter][0] !== '#'
            ) {
                descriptionContent += specialDescription.split('\n')[counter].toString() + '\n';
                counter++;
            }
            SpecialDescriptionsDict[parameterIndex] = descriptionContent;
        } else {
            counter++;
        }
    }

    // Build MainDescriptionsDict from sessionStorage
    let description = sessionStorage.getItem('DescriptionMain') || '';
    description = description.replace(/undefined/g, '');
    counter = 0;
    while (description.split('\n')[counter] !== undefined) {
        const line = description.split('\n')[counter];
        if (line && line[0] === '#') {
            const index = line.replace('#', '');
            let indexDescription = '';
            counter++;
            while (
                description.split('\n')[counter] !== undefined &&
                description.split('\n')[counter] !== "undefined" &&
                description.split('\n')[counter][0] !== '#'
            ) {
                indexDescription += '\n' + description.split('\n')[counter];
                counter++;
            }
            MainDescriptionsDict[index] = '#' + index.replace(/undefined/g, '') + indexDescription.replace(/undefined/g, '') + '\n';
        } else {
            counter++;
        }
    }
} catch (err) {
    // Handle errors silently or log if needed
}