/**
 * Renders the regular parameter view with editable and read-only fields.
 * @param {HTMLElement} value - The DOM element representing the parameter (for label/title).
 * @param {string|number} object - The parameter ID.
 * @param {Array} lineArr - The parameter data array (e.g. [IndexNumber, Current, Default, Factory, Min, Max, ..., Scale, ...]).
 */
function RegularParameter(value, object, lineArr) {
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

    // Title
    const title = document.createElement("p");
    title.innerHTML = value.innerHTML;
    title.id = 'WorkSpaceTitle';
    document.getElementById('topDefineDescription').appendChild(title);

    // Description
    const descriptionArea = document.createElement('tr');
    const descriptionText = document.createElement('p');
    if (typeof MainDescriptionsDict !== 'undefined' && MainDescriptionsDict[object]) {
        descriptionText.innerHTML = MainDescriptionsDict[object].replace('#' + object, '');
    }
    descriptionText.id = 'description';
    descriptionArea.appendChild(descriptionText);
    document.getElementById('topDefineDescription').appendChild(descriptionArea);

    // Export checkbox
    const exportDiv = document.createElement('div');
    const switchParameterLabel = document.createElement("label");
    switchParameterLabel.id = 'Export';
    switchParameterLabel.innerHTML = LanguageDict["ExportSelectedParamters"];
    exportDiv.appendChild(switchParameterLabel);

    const switchParameter = document.createElement("input");
    switchParameter.type = 'checkbox';
    switchParameter.id = "SwitchParameterCheckbox";
    switchParameter.checked = !removedParametersCounters.includes(String(lineArr[0]));
    switchParameter.onchange = function () {
        exportonchange(lineArr[0], this);
    };
    switchParameter.style = "text-align:center; font-size:18px;";
    exportDiv.appendChild(switchParameter);

    document.getElementById('topDefineDescription').style.opacity = switchParameter.checked ? "1" : "0.4";
    document.getElementById('topDefineDescription').appendChild(exportDiv);

    // Helper to create value fields (Current, Max, Min, Default, Factory)
    function createValueField(labelText, value, id, onChangeType, editable, unit, scale, index) {
        const unitLabel = document.createElement("label");
        if (unit !== 'no units') unitLabel.innerHTML = '&nbsp;&nbsp;' + unit;
        unitLabel.style = 'float:left;';

        const div = document.createElement("div");
        // div.style = editable
        //     ? 'margin:10px; padding:15px;'
        //     : 'margin:10px; padding:15px; background:whitesmoke;';
        document.getElementById('topDefineDescription').appendChild(div);

        // const table = document.createElement("table");
        // const tr = document.createElement("tr");
        const label = document.createElement("p");
        // label.style = 'float:left;';
        label.setAttribute('id','ReadResult');
        label.innerHTML = labelText;

        let input;
        if (editable) {
            input = document.createElement("input");
            input.title = labelText;
            input.value = scale !== 1 ? value / scale : value;
            input.setAttribute("scale", scale !== 1 ? "true" : "false");
            input.type = 'number';
            input.style = 'float:left; text-align:right; margin-left:10px;';
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
            input = document.createElement("label");
            input.innerHTML = scale !== 1 ? '<br>' + value / scale : value;
            input.setAttribute("scale", scale !== 1 ? "true" : "false");
            input.type = 'number';
            input.style = 'float:left;';
        }

        const parInd = document.createElement(editable ? 'p' : 'label');
        parInd.innerHTML = '&nbsp;&nbsp;&nbsp;';
        // parInd.style = editable ? 'float:right;' : 'float:left;';

        // div.appendChild(table);
        // table.appendChild(tr);
        div.appendChild(label);
        div.appendChild(parInd);
        parInd.appendChild(input);
        parInd.appendChild(unitLabel);
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
        Number(AccessLevelForUser) >= 8,
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
        Number(AccessLevelForUser) >= 8,
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
        Number(AccessLevelForUser) >= 8,
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
        Number(AccessLevelForUser) >= 8,
        unitForIndex,
        lineArr[7],
        3
    );

    // Permissions
    if (typeof writePermissionDict !== 'undefined' && Number(writePermissionDict[object]) > Number(AccessLevelForUser)) {
        try {
            document.getElementById('WorkSpaceCurrentValue').setAttribute('disabled', 'disabled');
            document.getElementById('WorkSpaceCurrentValue').onclick = null;
        } catch (err) {
            // No input available
        }
    }

    $('#topDefineDescription').fadeIn();
}