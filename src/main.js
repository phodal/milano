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
  window.mConfig = {
    debug: true
  };

  window.SceneSwitcher = SceneSwitcher;
  App.initApp();
});
