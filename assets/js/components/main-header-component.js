class MainHeaderComponent extends HTMLElement {
  connectedCallback() {
    fetch('../src/includes/MainHeader.html')
      .then(response => response.text())
      .then(html => {
        this.innerHTML = html;
        // Dispatch a custom event to signal that the header is ready
        this.dispatchEvent(new CustomEvent('main-header-loaded', { bubbles: true }));
      });
  }
}
customElements.define('main-header', MainHeaderComponent);