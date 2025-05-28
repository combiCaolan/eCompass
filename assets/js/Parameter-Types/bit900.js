/**
 * Displays bit options for a Bit999 parameter, allowing the user to select and update bit values.
 * @param {string} Line - The parameter line (CSV string).
 * @param {HTMLElement} ClickedButton - The button that was clicked.
 */
function Bit999DisplayOptionsFunction(Line, ClickedButton) {
    document.getElementById('topDefineDescription').innerHTML = '';

    const Index = Line.split(',')[0];
    const constantElem = document.getElementById('constant' + Index);
    if (constantElem.innerHTML !== '') {
        constantElem.innerHTML = '';
        return;
    }

    // Parse bit values
    const CurrentValue = parseInt(Line.split(',')[1], 10);
    const DefaultValue = parseInt(Line.split(',')[2], 10);
    const FactoryValue = parseInt(Line.split(',')[3], 10);

    // Get bits as arrays (32 bits)
    const getBits = (octet) => Array.from({ length: 32 }, (_, i) => (octet & (1 << i)) ? 1 : 0);
    const bits = getBits(CurrentValue);
    const Defaultbits = getBits(DefaultValue);
    const Factorybits = getBits(FactoryValue);

    // Find Bit999 directory line for this parameter
    const bit999Dir = sessionStorage.getItem('Bit999').split('\n');
    let BitLine = null;
    for (let i = 0; i < bit999Dir.length; i++) {
        if (bit999Dir[i][0] === '#' && bit999Dir[i].replace('#', '').replace(/\r/g, '') === Index) {
            BitLine = i + 1;
            break;
        }
    }
    if (BitLine === null) return;

    // Title and Description
    const Title = document.createElement('p');
    Title.id = 'WorkSpaceTitle';
    Title.innerHTML = ClickedButton.innerHTML;

    const Description = document.createElement('p');
    Description.innerHTML = MainDescriptionsDict[Index] !== undefined
        ? MainDescriptionsDict[Index].replace('#' + Index, '')
        : "This parameter's description is not present";

    // Export checkbox (not appended by default)
    const ExportDiv = document.createElement('div');
    const SwitchParameterLabel = document.createElement("label");
    SwitchParameterLabel.innerHTML = LanguageDict["Export"];
    const SwitchParameter = document.createElement("input");
    SwitchParameter.type = 'checkbox';
    SwitchParameter.id = "Switch Parameter Checkbox";
    if (!removedParametersCounters.includes(String(Line))) {
        SwitchParameter.checked = true;
        document.getElementById('topDefineDescription').style.opacity = 1;
    } else {
        document.getElementById('topDefineDescription').style.opacity = 0.4;
    }
    SwitchParameter.onchange = function () {
        exportonchange(Line.split(',')[0], this);
    };
    SwitchParameter.style = "text-align:center; font-size:18px;";

    // Option list
    const unorderedList = document.createElement('ul');
    unorderedList.id = 'Bit999DropDownDiv';

    let bitCounter = 1;
    let lineIdx = BitLine;
    while (bit999Dir[lineIdx] && bit999Dir[lineIdx][0] !== '#') {
        const bitParts = bit999Dir[lineIdx].split(',');
        const ListItem = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'submit';
        input.id = 'Bitnineninenine' + bitCounter;
        input.value = bitParts[2];
        input.className = 'ThirdSubGroup';
        if (bitParts[2]) input.name = bitParts[2].replace(/ /g, '');
        input.onclick = function () {
            BitDropDown999(
                Index,
                bitParts[0],
                bitParts[1],
                ClickedButton.innerHTML,
                bitParts[2].replace(/\n/g, '').replace(/\r/g, ''),
                bits,
                Defaultbits,
                Factorybits,
                bitCounter
            );
        };
        ListItem.appendChild(input);
        unorderedList.appendChild(ListItem);
        lineIdx++;
        bitCounter++;
    }

    constantElem.appendChild(unorderedList);
    $('#topDefineDescription').fadeIn();
}

/**
 * Handles the selection of a bit option for Bit999 parameters.
 * Updates the parameter value in sessionStorage and refreshes the UI.
 */
