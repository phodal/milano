define([
  'createjs'
], function () {
  var stageWidth, stageHeight, sceneContainer;

  function DragOpenDoor(stage) {
    sceneContainer = new createjs.Container();

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;
  }

  DragOpenDoor.prototype.init = function () {

  };

  DragOpenDoor.prototype.tick = function () {

  };

  DragOpenDoor.prototype.action = function () {
    return sceneContainer;
  };

  return DragOpenDoor;
});
