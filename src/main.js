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
  'src/app.js'
], function (App) {
  window.mConfig = {
    debug: true
  }

  App.initApp();
});