function BitDropDown999(
    ParentParameterIndex,
    Bit,
    DropDownIndex,
    NameOfParentParameter,
    NameOfParameterBit,
    BitResults,
    DefaultBitResults,
    FactoryBitResults,
    BitButtonCounter
) {
    // Deselect all previously selected
    try {
        Array.from(document.getElementsByClassName('SelectedThirdSubGroup')).forEach(elem => {
            elem.className = 'ThirdSubGroup';
        });
    } catch (err) {}

    // Highlight selected
    const WhichNumber = Number(BitButtonCounter) - 1;
    document.getElementById("constant" + ParentParameterIndex)
        .childNodes[0].childNodes[WhichNumber].className = 'SelectedThirdSubGroup';

    // Clear UI
    document.getElementById('topDefineDescription').innerHTML = '';
    document.getElementById('topDefineTable').innerHTML = '';

    // Title and Description
    const Title = document.createElement('p');
    Title.id = 'WorkSpaceTitle';
    Title.innerHTML = NameOfParameterBit;
    document.getElementById('topDefineTable').appendChild(Title);

    const Description = document.createElement('p');
    Description.id = 'description';
    Description.innerHTML = SpecialDescriptionsDict[Number(ParentParameterIndex + '.' + BitButtonCounter)];
    document.getElementById('topDefineDescription').appendChild(Description);

    // Find dropdown options for this bit
    const DropDownFile = sessionStorage.getItem('DropDownlist');
    const DropDownLines = DropDownFile.split('\n');
    let DropDownLineNum = '';
    for (let i = 0; i < DropDownLines.length; i++) {
        if (DropDownLines[i][0] === '#' && DropDownLines[i].replace('#', '').replace(/\r/g, '') === DropDownIndex) {
            DropDownLineNum = i + 1;
            break;
        }
    }
    if (DropDownLineNum === '') {
        console.log('ERR * line The DropDown parameters file does not have this index referenced: ' + DropDownIndex);
        return;
    }

    // Labels
    const CurrentValueLabel = document.createElement('p');
    CurrentValueLabel.id = 'ReadResult';
    CurrentValueLabel.innerHTML = LanguageDict["CurrentValue"];
    document.getElementById('topDefineDescription').appendChild(CurrentValueLabel);

    const DefaultValueLabel = document.createElement('p');
    DefaultValueLabel.id = 'ReadResult';
    DefaultValueLabel.innerHTML = LanguageDict["DefaultValue"];

    const FactoryValueLabel = document.createElement('p');
    FactoryValueLabel.id = 'ReadResult';
    FactoryValueLabel.innerHTML = LanguageDict["FactoryValue"];

    // Build dropdowns or readonly fields
    const OptionsDict = {};
    let DropDown, DefaultValue, FactoryValue;
    if (Number(writePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)) {
        DropDown = document.createElement('select');
        DefaultValue = document.createElement('select');
        FactoryValue = document.createElement('select');
        DropDown.id = 'CurrentBitDropValue';
        DefaultValue.id = 'DefaultBitDropValue';
        FactoryValue.id = 'FactoryBitDropValue';
    } else {
        DropDown = document.createElement('p');
        DefaultValue = document.createElement('p');
        FactoryValue = document.createElement('p');
        DropDown.id = DefaultValue.id = FactoryValue.id = 'ReadResult';
    }

    // Populate dropdowns
    let idx = DropDownLineNum;
    while (DropDownLines[idx] && DropDownLines[idx][0] !== '#') {
        const parts = DropDownLines[idx].split(',');
        const [optionText, optionValue] = [parts[0], parts[1]];
        OptionsDict[optionValue] = optionText;

        if (Number(writePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)) {
            const makeOption = (val, txt) => {
                const opt = document.createElement('option');
                opt.value = val;
                opt.innerHTML = txt;
                return opt;
            };
            DropDown.appendChild(makeOption(optionValue, optionText));
            DefaultValue.appendChild(makeOption(optionValue, optionText));
            FactoryValue.appendChild(makeOption(optionValue, optionText));
            if (Number(AccessLevelForUser) < 8) {
                DefaultValue.disabled = true;
                FactoryValue.disabled = true;
            }
        }
        idx++;
    }

    DefaultValue.style = FactoryValue.style = 'margin:10px;';

    // Set values or text
    const getBitVal = (arr, bit) => Array.isArray(arr) ? arr[bit] : arr.split(',')[bit];
    if (Number(writePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)) {
        DropDown.value = getBitVal(BitResults, Bit);
        DefaultValue.value = getBitVal(DefaultBitResults, Bit);
        FactoryValue.value = getBitVal(FactoryBitResults, Bit);
    } else {
        DropDown.innerHTML = OptionsDict[getBitVal(BitResults, Bit)];
        DefaultValue.innerHTML = OptionsDict[getBitVal(DefaultBitResults, Bit)];
        FactoryValue.innerHTML = OptionsDict[getBitVal(FactoryBitResults, Bit)];
    }

    // Append to UI
    document.getElementById('topDefineDescription').appendChild(DropDown);
    document.getElementById('topDefineDescription').appendChild(DefaultValueLabel);
    document.getElementById('topDefineDescription').appendChild(DefaultValue);
    document.getElementById('topDefineDescription').appendChild(FactoryValueLabel);
    document.getElementById('topDefineDescription').appendChild(FactoryValue);

    // Set onchange handlers if editable
    if (Number(writePermissionDict[ParentParameterIndex]) <= Number(AccessLevelForUser)) {
        DropDown.onchange = () => BitDropDownChange999(BitResults, Bit, ParentParameterIndex, "Current");
        DefaultValue.onchange = () => BitDropDownChange999(DefaultBitResults, Bit, ParentParameterIndex, "Default");
        FactoryValue.onchange = () => BitDropDownChange999(FactoryBitResults, Bit, ParentParameterIndex, "Factory");
    }
}

