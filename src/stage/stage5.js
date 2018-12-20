define([
  'src/effects/light.js',
  'createjs',
], function (Light) {
  var stage, preload, light, that;

  function Stage5() {
    that = this;
  }

  Stage5.prototype.load = function () {
    stage = new createjs.Stage('demoCanvas');
    createjs.Touch.enable(stage);

    light =  new Light(stage);

    return new Promise(function (resolve, reject) {
      preload = new createjs.LoadQueue();
      preload.addEventListener('complete', function () {
        resolve();
      });
      preload.addEventListener('error', function () {
        reject();
      });
      preload.loadManifest({src: 'assets/manifest/stage5.manifest.json', type: 'manifest'});
    })
  };

  Stage5.prototype.start = function () {
    var keyContainer = new createjs.Container();
    var background = new createjs.Shape();
    background.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    keyContainer.addChild(background);

    stage.addChild(keyContainer);
    light.action();

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", function () {
      stage.update();
    });
  };

  Stage5.prototype.endStage = function () {
    stage.removeAllChildren();
  };

  Stage5.prototype.finish = function () {
    this.endStage();
    SceneDispatcher.nextScene();
  };

  return Stage5;
});
