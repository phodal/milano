define([
  'src/constants/colors.js',
  'createjs'
], function (COLORS) {
  var stage, background, sceneContainer, questions, label;
  function SelectScene(s, q) {
    stage = s;
    questions = q;

    sceneContainer = new createjs.Container();
    background = new createjs.Shape();
  }

  SelectScene.prototype.init = function () {
    background.graphics.beginFill(COLORS.SELECT_BG).drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    background.alpha = 0.5;

    var blurFilter = new createjs.BlurFilter(stage.canvas.width, stage.canvas.width, 1);
    background.filters = [blurFilter];
    var bounds = blurFilter.getBounds();

    background.cache(-50 + bounds.x, -50 + bounds.y, 100 + stage.canvas.width, 100 + stage.canvas.height);

    label = new createjs.Text("下一章", "24px Arial", COLORS.MENU_COLOR);
    label.name = "label";
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = 200 / 2;
    label.y = 60 / 2;
  };

  SelectScene.prototype.tick = function () {

  };


  SelectScene.prototype.action = function () {
    this.init();

    sceneContainer.addChild(background);
    sceneContainer.addChild(label);

    stage.addChild(sceneContainer);
    return sceneContainer;
  };

  return SelectScene;
});
