define([
  'src/constants/colors.js',
  'src/constants/constants.js',
  'src/utils/TextUtils.js',
  'createjs'
], function (Colors, CONSTANTS, TextUtils) {
  var hasLoadNewStage = false;
  var initialize = function (scene, AppStage) {
    var stage = new createjs.Stage("demoCanvas");
    var displayText = TextUtils.createSceneText(stage, scene);
    stage.addChild(displayText);

    createjs.Tween.get(displayText).to({alpha: 0}, CONSTANTS.DEFAULT_TIMEOUT + 100, createjs.Ease.get(1));
    stage.update();

    createjs.Ticker.addEventListener("tick", function () {
      // console.log(createjs.Ticker.getTime());
    });
    var startNewScene = function () {
      stage.clear();
      AppStage.start();
    };

    AppStage.load().then(function () {
      hasLoadNewStage = true;
      startNewScene();
    });
    createjs.Tween.get().wait(CONSTANTS.DEFAULT_TIMEOUT).call(function () {
      if (!hasLoadNewStage) {
        startNewScene();
      }
    });
  };

  return {
    initialize: initialize
  };
});
