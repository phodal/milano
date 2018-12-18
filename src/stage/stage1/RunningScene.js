define([
  'src/services/CharacterServices.js',
  'createjs',
], function (CharacterServices) {
  var stage, preload, sceneContainer, cloud1, cloud2, character, tree1, tree2, ground;
  var stageWidth, stageHeight, target;

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
    bg2.graphics.beginFill('#000000').drawRect(0, stageHeight / 2, stageWidth, stageHeight / 2);
    bg2.graphics.alpha = 1;
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

    character = new CharacterServices(preload.getResult("grant"), {x: 0, y: stageHeight / 2 + 110});

    sceneContainer.addChild(tree1, tree2, cloud1);
    sceneContainer.addChild(ground);
    character.addToStage(sceneContainer);

    target = sceneContainer.addChild(new createjs.Shape());
    target.graphics.beginFill("red").drawCircle(0, 0, 45)
      .beginFill("white").drawCircle(0, 0, 30)
      .beginFill("red").drawCircle(0, 0, 15);
    target.x = 100;
    target.y = 480;
  };

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
      var position = character.getX() + 150 * deltaS;
      character.setX((position >= stageWidth + character.getWidth()) ? -character.getWidth() : position);
    }

    var pt = character.getObj().localToLocal(100, 0, target);
    var hitTest = target.hitTest(pt.x, pt.y);
    if (hitTest) {
      console.log(hitTest);
      character.playAnimation("jump");
    }
  };

  RunningScene.prototype.action = function () {
    return sceneContainer;
  };

  return RunningScene;
});
