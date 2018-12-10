define([
  'createjs'
], function () {
  var start = function () {
    var stage = new createjs.Stage('demoCanvas');
    var image = new createjs.Bitmap('assets/images/background.png');
    image.x = 100;
    image.y = 100;

    stage.addChild(image);
    createjs.Ticker.on("tick", handleTick);
    function handleTick(event) {
      stage.update();
    }
  };

  return {
    start: start
  };
});
