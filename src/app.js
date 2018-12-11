define([
  'src/utils/SceneSwitcher.js',
  'src/constants/colors.js',
  'src/constants/scenes.js',
  'createjs'
], function (SceneSwitcher, Colors, SCENES) {
  var stage;

  var startGame = function () {
    stage.clear();
    SceneSwitcher.goto(SCENES.SCENES_1);
  };

  function createStartMenu(stage) {
    var text = new createjs.Text("Start Game", "32px monospace", Colors.menuColor);
    text.x = stage.canvas.width / 2 - 100;
    text.y = stage.canvas.height / 2;
    text.textBaseline = "alphabetic";
    text.shadow = new createjs.Shadow(Colors.menuShadowColor, 2, 2, 50);
    text.addEventListener("click", startGame);
    return text;
  }

  var initApp = function () {
    loadResources();
    stage = new createjs.Stage("demoCanvas");
    // 重新缩放 Canvas
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    var text = createStartMenu(stage);

    stage.addChild(text);
    stage.update();

    if (window.mConfig.debug) {
      createjs.Tween.get().wait(200).call(startGame);
    }
  };

  var loadResources = function () {
    var preload = new createjs.LoadQueue();
    preload.addEventListener('fileload', function () {
      console.log('handleFileComplete');
    });
    preload.loadFile('assets/images/background.png');
  };

  return {
    initApp: initApp
  };
});
