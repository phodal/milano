require.config({
  shim: {
    createjs: {
      exports: 'createjs'
    },
    tween: {
      deps: ['createjs'],
      exports: 'Tween'
    }
  },
  paths: {
    createjs: '../libs/createjs.min',
    tween: '../libs/tweenjs.min'
  }
});

require([
  'src/services/SceneSwitcher.js',
  'src/app.js'
], function (SceneSwitcher, App) {
  document.getElementById("loading").remove();
  window.mConfig = {
    debug: window.location.hostname === 'localhost'
  };

  window.SceneSwitcher = SceneSwitcher;
  App.initApp();
});
