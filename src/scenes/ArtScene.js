define(['createjs'], function () {
  var isMouseDown, oldPosition, currentShape, selectedColor, oldMidX, oldMidY, oldX, oldY;
  var firstLoad, txt, stage, sceneContainer, stopButton, clearButton, shape, isEnableDraw = false;

  function ArtScene(s) {
    stage = s;
    stage.enableDOMEvents(true);
    sceneContainer = new createjs.Container();
    oldPosition = new createjs.Point(stage.mouseX, stage.mouseY);
    stage.autoClear = true;
    stage.onMouseDown = handleMouseDown;
    stage.onMouseUp = handleMouseUp;

    createjs.Touch.enable(stage);
    createjs.Ticker.framerate = 24;
  }

  ArtScene.prototype.tick = function (event) {
    if (isMouseDown) {
      var pt = new createjs.Point(stage.mouseX, stage.mouseY);
      var midPoint = new createjs.Point(oldX + pt.x >> 1, oldY + pt.y >> 1);
      currentShape
        .graphics.moveTo(midPoint.x, midPoint.y)
        .curveTo(oldX, oldY, oldMidX, oldMidY);

      oldX = pt.x;
      oldY = pt.y;

      oldMidX = midPoint.x;
      oldMidY = midPoint.y;

      stage.update();
    }
  };

  function handleMouseDown() {
    if (!isEnableDraw) {
      return;
    }
    isMouseDown = true;
    if (firstLoad) {
      stage.removeChild(txt);
    }

    firstLoad = false;
    shape = new createjs.Shape();
    oldX = stage.mouseX;
    oldY = stage.mouseY;
    oldMidX = stage.mouseX;
    oldMidY = stage.mouseY;
    var g = shape.graphics;
    var thickness = Math.random() * 10 + 5 | 0;
    g.setStrokeStyle(thickness + 1, 'round', 'round');
    selectedColor = createjs.Graphics.getRGB(Math.random() * 255 | 0, Math.random() * 255 | 0, Math.random() * 255 | 0);
    g.beginStroke(selectedColor);
    sceneContainer.addChild(shape);
    currentShape = shape;

    sceneContainer.setChildIndex(stopButton, sceneContainer.numChildren - 1);
    sceneContainer.setChildIndex(clearButton, sceneContainer.numChildren - 2);
  }

  function handleMouseUp() {
    isMouseDown = false;
  }

  ArtScene.prototype.action = function () {
    var that = this;

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);
    stage.update();

    stopButton = new createjs.Shape(new createjs.Graphics()
      .beginFill('#ffffff')
      .drawCircle(30, 30, 15));
    stopButton.addEventListener('click', function (event) {
      that.finish();
    });

    clearButton = new createjs.Shape(new createjs.Graphics()
      .beginFill('#000000')
      .drawRect(80, 15, 30, 30));
    clearButton.addEventListener('click', function (event) {

    });

    sceneContainer.addChild(stopButton);
    sceneContainer.addChild(clearButton);
    return sceneContainer;
  };

  ArtScene.prototype.isEnableDraw = function () {
    return isEnableDraw;
  };

  ArtScene.prototype.enableDraw = function (val) {
    isEnableDraw = val;
  };

  ArtScene.prototype.finish = function () {
    sceneContainer.removeAllChildren();
    stage.removeChild(sceneContainer);
    stage.update();
  };

  return ArtScene;
});
