define([
  'src/effects/snow.js',
  'createjs',
], function (Snow) {
  var stage, preload, snow;

  var load = function () {
    stage = new createjs.Stage('demoCanvas');
    snow =  new Snow(stage);

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
    snow.action();
  };

  var finish = function () {

  };

  return {
    load: load,
    start: start,
    finish: finish
  };
});
