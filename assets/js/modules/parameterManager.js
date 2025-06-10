// parameterManager.js
class ParameterManager {
  constructor(storage, ui) {
    this.storage = storage;
    this.ui = ui;
    this.removedParameters = [];
  }

  addParameter(param) {
    this.storage.set('param', param);
    this.ui.log(param + ' added!');
  }
}

export default ParameterManager;