define(['createjs'], function () {
  var oldPt, oldMidPt, color, stroke, stage, drawingCanvas, title;
  var index = 0;
  var colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

  function ArtScene(s) {
    stage = s;
    stage.autoClear = false;
    stage.enableDOMEvents(true);

    createjs.Touch.enable(stage);
    createjs.Ticker.framerate = 24;

    this.init();
  }

  ArtScene.prototype.init = function () {
    drawingCanvas = new createjs.Shape();
    title = new createjs.Text("Click and Drag to draw", "36px Arial", "#777777");
    title.x = 300;
    title.y = 200;
    stage.addChild(title);
    stage.addChild(drawingCanvas);
  };

  function handleMouseDown(event) {
    if (!event.primary) {
      return;
    }
    if (stage.contains(title)) {
      stage.clear();
      stage.removeChild(title);
    }
    color = colors[(index++) % colors.length];
    stroke = Math.random() * 30 + 10 | 0;
    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt.clone();
    stage.addEventListener("stagemousemove", handleMouseMove);
  }

  function handleMouseMove(event) {
    if (!event.primary) {
      return;
    }
    var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);
    drawingCanvas.graphics.clear()
      .setStrokeStyle(stroke, 'round', 'round')
      .beginStroke(color).moveTo(midPt.x, midPt.y)
      .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;
    oldMidPt.x = midPt.x;
    oldMidPt.y = midPt.y;
    stage.update();
  }

  function handleMouseUp(event) {
    if (!event.primary) {
      return;
    }
    stage.removeEventListener("stagemousemove", handleMouseMove);
  }

  ArtScene.prototype.action = function () {
    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);
    stage.update();
    return drawingCanvas;
  };

  ArtScene.prototype.finish = function () {

  };

  return ArtScene;
});
