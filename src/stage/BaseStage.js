define(['createjs'], function () {
  var that, stage, preload;
  function BaseStage(stageNumber) {
    this.stageNumber = stageNumber;

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
    var that = this;
    return new Promise(function (resolve, reject) {
      that.preload.installPlugin(createjs.Sound);
      that.preload.addEventListener('complete', function () {
        resolve();
      });
      that.preload.addEventListener('error', function () {
        reject();
      });
      that.preload.loadManifest({src: 'assets/manifest/stage' + that.stageNumber + '.manifest.json', type: 'manifest'});
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
