define([
  'createjs'
], function () {
  var stageWidth, stageHeight, sceneContainer, staticShape, dragTarget, stage, finishCallback, dragCallback;
  var lastDragPoint = 0;
  var offset = new createjs.Point(0, 0);
  var circleRadius = 15;
  var isAlreadyFinish = false;
  var hasCallDragCallback = false;

  function DragOpenDoor(s) {
    stage = s;
    sceneContainer = new createjs.Container();

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;
    finishCallback = function () {

    };
    this.init();
  }

  DragOpenDoor.prototype.init = function () {
    staticShape = sceneContainer.addChild(new createjs.Shape());
    staticShape.graphics
      .beginLinearGradientFill(["rgba(255,198,255,1)", "rgba(0,255,0,1)"], [0, 1], 0, 0, stageWidth * 3, 0)
      .drawRect(0, stageHeight + 240 - circleRadius - 5, stageWidth, circleRadius * 2 + 10);
    staticShape.alpha = 0.8;

    staticShape.addEventListener('click', function (event) {
      dragTarget.x = event.stageX;
    });

    sceneContainer.addChild(staticShape);

    dragTarget = sceneContainer.addChild(new createjs.Shape());

    dragTarget.graphics.beginFill("red").drawCircle(0, 0, circleRadius);
    dragTarget.x = circleRadius;
    dragTarget.y = stageHeight + 240;

    dragTarget.addEventListener('pressmove', startDrag);
    dragTarget.addEventListener('pressup', stopDrag);

    sceneContainer.addChild(dragTarget);
  };

  function startDrag(event) {
    if (lastDragPoint === 0) {
      lastDragPoint = event.stageX;
      return;
    }
    offset.x = event.stageX - lastDragPoint;
    var newX = dragTarget.x + offset.x;
    if (newX < circleRadius) {
      return;
    }
    if (Math.abs(newX) > stageWidth - circleRadius * 2) {
      if (!isAlreadyFinish) {
        isAlreadyFinish = true;
        DragOpenDoor.prototype.finish();
      }
      return;
    }
    dragTarget.x = newX;
    lastDragPoint = event.stageX;
    if (!hasCallDragCallback) {
      hasCallDragCallback = true;
      dragCallback();
    }
  }

  function stopDrag(event) {
    lastDragPoint = 0;
  }

  DragOpenDoor.prototype.tick = function () {

  };

  DragOpenDoor.prototype.action = function () {
    return sceneContainer;
  };

  DragOpenDoor.prototype.hadDrag = function (callback) {
    dragCallback = callback;
  };

  DragOpenDoor.prototype.finish = function () {
    createjs.Tween.get(sceneContainer)
      .to({alpha: 0}, 500, createjs.Ease.get(1))
      .call(function () {
        sceneContainer.removeAllChildren();
        finishCallback();
      })
  };

  DragOpenDoor.prototype.onFinish = function (callback) {
    finishCallback = callback;
  };

  return DragOpenDoor;
});
