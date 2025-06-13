import sessionStorageService from "../modules/sessionStorageService.js";
import { parameterchange } from "../Parameter-Manipulation/UpdateParameters/parameter-change.js";

/**
 * Get the unit for a parameter from the units directory.
 * @param {string} paramUnitKey - The key to look up in the units directory.
 * @param {string} unitsDirectoryRaw - The raw units directory string.
 * @returns {string}
 */
function getUnitForParameter(paramUnitKey, unitsDirectoryRaw) {
    if (!unitsDirectoryRaw) return 'no units';
    const unitsDirectory = unitsDirectoryRaw.split('\n');
    for (const line of unitsDirectory) {
        const [unit, key] = line.split(',');
        if (key && key.replace('\r', '') === paramUnitKey) {
            return unit;
        }
    }
    return 'no units';
}

/**
 * Create a value field row for the parameter card.
 * @param {Object} opts
 * @param {string} opts.labelText
 * @param {number|string} opts.value
 * @param {string} opts.id
 * @param {string} opts.onChangeType
 * @param {boolean} opts.editable
 * @param {string} opts.unit
 * @param {number} opts.scale
 * @param {number} opts.index
 * @param {Array} opts.lineArr
 * @param {Function} opts.onChange
 * @returns {HTMLElement}
 */
function createValueField({
    labelText,
    value,
    id,
    onChangeType,
    editable,
    unit,
    scale,
    index,
    lineArr,
    onChange
}) {
    const formGroup = document.createElement('div');
    formGroup.className = 'mb-3 row align-items-center';

    // Label
    const label = document.createElement('label');
    label.className = 'col-sm-3 col-form-label fw-bold';
    label.innerHTML = labelText;
    label.htmlFor = id;
    formGroup.appendChild(label);

    // Input wrapper
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'col-sm-9 d-flex align-items-center';

    let input;
    const displayValue = scale !== 1 ? value / scale : value;

    if (editable) {
        input = document.createElement("input");
        input.title = labelText;
        input.value = displayValue;
        input.setAttribute("scale", scale !== 1 ? "true" : "false");
        input.type = 'number';
        input.className = 'form-control w-auto me-2';
        input.id = id;
        input.onchange = () => onChange(onChangeType, index, lineArr);
    } else {
        input = document.createElement("span");
        input.className = 'form-control-plaintext me-2';
        input.innerHTML = displayValue;
    }

    inputWrapper.appendChild(input);

    // Unit label
    if (unit && unit !== 'no units') {
        const unitLabel = document.createElement("span");
        unitLabel.className = 'ms-2 text-secondary';
        unitLabel.innerHTML = unit;
        inputWrapper.appendChild(unitLabel);
    }

    formGroup.appendChild(inputWrapper);
    return formGroup;
}

/**
 * Render the regular parameter card.
 * @param {Object} opts
 * @param {HTMLElement} opts.valueEl - The DOM element representing the parameter (for label/title).
 * @param {string|number} opts.object - The parameter ID.
 * @param {Array} opts.lineArr - The parameter data array.
 * @param {Object} opts.languageDict - Language dictionary for labels.
 * @param {Object} opts.mainDescriptionsDict - Descriptions dictionary.
 * @param {Object} opts.writePermissionDict - Write permissions dictionary.
 * @param {string} opts.unitsDirectoryRaw - Raw units directory string.
 * @param {HTMLElement} opts.targetEl - The container to render into.
 * @param {Function} opts.parameterChangeFn - Function to call on value change.
 * @param {number} opts.accessLevel - Current user access level.
 */
export function renderRegularParameterCard({
    valueEl,
    object,
    lineArr,
    languageDict,
    mainDescriptionsDict,
    writePermissionDict,
    unitsDirectoryRaw,
    targetEl,
    parameterChangeFn,
    accessLevel
}) {
    // Clear previous content
    targetEl.innerHTML = '';

    // Find and set units
    const unitForIndex = getUnitForParameter(lineArr[6], unitsDirectoryRaw);

    // Card container
    const card = document.createElement('div');

    // Card Header
    const cardHeader = document.createElement('div');
    cardHeader.innerHTML = valueEl.innerHTML;
    card.appendChild(cardHeader);

    // Card Body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Description
    const descriptionText = document.createElement('p');
    descriptionText.className = 'text-muted';
    descriptionText.id = 'description';
    if (mainDescriptionsDict && mainDescriptionsDict[object]) {
        descriptionText.innerHTML = mainDescriptionsDict[object].replace('#' + object, '');
    }
    cardBody.appendChild(descriptionText);

    // Helper for onChange
    function handleChange(onChangeType, index, arr) {
        parameterChangeFn(
            arr[0],
            onChangeType,
            arr[index],
            [
                arr[0], arr[1], arr[2], arr[3], arr[4], arr[5],
                arr[6], arr[7], arr[8], arr[9], (arr[10] || '').replace('\r', '')
            ].join(',')
        );
    }

    // Field definitions
    const fields = [
        { label: languageDict["CurrentValue"], value: lineArr[1], id: 'WorkSpaceCurrentValue', type: 'CurrentValue', editable: true, idx: 1 },
        { label: languageDict["MaxValue"], value: lineArr[5], id: 'WorkSpaceMaxValue', type: 'MaxValue', editable: accessLevel >= 8, idx: 5 },
        { label: languageDict["MinValue"], value: lineArr[4], id: 'WorkSpaceMinValue', type: 'MinValue', editable: accessLevel >= 8, idx: 4 },
        { label: languageDict["DefaultValue"], value: lineArr[2], id: 'WorkSpaceDefaultValue', type: 'DefaultValue', editable: accessLevel >= 8, idx: 2 },
        { label: languageDict["FactoryValue"], value: lineArr[3], id: 'WorkSpaceFactoryValue', type: 'FactoryValue', editable: accessLevel >= 8, idx: 3 }
    ];

    // Render fields
    fields.forEach(field =>
        cardBody.appendChild(
            createValueField({
                labelText: field.label,
                value: field.value,
                id: field.id,
                onChangeType: field.type,
                editable: field.editable,
                unit: unitForIndex,
                scale: lineArr[7],
                index: field.idx,
                lineArr,
                onChange: handleChange
            })
        )
    );

    // Permissions: disable current value if not allowed
    if (
        writePermissionDict &&
        Number(writePermissionDict[object]) > accessLevel
    ) {
        const currentValueInput = cardBody.querySelector('#WorkSpaceCurrentValue');
        if (currentValueInput) {
            currentValueInput.setAttribute('disabled', 'disabled');
            currentValueInput.onclick = null;
        }
    }

    card.appendChild(cardBody);
    targetEl.appendChild(card);
}

/**
 * Adapter for legacy usage.
 * @param {HTMLElement} value
 * @param {string|number} object
 * @param {Array} lineArr
 */
export function RegularParameter(value, object, lineArr) {
    renderRegularParameterCard({
        valueEl: value,
        object,
        lineArr,
        languageDict: typeof LanguageDict !== 'undefined' ? LanguageDict : {},
        mainDescriptionsDict: typeof MainDescriptionsDict !== 'undefined' ? MainDescriptionsDict : {},
        writePermissionDict: typeof writePermissionDict !== 'undefined' ? writePermissionDict : {},
        unitsDirectoryRaw: sessionStorage.getItem('UnitsDirectory') || '',
        targetEl: document.getElementById('topDefineDescription'),
        parameterChangeFn: parameterchange,
        accessLevel: Number(sessionStorageService.get('AccessLevel'))
    });
}