class DialogComponent extends HTMLElement {
  connectedCallback() {
    fetch('../src/includes/DialogTemplates.html')
      .then(response => response.text())
      .then(html => {
        this.innerHTML = html;
      });
  }
}
customElements.define('dialog-component', DialogComponent);