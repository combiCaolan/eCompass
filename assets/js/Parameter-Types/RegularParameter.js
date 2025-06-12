import sessionStorageService from "../modules/sessionStorageService.js";
import { parameterchange } from "../Parameter-Manipulation/UpdateParameters/parameter-change.js";

/**
 * Renders the regular parameter view with editable and read-only fields, Bootstrap style.
 * @param {HTMLElement} value - The DOM element representing the parameter (for label/title).
 * @param {string|number} object - The parameter ID.
 * @param {Array} lineArr - The parameter data array.
 */
export function RegularParameter(value, object, lineArr) {
    // Clear previous content
    const topDefineDescription = document.getElementById('topDefineDescription');
    topDefineDescription.innerHTML = '';

    // Find and set units
    let unitForIndex = 'no units';
    const unitsDirectory = (sessionStorage.getItem('UnitsDirectory') || '').split('\n');
    for (let i = 0; i < unitsDirectory.length; i++) {
        const unitLine = unitsDirectory[i].split(',');
        if (unitLine[1] && unitLine[1].replace('\r', '') === lineArr[6]) {
            unitForIndex = unitLine[0];
            break;
        }
    }

    // Bootstrap Card Container
    const card = document.createElement('div');
    // card.className = 'card my-3';

    // Card Header (Title)
    const cardHeader = document.createElement('div');
    // cardHeader.className = 'card-header bg-primary text-white';
    cardHeader.innerHTML = value.innerHTML;
    card.appendChild(cardHeader);

    // Card Body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Description
    const descriptionText = document.createElement('p');
    descriptionText.className = 'text-muted';
    descriptionText.id = 'description';
    if (typeof MainDescriptionsDict !== 'undefined' && MainDescriptionsDict[object]) {
        descriptionText.innerHTML = MainDescriptionsDict[object].replace('#' + object, '');
    }
    cardBody.appendChild(descriptionText);

    // Export checkbox (Bootstrap switch)
    const exportDiv = document.createElement('div');
    exportDiv.className = 'form-check form-switch mb-3';
    const switchParameter = document.createElement("input");
    switchParameter.type = 'checkbox';
    switchParameter.className = 'form-check-input';
    switchParameter.id = "SwitchParameterCheckbox";
    switchParameter.checked = !removedParametersCounters.includes(String(lineArr[0]));
    switchParameter.onchange = function () {
        exportonchange(lineArr[0], this);
        topDefineDescription.style.opacity = this.checked ? "1" : "0.4";
    };
    const switchParameterLabel = document.createElement("label");
    switchParameterLabel.className = 'form-check-label ms-2';
    switchParameterLabel.htmlFor = "SwitchParameterCheckbox";
    switchParameterLabel.innerHTML = LanguageDict["ExportSelectedParamters"];
    exportDiv.appendChild(switchParameter);
    exportDiv.appendChild(switchParameterLabel);
    cardBody.appendChild(exportDiv);

    // Helper to create value fields (Current, Max, Min, Default, Factory)
    function createValueField(labelText, value, id, onChangeType, editable, unit, scale, index) {
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
        if (editable) {
            input = document.createElement("input");
            input.title = labelText;
            input.value = scale !== 1 ? value / scale : value;
            input.setAttribute("scale", scale !== 1 ? "true" : "false");
            input.type = 'number';
            input.className = 'form-control w-auto me-2';
            input.id = id;
            input.onchange = function () {
                parameterchange(
                    lineArr[0],
                    onChangeType,
                    lineArr[index],
                    [
                        lineArr[0], lineArr[1], lineArr[2], lineArr[3], lineArr[4], lineArr[5],
                        lineArr[6], lineArr[7], lineArr[8], lineArr[9], (lineArr[10] || '').replace('\r', '')
                    ].join(',')
                );
            };
        } else {
            input = document.createElement("span");
            input.className = 'form-control-plaintext me-2';
            input.innerHTML = scale !== 1 ? value / scale : value;
        }

        inputWrapper.appendChild(input);

        // Unit label
        if (unit !== 'no units') {
            const unitLabel = document.createElement("span");
            unitLabel.className = 'ms-2 text-secondary';
            unitLabel.innerHTML = unit;
            inputWrapper.appendChild(unitLabel);
        }

        formGroup.appendChild(inputWrapper);
        cardBody.appendChild(formGroup);
    }

    // Render Current Value
    createValueField(
        LanguageDict["CurrentValue"],
        lineArr[1],
        'WorkSpaceCurrentValue',
        'CurrentValue',
        true,
        unitForIndex,
        lineArr[7],
        1
    );

    // Render Max Value
    createValueField(
        LanguageDict["MaxValue"],
        lineArr[5],
        'WorkSpaceMaxValue',
        'MaxValue',
        Number(sessionStorageService.get('AccessLevel')) >= 8,
        unitForIndex,
        lineArr[7],
        5
    );

    // Render Min Value
    createValueField(
        LanguageDict["MinValue"],
        lineArr[4],
        'WorkSpaceMinValue',
        'MinValue',
        Number(sessionStorageService.get('AccessLevel')) >= 8,
        unitForIndex,
        lineArr[7],
        4
    );

    // Render Default Value
    createValueField(
        LanguageDict["DefaultValue"],
        lineArr[2],
        'WorkSpaceDefaultValue',
        'DefaultValue',
        Number(sessionStorageService.get('AccessLevel')) >= 8,
        unitForIndex,
        lineArr[7],
        2
    );

    // Render Factory Value
    createValueField(
        LanguageDict["FactoryValue"],
        lineArr[3],
        'WorkSpaceFactoryValue',
        'FactoryValue',
        Number(sessionStorageService.get('AccessLevel')) >= 8,
        unitForIndex,
        lineArr[7],
        3
    );

    // Permissions
    if (typeof writePermissionDict !== 'undefined' && Number(writePermissionDict[object]) > Number(sessionStorageService.get('AccessLevel'))) {
        try {
            const currentValueInput = document.getElementById('WorkSpaceCurrentValue');
            if (currentValueInput) {
                currentValueInput.setAttribute('disabled', 'disabled');
                currentValueInput.onclick = null;
            }
        } catch (err) {
            // No input available
        }
    }

    card.appendChild(cardBody);
    topDefineDescription.appendChild(card);

    $('#topDefineDescription').fadeIn();
}