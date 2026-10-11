/* Install support; independent of the clinical application code. */
(() => {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js', {scope:'./'})
        .catch(error => console.warn('PWA offline registration unavailable:', error));
    });
  }
  let deferredInstallPrompt = null;
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'スマホにインストール';
  button.className = 'secondary small';
  button.style.cssText = 'width:auto;max-width:100%;margin:9px auto 0;display:none';
  const footer = document.querySelector('footer');
  if (footer) footer.appendChild(button);
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    button.style.display = 'block';
  });
  button.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    const promptEvent = deferredInstallPrompt;
    deferredInstallPrompt = null;
    button.style.display = 'none';
    await promptEvent.prompt();
  });
  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    button.style.display = 'none';
  });
})();
