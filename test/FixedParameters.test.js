const { expect } = require('chai');
const jsdomGlobal = require('jsdom-global');
const { ClearWorkSpace, AddFixedParameter } = require('../assets/js/Parameter-Types/FixedParameters');

describe('FixedParameters', function() {
  let cleanup;

  beforeEach(function() {
    cleanup = jsdomGlobal();
    // Setup DOM elements used by the functions
    const tableElem = document.createElement('div');
    tableElem.id = 'topDefineTable';
    document.body.appendChild(tableElem);

    const descElem = document.createElement('div');
    descElem.id = 'topDefineDescription';
    document.body.appendChild(descElem);

    // Mock MainDescriptionsDict
    global.MainDescriptionsDict = { '1': 'Description for #1' };
    // Mock AddParmeterToClp to avoid errors
    global.AddParmeterToClp = () => {};
  });

  afterEach(function() {
    cleanup();
  });

  it('ClearWorkSpace clears the workspace areas', function() {
    document.getElementById('topDefineTable').innerHTML = 'something';
    document.getElementById('topDefineDescription').innerHTML = 'something';
    ClearWorkSpace();
    expect(document.getElementById('topDefineTable').innerHTML).to.equal('');
    expect(document.getElementById('topDefineDescription').innerHTML).to.equal('');
  });

  it('AddFixedParameter adds elements to the description area', function() {
    const htmlObject = document.createElement('button');
    htmlObject.id = '1';
    htmlObject.innerHTML = 'TestParam';
    AddFixedParameter(htmlObject);
    const descElem = document.getElementById('topDefineDescription');
    // Should have at least the title, description, message, and button
    expect(descElem.children.length).to.be.at.least(4);
    expect(descElem.querySelector('#WorkSpaceTitle').innerHTML).to.equal('TestParam');
    expect(descElem.querySelector('#description').innerHTML).to.equal('Description for #1');
    expect(descElem.querySelector('#AddParameterButton').value).to.include('TestParam');
  });
});