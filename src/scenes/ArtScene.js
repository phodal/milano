define(['createjs'], function () {
  var isMouseDown, oldPosition, currentShape, ctx, selectedColor, oldMidX, oldMidY, oldX, oldY;
  var firstLoad, txt, stage, drawingCanvas, title, options, sceneContainer;

  function ArtScene(s, o) {
    stage = s;
    options = o;
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
    isMouseDown = true;
    if (firstLoad) {
      stage.removeChild(txt);
    }

    firstLoad = false;
    var shape = new createjs.Shape();
    oldX = stage.mouseX;
    oldY = stage.mouseY;
    oldMidX = stage.mouseX;
    oldMidY = stage.mouseY;
    var g = shape.graphics;
    var thickness = Math.random() * 30 + 10 | 0;
    g.setStrokeStyle(thickness + 1, 'round', 'round');
    selectedColor = createjs.Graphics.getRGB(Math.random() * 255 | 0, Math.random() * 255 | 0, Math.random() * 255 | 0);
    g.beginStroke(selectedColor);
    stage.addChild(shape);
    currentShape = shape;
  }

  function handleMouseUp() {
    isMouseDown = false;
  }

  ArtScene.prototype.action = function () {
    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);
    stage.update();

    return sceneContainer;
  };

  ArtScene.prototype.finish = function () {
    stage.removeChild(sceneContainer);
  };

  return ArtScene;
});
