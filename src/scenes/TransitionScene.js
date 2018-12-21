define([
  'src/constants/colors.js',
  'src/constants/constants.js',
  'src/utils/TextUtils.js',
  'createjs'
], function (Colors, CONSTANTS, TextUtils) {
  var initialize = function (scene, AppStage) {
    var stage = new createjs.Stage("demoCanvas");
    var displayText = TextUtils.createSceneText(stage, scene);
    stage.addChild(displayText);
    var appStage = new AppStage();
    window.currentStage = appStage;

    createjs.Ticker.on('tick', function (event) {
      stage.update();
    });

    var startNewScene = function () {
      if (!window.lastStage) {
        appStage.start();
        window.lastStage = appStage;
        return;
      }

      createjs.Ticker.off('tick', window.lastStage.tickListener);
      window.lastStage.endStage();
      appStage.start();
      window.lastStage = appStage;
    };

    if (window.mConfig.debug) {
      appStage.load().then(function () {
        startNewScene();
      });
    } else {
      appStage.load().then(function () {
        createjs.Tween.get(displayText)
          .to({alpha: 0}, CONSTANTS.DEFAULT_TIMEOUT / 2 + 100, createjs.Ease.get(1))
          .call(function () {
            startNewScene();
          })
      });
    }
  };

  return {
    initialize: initialize
  };
});
