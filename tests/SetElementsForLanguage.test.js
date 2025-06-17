const { expect } = require('chai');
const jsdomGlobal = require('jsdom-global');
const { SetLanguage } = require('../assets/js/LanguageLogic/SetElementsForLanguage');

describe('SetLanguage', function() {
  let cleanup;

  beforeEach(function() {
    cleanup = jsdomGlobal();
    global.LanguageDict = { SearchDialog: 'Search', Message: 'Msg' };
    const elem = document.createElement('div');
    elem.id = 'SearchParameterDialog';
    document.body.appendChild(elem);
  });

  afterEach(function() {
    cleanup();
  });

  it('sets dialog title from LanguageDict', function() {
    SetLanguage();
    expect(document.getElementById('SearchParameterDialog').getAttribute('title')).to.equal('Search');
  });
});