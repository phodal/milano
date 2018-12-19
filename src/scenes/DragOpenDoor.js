define([
  'createjs'
], function () {
  var stageWidth, stageHeight, sceneContainer, staticShape, dragTarget, stage;
  var lastDragPoint = 0;
  var offset = new createjs.Point(0, 0);
  var circleRadius = 30;

  function DragOpenDoor(s) {
    stage = s;
    sceneContainer = new createjs.Container();

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;

    this.init();
  }

  DragOpenDoor.prototype.init = function () {
    staticShape = sceneContainer.addChild(new createjs.Shape());
    staticShape.graphics.beginFill("blue")
      .drawRect(0, stageHeight + 240 - circleRadius - 5, stageWidth, circleRadius * 2 + 10);
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
    if (newX < circleRadius || Math.abs(newX) > stageWidth - circleRadius) {
      return;
    }
    console.log(newX);
    dragTarget.x = newX;
    lastDragPoint = event.stageX;
  }

  function stopDrag(event) {
    lastDragPoint = 0;
  }

  DragOpenDoor.prototype.tick = function () {

  };

  DragOpenDoor.prototype.action = function () {
    return sceneContainer;
  };

  return DragOpenDoor;
});
