class DialogComponent extends HTMLElement {
  connectedCallback() {
    fetch('../js/components/DialogTemplates.html')
      .then(response => response.text())
      .then(html => {
        this.innerHTML = html;
      });
  }
}
customElements.define('dialog-component', DialogComponent);