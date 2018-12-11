define([
  'src/constants/colors.js',
  'createjs'
], function (Colors) {
  var createDisplayText = function (stage, scene) {
    var text = new createjs.Text("幕 " + scene.index + ":" + scene.title, "28px monospace", Colors.SCENE_TEXT);
    text.x = 50;
    text.y = 100;
    text.textBaseline = "alphabetic";
    return text;
  };

  return {
    createSceneText: createDisplayText
  };
});
