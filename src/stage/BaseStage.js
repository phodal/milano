define(['createjs'], function () {
  var that, stage, preload;
  function BaseStage(stageNumber) {
    that = this;
    that.stageNumber = stageNumber;

    this.background = new createjs.Shape();
    this.stage = new createjs.Stage('demoCanvas');
    this.preload = new createjs.LoadQueue();
    createjs.Touch.enable(stage);
    createjs.Sound.alternateExtensions = ['mp3'];
    this.stageContainer = new createjs.Container();

    this.stageWidth = this.stage.canvas.width;
    this.stageHeight = this.stage.canvas.height;
  }

  BaseStage.prototype.load = function () {
    return new Promise(function (resolve, reject) {
      preload.installPlugin(createjs.Sound);
      preload.addEventListener('complete', function () {
        resolve();
      });
      preload.addEventListener('error', function () {
        reject();
      });
      preload.loadManifest({src: 'assets/manifest/stage' + that.stageNumber + '.manifest.json', type: 'manifest'});
    })
  };

  BaseStage.prototype.start = function () {

  };

  BaseStage.prototype.finish = function () {
    this.endStage();
    SceneDispatcher.nextScene();
  };

  BaseStage.prototype.endStage = function () {

  };

  return BaseStage;
});
