define([
  'createjs'
], function () {
  var stage, preload;

  var load = function () {
    stage = new createjs.Stage('demoCanvas');

    return new Promise(function (resolve, reject) {
      preload = new createjs.LoadQueue();
      preload.addEventListener('complete', function () {
        resolve();
      });
      preload.addEventListener('error', function () {
        reject();
      });
      preload.loadManifest({src: 'assets/stages/stage2.manifest.json', type: 'manifest'});
    })
  };

  var start = function () {


    createjs.Ticker.on('tick', function (event) {
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
