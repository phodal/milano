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
    setTimeout(function () {
      stage.clear();
      scene.start();
    }, 1000);
  };

  return {
    initialize: initialize
  };
});
