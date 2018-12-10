define([
  'src/constants/colors.js',
  'createjs'
], function (Colors) {
  var createDisplayText = function (stage, index) {
    var text = new createjs.Text("幕 " + index, "28px monospace", Colors.sceneText);
    text.x = stage.canvas.width - 100;
    text.y = 100;
    text.textBaseline = "alphabetic";
    return text;
  };

  return {
    createDisplayText: createDisplayText
  };
});