/**
 * Handles changes to a Bit999 dropdown value, updating the parameter in sessionStorage.
 * @param {string} BitResults - Comma-separated bit values.
 * @param {number} Bit - The bit index to update.
 * @param {string|number} LineNumber - The parameter index.
 * @param {string} UpdateType - "Current", "Default", or "Factory".
 */
function BitDropDownChange999(BitResults, Bit, LineNumber, UpdateType) {
    const CurrentBits = BitResults.split(',');
    let DesiredBit;
    if (UpdateType === 'Current') {
        DesiredBit = document.getElementById('CurrentBitDropValue').value;
    } else if (UpdateType === 'Default') {
        DesiredBit = document.getElementById('DefaultBitDropValue').value;
    } else if (UpdateType === 'Factory') {
        DesiredBit = document.getElementById('FactoryBitDropValue').value;
    }

    // Update the bit array
    const NewBit = CurrentBits.map((val, idx) => idx == Bit ? DesiredBit : val);
    const ChangedBits = NewBit.toString();

    // Convert bits to integer value
    let FinalCurrentValue = 0;
    for (let i = 0; i <= 31; i++) {
        FinalCurrentValue += Number(NewBit[i]) * Math.pow(2, i);
    }

    // Update the parameter line in sessionStorage
    const Parameters = sessionStorage.getItem('Parameters').split('\n');
    for (let i = 0; i < Parameters.length; i++) {
        const paramParts = Parameters[i].split(',');
        if (paramParts[0] == LineNumber) {
            let NewLine;
            if (UpdateType === 'Current') {
                NewLine = [paramParts[0], FinalCurrentValue, paramParts[2], paramParts[3], paramParts[4], paramParts[5], paramParts[6], paramParts[7], paramParts[8], paramParts[9], paramParts[10]].join(',');
            } else if (UpdateType === 'Default') {
                NewLine = [paramParts[0], paramParts[1], FinalCurrentValue, paramParts[3], paramParts[4], paramParts[5], paramParts[6], paramParts[7], paramParts[8], paramParts[9], paramParts[10]].join(',');
            } else if (UpdateType === 'Factory') {
                NewLine = [paramParts[0], paramParts[1], paramParts[2], FinalCurrentValue, paramParts[4], paramParts[5], paramParts[6], paramParts[7], paramParts[8], paramParts[9], paramParts[10]].join(',');
            }
            Parameters[i] = NewLine;
            sessionStorage.setItem('Parameters', Parameters.join('\n'));
            break;
        }
    }

    ChangesMadePreDownload = true;

    // Refresh UI
    const BitParameterName = document.getElementById('WorkSpaceTitle').innerHTML.replace(/ /g, '');
    TreeViewClick(document.getElementById(LineNumber.toString()), LineNumber);
    TreeViewClick(document.getElementById(LineNumber.toString()), LineNumber);
    document.getElementsByName(BitParameterName)[0].onclick();
}