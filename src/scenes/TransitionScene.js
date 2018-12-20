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

    createjs.Ticker.on('tick', function (event) {
      stage.update();
    });

    var startNewScene = function () {
      window.mConfig.currentStage.removeAllChildren();
      AppStage.start();
    };

    if (window.mConfig.debug) {
      AppStage.load().then(function () {
        startNewScene();
      });
    } else {
      AppStage.load().then(function () {
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
