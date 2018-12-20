define(['createjs'], function () {
  var moveStageX, moveStageY, art, listener, color, hue = 0;
  var stage, sceneContainer, stopButton, clearButton, shape, isEnableDraw = false;
  var isErase = false;

  function ArtScene(s) {
    stage = s;
    sceneContainer = new createjs.Container();

    art = stage.addChild(new createjs.Shape());
    art.cache(0, 0, stage.canvas.width, stage.canvas.height);

    stage.on("stagemousedown", startDraw, this);
  }

  ArtScene.prototype.tick = function (event) {

  };

  function startDraw(evt) {
    if (!isEnableDraw) {
      return;
    }

    listener = stage.on("stagemousemove", draw, this);
    stage.on("stagemouseup", endDraw, this);
    color = createjs.Graphics.getHSL(hue += 85, 50, 50);
    moveStageX = evt.stageX - 0.001; // offset so we draw an initial dot
    moveStageY = evt.stageY - 0.001;
    draw(evt); // draw the initial dot
  }

  function draw(evt) {
    art.graphics.setStrokeStyle(20, 1)
      .beginStroke(color)
      .moveTo(moveStageX, moveStageY)
      .lineTo(evt.stageX, evt.stageY);

    art.updateCache(isErase ? "destination-out" : "source-over");

    art.graphics.clear();
    moveStageX = evt.stageX;
    moveStageY = evt.stageY;
    stage.update();
  }

  function endDraw(evt) {
    stage.off("stagemousemove", listener);
    evt.remove();
  }

  ArtScene.prototype.action = function () {
    var that = this;

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
      isErase = !isErase;
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
