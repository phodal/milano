require([
  'src/app.js'
], function (App) {
  window.mConfig = {
    debug: true
  }

  App.initApp();
});
