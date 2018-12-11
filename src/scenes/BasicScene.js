define([
  'src/constants/colors.js',
  'src/constants/constants.js',
  'src/utils/TextUtils.js',
  'createjs'
], function (Colors, CONSTANTS, TextUtils) {
  var hasLoadNewStage = false;
  var initialize = function (scene, AppStage) {
    console.log(scene, AppStage);
    var stage = new createjs.Stage("demoCanvas");
    var displayText = TextUtils.createSceneText(stage, scene);
    stage.addChild(displayText);

    createjs.Tween.get(displayText).to({alpha: 0}, CONSTANTS.DEFAULT_TIMEOUT + 100, createjs.Ease.get(1));
    createjs.Ticker.on('tick', function (event) {
      stage.update();
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
