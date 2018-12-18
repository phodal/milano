define([
  'createjs'
], function () {
  var instance, distance;

  function DragServices() {

  }

  DragServices.prototype.setDragDistance = function (val) {
    distance = val;
  };

  DragServices.prototype.getDragDistance = function () {
    return distance;
  };

  function createInstance() {
    return new DragServices();
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
});
