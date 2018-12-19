define([
  'src/services/CharacterServices.js',
  'src/constants/colors.js',
  'createjs',
], function (CharacterServices, Colors) {
  var stage, preload, sceneContainer, cloud1, cloud2, character, tree1, tree2, ground;
  var stageWidth, stageHeight, target, clockShape, timeContainer;

  function RunningScene(s, p) {
    stage = s;
    preload = p;
    sceneContainer = new createjs.Container();

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;

    this.init();
  }

  RunningScene.prototype.init = function () {
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

    target = sceneContainer.addChild(new createjs.Shape());
    target.graphics.beginFill("red").drawCircle(0, 0, 30);
    target.x = stageWidth - 60;
    target.y = stageHeight - 240;
    target.addEventListener('click', function () {
      character.playAnimation("jump");
    });

    sceneContainer.addChild(target);

    createClockLine();
  };

  function createClockLine() {
    if (timeContainer) {
      sceneContainer.removeChild(timeContainer);
    }

    timeContainer = new createjs.Container();
    timeContainer.name = "button";
    timeContainer.x = stageWidth;
    timeContainer.y = stageHeight - 100 - Math.random() * 50;

    clockShape = new createjs.Shape();
    clockShape.graphics
      .beginFill(createjs.Graphics.getHSL(Math.random() * 360, 100, 50))
      .drawRoundRect(0, 0, 60, 20, 5);
    clockShape.x = 0;
    clockShape.y = 0;

    var shapeText = new createjs.Text("7:50", "14px monospace", Colors.KEYBOARD);
    shapeText.x = 15;
    shapeText.y = 15;
    shapeText.textBaseline = "alphabetic";

    timeContainer.addChild(clockShape, shapeText);
    sceneContainer.addChild(timeContainer);
  }

  RunningScene.prototype.tick = function (event) {
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
      var position = character.getX() + 50 * deltaS;
      character.setX((position >= stageWidth + character.getWidth()) ? -character.getWidth() : position);
    }

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

  RunningScene.prototype.action = function () {
    return sceneContainer;
  };

  return RunningScene;
});
