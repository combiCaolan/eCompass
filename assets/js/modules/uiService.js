// uiService.js
const uiService = {
  log(message) {
    const logEl = document.getElementById('log');
    if (logEl) logEl.innerHTML = message;
  }
};

export default uiService;