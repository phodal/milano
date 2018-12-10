define([
  'createjs'
], function () {
  var stage;
  var image;

  var load = function () {
    stage = new createjs.Stage('demoCanvas');
    image = new createjs.Bitmap('assets/images/background.png');
  };

  var start = function () {
    image.x = 100;
    image.y = 100;

    stage.addChild(image);
    createjs.Ticker.on("tick", handleTick);

    function handleTick() {
      stage.update();
    }
  };

  return {
    load: load,
    start: start
  };
});
