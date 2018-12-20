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
  'src/services/SceneDispatcher.js',
  'src/app.js'
], function (SceneDispatcher, App) {
  document.getElementById("loading").remove();
  window.mConfig = {
    debug: window.location.hostname === 'localhost'
  };

  window.SceneDispatcher = SceneDispatcher;
  App.initApp();
});
