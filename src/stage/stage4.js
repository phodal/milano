define([
  'src/effects/light.js',
  'createjs',
], function (Light) {
  var stage, preload, light;

  var load = function () {
    stage = new createjs.Stage('demoCanvas');
    light =  new Light(stage);

    return new Promise(function (resolve, reject) {
      preload = new createjs.LoadQueue();
      preload.addEventListener('complete', function () {
        resolve();
      });
      preload.addEventListener('error', function () {
        reject();
      });
      preload.loadManifest({src: 'assets/manifest/stage3.manifest.json', type: 'manifest'});
    })
  };

  var start = function () {
    light.action();

    createjs.Ticker.timingMode =  createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", function () {
      stage.update();
    });
  };

  var finish = function () {

  };

  return {
    load: load,
    start: start,
    finish: finish
  };
});
