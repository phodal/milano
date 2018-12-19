define([
  'createjs'
], function () {
  var stageWidth, stageHeight, sceneContainer, dragTarget;

  function DragOpenDoor(stage) {
    sceneContainer = new createjs.Container();

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;
  }

  DragOpenDoor.prototype.init = function () {
    dragTarget = sceneContainer.addChild(new createjs.Shape());
    dragTarget.graphics.beginFill("red").drawCircle(0, 0, 30);
    dragTarget.x = stageWidth - 60;
    dragTarget.y = stageHeight - 240;
    dragTarget.addEventListener('click', function () {

    });

    sceneContainer.addChild(dragTarget);
  };

  DragOpenDoor.prototype.tick = function () {

  };

  DragOpenDoor.prototype.action = function () {
    return sceneContainer;
  };

  return DragOpenDoor;
});
