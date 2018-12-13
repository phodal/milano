define([
  'src/effects/snow.js',
  'createjs',
], function (Snow) {
  var stage, preload, snow;

  var load = function () {
    stage = new createjs.Stage('demoCanvas');
    createjs.Touch.enable(stage);

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
    var keyContainer = new createjs.Container();
    var background = new createjs.Shape();
    background.graphics.beginFill("#f5f5f5").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    keyContainer.addChild(background);

    stage.addChild(keyContainer);
    stage.update();

    snow =  new Snow(stage);
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
