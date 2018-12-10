define([
  'src/constants/colors.js',
  'src/utils/TextUtils.js',
  'createjs'
], function (Colors, TextUtils) {
  var initialize = function (scene_index, scene) {
    var stage = new createjs.Stage("demoCanvas");
    var displayText = TextUtils.createDisplayText(stage, scene_index);
    stage.addChild(displayText);
    stage.update();

    scene.load();
    createjs.Tween.get().wait(1000).call(function () {
      stage.clear();
      scene.start();
    });
  };

  return {
    initialize: initialize
  };
});
