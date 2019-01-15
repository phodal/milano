define([
  'src/services/CharacterServices.js',
  'src/constants/colors.js',
  'createjs',
], function (CharacterServices, Colors) {
  var stage, preload, sceneContainer, cloud1, cloud2, character, tree1, tree2, ground;
  var stageWidth, stageHeight, jumpButton, clockShape, timeContainer, insideCircle;
  var virtualTime = 50;
  var rectWidth = 60;
  var rectHeight = 16;

  function RunningGame(s, p) {
    stage = s;
    preload = p;
    sceneContainer = new createjs.Container();

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;

    this.init();
  }

  function createActionButtons() {
    jumpButton = sceneContainer.addChild(new createjs.Shape());
    jumpButton.graphics
      .setStrokeStyle(1)
      .beginStroke("red")
      .beginFill("#ffffff").drawCircle(0, 0, 24);
    jumpButton.alpha = 0.4;
    jumpButton.x = stageWidth - 40;
    jumpButton.y = stageHeight - 40;
    jumpButton.addEventListener('click', function () {
      character.playAnimation('jump');
    });

    sceneContainer.addChild(jumpButton);

    insideCircle = new createjs.Text("↑", "32px monospace", "#ffffff");
    insideCircle.alpha = 1;
    var bounds = insideCircle.getBounds();
    insideCircle.x = stageWidth - 40 - bounds.width / 2;
    insideCircle.y = stageHeight - 40;
    insideCircle.textBaseline = "middle";
    sceneContainer.addChild(insideCircle);
  }

  RunningGame.prototype.init = function () {
    var bg2 = new createjs.Shape();
    bg2.graphics
      .beginLinearGradientFill(["rgba(255,198,255,1)", "rgba(0,255,0,1)"], [0, 1], 0, 0, 0, stageHeight * 3)
      .drawRoundRect(0, stageHeight / 2, stageWidth, stageHeight / 2, 0);

    sceneContainer.addChild(bg2);

    var groundImg = preload.getResult("ground");
    ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, stageWidth + groundImg.width, groundImg.height);
    ground.tileW = groundImg.width;
    ground.y = stageHeight - groundImg.height;

    tree1 = new createjs.Bitmap(preload.getResult("tree1"));
    tree1.setTransform(Math.random() * stageWidth, stageHeight - tree1.image.height - groundImg.height + 10, 1, 1);
    tree2 = new createjs.Bitmap(preload.getResult("tree2"));
    tree2.setTransform(Math.random() * stageWidth, stageHeight - tree2.image.height - groundImg.height + 10, 1, 1);

    cloud1 = new createjs.Bitmap(preload.getResult("cloud1"));
    cloud1.setTransform(Math.random() * stageWidth, stageHeight - cloud1.image.height - groundImg.height - 100, 0.5, 0.5);
    cloud1.alpha = 1;

    character = new CharacterServices(preload.getResult("grant"), {x: 0, y: 0});
    character.setY(stageHeight - groundImg.height - character.getHeight());

    sceneContainer.addChild(tree1, tree2, cloud1);
    sceneContainer.addChild(ground);
    character.addToStage(sceneContainer);

    createActionButtons();

    createClockLine();
  };

  function createClockLine() {
    virtualTime++;
    if (timeContainer) {
      sceneContainer.removeChild(timeContainer);
    }

    if (virtualTime > 60) {
      return;
    }

    timeContainer = new createjs.Container();
    timeContainer.name = "button";
    timeContainer.x = stageWidth;
    timeContainer.y = stageHeight - 100 + Math.random() * 20;

    clockShape = new createjs.Shape();
    clockShape.graphics
      .beginFill(createjs.Graphics.getHSL(Math.random() * 360, 100, 50))
      .drawCircle(0, 0, rectHeight / 2);
    clockShape.x = 0;
    clockShape.y = rectHeight / 2;

    var shapeText = new createjs.Text("7:" + virtualTime, "16px monospace", Colors.KEYBOARD);
    shapeText.x = rectWidth / 2;
    shapeText.y = rectHeight / 2;
    shapeText.textAlign = "center";
    shapeText.textBaseline = "middle";

    timeContainer.addChild(clockShape, shapeText);
    sceneContainer.addChild(timeContainer);
  }

  RunningGame.prototype.tick = function (event) {
    character.tick();
    var deltaS = event.delta / 1000;
    tree1.x = (tree1.x - deltaS * 30);
    if (tree1.x + tree1.image.width * tree1.scaleX <= 0) {
      tree1.x = stageWidth;
    }
    tree2.x = (tree2.x - deltaS * 45);
    if (tree2.x + tree2.image.width * tree2.scaleX <= 0) {
      tree2.x = stageWidth;
    }
    cloud1.x = (cloud1.x - deltaS * 15);
    if (cloud1.x + cloud1.image.width * cloud1.scaleX <= 0) {
      cloud1.x = stageWidth;
    }

    if (character) {
      var position = character.getX() + 15 * deltaS;
      character.setX((position >= stageWidth + character.getWidth()) ? -character.getWidth() : position);
    }

    // TODO：碰撞检测
    timeContainer.x = timeContainer.x - 6;
    var pt = character.getObj().localToLocal(100, 120, timeContainer);
    var hitTest = timeContainer.hitTest(pt.x, pt.y);
    if (hitTest) {
      console.log(hitTest);
    }

    if (timeContainer.x <= 0) {
      createClockLine();
    }
  };

  function checkIntersection(rect1, rect2) {
    if (rect1.x >= rect2.x + rect2.width
      || rect1.x + rect1.width <= rect2.x
      || rect1.y >= rect2.y + rect2.height
      || rect1.y + rect1.height <= rect2.y) {
      return false;
    }
    return true;
  }

  RunningGame.prototype.action = function () {
    return sceneContainer;
  };

  return RunningGame;
});
