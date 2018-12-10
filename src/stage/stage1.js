define([
  'createjs'
], function () {
  var start = function () {
    var stage = new createjs.Stage('demoCanvas');
    var image = new createjs.Bitmap('assets/images/background.png');
    image.x = 100;
    image.y = 100;

    var blur = new createjs.BlurFilter(50, 50, 1);
    image.filters = [blur];

    stage.addChild(image);
    createjs.Ticker.on("tick", handleTick);

    function handleTick() {
      stage.update();
    }
  };

  return {
    start: start
  };
});
