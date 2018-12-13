define([
  'src/constants/colors.js',
  'createjs'
], function (COLORS) {
  var stage, stageContainer, preload, hill1, hill2, stageWidth, stageHeight, ground, dragBox, sunShape;
  var lastDragPoint = 0, offset = new createjs.Point(0, 0);

  var load = function () {
    stage = new createjs.Stage('demoCanvas');
    createjs.Touch.enable(stage);
    stageContainer = new createjs.Container();
    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;

    dragBox = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, stageWidth, stageHeight));
    dragBox.addEventListener("pressmove", startDrag);
    dragBox.addEventListener("pressup", stopDrag);
    stage.addChild(dragBox);

    return new Promise(function (resolve, reject) {
      preload = new createjs.LoadQueue();
      preload.addEventListener('complete', function () {
        resolve();
      });
      preload.addEventListener('error', function () {
        reject();
      });
      preload.loadManifest({src: 'assets/manifest/stage1.manifest.json', type: 'manifest'});
    })
  };

  function updateHill(event) {
    var deltaS = event.delta / 1000;
    hill1.x = (hill1.x - deltaS * 30);
    if (hill1.x + hill1.image.width * hill1.scaleX <= 0) {
      hill1.x = stageWidth;
    }
    hill2.x = (hill2.x - deltaS * 45);
    if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
      hill2.x = stageWidth;
    }
  }

  function createBackground() {
    var groundImg = preload.getResult("ground");
    ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, stageWidth + groundImg.width, groundImg.height);
    ground.tileW = groundImg.width;
    ground.y = stageHeight - groundImg.height;

    hill1 = new createjs.Bitmap(preload.getResult("hill1"));
    hill1.setTransform(Math.random() * stageWidth, stageHeight - hill1.image.height * 4 - groundImg.height, 4, 4);
    hill1.alpha = 0.5;
    hill2 = new createjs.Bitmap(preload.getResult("hill2"));
    hill2.setTransform(Math.random() * stageWidth, stageHeight - hill2.image.height * 3 - groundImg.height, 3, 3);

    stageContainer.addChild(hill1, hill2);
    stageContainer.addChild(ground);
  }

  function createSun() {
    sunShape = new createjs.Shape().set({x: 100, y: 100});
    var blurFilter = new createjs.BlurFilter(10, 10, 1);
    var bounds = blurFilter.getBounds();

    sunShape.graphics.beginFill(COLORS.NORMAL_SUN).drawCircle(0, 0, 30);
    sunShape.filters = [blurFilter];

    sunShape.cache(-50 + bounds.x, -50 + bounds.y, 100 + bounds.width, 100 + bounds.height);
    sunShape.addEventListener('click', function () {
      finish();
    });

    stageContainer.addChild(sunShape);
    createjs.Tween.get(sunShape).to({x: stageWidth - 100}, 50000, createjs.Ease.getPowIn(2.2));
  }

  function startDrag(event) {
    if (lastDragPoint === 0) {
      lastDragPoint = event.stageY;
      return;
    }
    offset.y = event.stageY - lastDragPoint;
    var newStageY = stageContainer.y + offset.y;
    // 限制拖拽的高度
    if (newStageY > 0 || Math.abs(newStageY) > stage.canvas.height * 0.8) {
      return;
    }
    stageContainer.y = newStageY;
    stage.update();
    lastDragPoint = event.stageY;
  }

  function stopDrag(event) {
    lastDragPoint = 0;
  }

  var start = function () {
    createBackground();
    createSun();

    stage.addChild(stageContainer);

    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.on('tick', handleTick);

    function handleTick(event) {
      updateHill(event);
      var l = stageContainer.numChildren;
      for (var i = 0; i < l; i++) {
        var child = stageContainer.getChildAt(i);
        child.alpha = 1;
        var pt = child.globalToLocal(stage.mouseX, stage.mouseY);
        if (stage.mouseInBounds && child.hitTest(pt.x, pt.y)) {
          child.alpha = 0.8;
        }
      }

      stage.update(event);
    }
  };

  var finish = function () {
    stage.removeAllChildren();
    SceneSwitcher.nextScene();
  };

  return {
    load: load,
    start: start,
    finish: finish
  };
});
