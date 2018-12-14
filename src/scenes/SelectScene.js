define([
  'src/constants/colors.js',
  'createjs'
], function (COLORS) {
  var stage, background, sceneContainer, questions;
  var questionHeight = 40;
  var questionMargin = 20;
  var qWidthRatio = 4 / 5;

  function SelectScene(s, q) {
    stage = s;
    questions = q;

    sceneContainer = new createjs.Container();
    background = new createjs.Shape();
  }

  function createQuestion(str, posX, posY) {
    var rectW = stage.canvas.width * qWidthRatio, rectY = questionHeight;
    var questionBG = new createjs.Shape();
    questionBG.name = "questionBG";
    questionBG.graphics
      .setStrokeStyle(1)
      .beginStroke(COLORS.MENU_COLOR)
      .beginFill('#ffffff')
      .drawRoundRect(0, 0, rectW, questionHeight, 20);

    var questionText = new createjs.Text(str, "24px Arial", COLORS.MENU_COLOR);
    questionText.name = "questionText";
    questionText.textAlign = "left";
    questionText.textBaseline = "middle";
    questionText.x = questionHeight;
    questionText.y = rectY / 2;

    var button = new createjs.Container();
    button.name = "button";
    button.x = posX;
    button.y = posY;
    button.addChild(questionBG, questionText);
    sceneContainer.addChild(button);

    background.onClick = questionText.onClick = handleClick;
    button.onClick = handleClick;
    button.addEventListener('click', handleClick);

    function handleClick(event) {
      console.log(event);
    }
  }

  SelectScene.prototype.init = function () {
    var stageW = stage.canvas.width;
    var stageH = stage.canvas.height;
    background.graphics.beginFill(COLORS.SELECT_BG).drawRect(0, 0, stageW, stageH);
    background.alpha = 0.5;

    var blurFilter = new createjs.BlurFilter(stageW, stageW, 1);
    background.filters = [blurFilter];
    var bounds = blurFilter.getBounds();

    background.cache(-50 + bounds.x, -50 + bounds.y, 100 + stageW, 100 + stageH);

    var qX = stageW * (1 - qWidthRatio) / 2, qY = (stageH - questions.length * (questionHeight + questionMargin)) / 2;
    for (var i = 0; i < questions.length; i++) {
      createQuestion(questions[i], qX, qY);
      qY = qY + questionHeight + questionMargin;
    }
  };

  SelectScene.prototype.tick = function () {

  };


  SelectScene.prototype.action = function () {
    sceneContainer.addChild(background);

    this.init();

    stage.addChild(sceneContainer);
    return sceneContainer;
  };

  return SelectScene;
});
