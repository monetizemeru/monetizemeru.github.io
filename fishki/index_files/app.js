if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-main.js', {scope: '/'})
  .then((reg) => {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch((error) => {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

window.addEventListener('appinstalled', function() {
    new Image().src = '/counter/asp_show/?position=369';
});