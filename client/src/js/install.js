const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.visibility = 'visible';
});

butInstall.addEventListener('click', (event) => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
        butInstall.setAttribute("disabled", true);
        butInstall.textContent = "Installed";
    }
}, true);

window.addEventListener('appinstalled', (event) => {
    console.log('appinstalled', event)
});
