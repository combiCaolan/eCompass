class MainHeaderComponent extends HTMLElement {
  connectedCallback() {
    fetch('../src/includes/MainHeader.html')
      .then(response => response.text())
      .then(html => {
        this.innerHTML = html;

        // Attach event listeners here, so they're always set up after HTML loads
        this.querySelectorAll('#OpenFileButton').forEach(btn => {
          btn.addEventListener('click', window.readParameters);
        });
        this.querySelectorAll('#NewFileButton').forEach(btn => {
          btn.addEventListener('click', window.newFile);
        });
        this.querySelectorAll('#OpenInNewTab').forEach(btn => {
          btn.addEventListener('click', window.openNewFile);
        });
        this.querySelectorAll('#CloseFileButton').forEach(btn => {
          btn.addEventListener('click', window.closeFileDialog);
        });

        // Optionally, dispatch the custom event if you need it elsewhere
        this.dispatchEvent(new CustomEvent('main-header-loaded', { bubbles: true }));
      });
  }
}
customElements.define('main-header', MainHeaderComponent);