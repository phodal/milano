define([
  'src/utils/SceneSwitcher.js',
  'src/constants/colors.js',
  'src/constants/scenes.js',
  'createjs'
], function (SceneSwitcher, Colors, SCENES) {
  function createStartMenu(stage) {
    var text = new createjs.Text("Start Game", "32px monospace", Colors.menuColor);
    text.x = stage.canvas.width / 2 - 100;
    text.y = stage.canvas.height / 2;
    text.textBaseline = "alphabetic";
    text.shadow = new createjs.Shadow(Colors.menuShadowColor, 2, 2, 50);
    text.addEventListener("click", function (event) {
      stage.clear();
      SceneSwitcher.goto(SCENES.SCENES_1);
    });

    return text;
  }

  var initApp = function () {
    var stage = new createjs.Stage("demoCanvas");
    var text = createStartMenu(stage);

    stage.addChild(text);
    stage.update();
  }

  return {
    initApp: initApp
  };
});
