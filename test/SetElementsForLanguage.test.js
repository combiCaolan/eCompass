// test/SetElementsForLanguage.test.js
const { expect } = require('chai');

describe('SetLanguage', function() {
  beforeEach(function() {
    // Set up DOM elements and LanguageDict mock here
    global.document = require('jsdom-global')();
    global.LanguageDict = { SearchDialog: 'Search', Message: 'Msg' };
    const elem = document.createElement('div');
    elem.id = 'SearchParameterDialog';
    document.body.appendChild(elem);
  });

  afterEach(function() {
    // Clean up
    document.body.innerHTML = '';
  });

  it('sets dialog title from LanguageDict', function() {
    SetLanguage();
    expect(document.getElementById('SearchParameterDialog').getAttribute('title')).to.equal('Search');
  });
});