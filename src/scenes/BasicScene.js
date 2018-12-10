define([
  'createjs'
], function () {
  var initialize = function (scene_index, callback) {
    var stage = new createjs.Stage("demoCanvas");
    var circle = new createjs.Shape();
    circle.graphics.beginFill("Crimson").drawCircle(0, 0, 20);
    circle.x = 30;
    circle.y = 30;

    stage.addChild(circle);
    stage.update();

    createjs.Tween.get(circle, {loop: false})
      .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
      .to({alpha: 0, y: 175}, 500, createjs.Ease.getPowInOut(2))
      .to({alpha: 0, y: 225}, 100)
      .call(callback);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
  };

  return {
    initialize: initialize
  };
});
