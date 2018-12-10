define([
  'createjs'
], function () {
  var stage;
  var image;
  var preload;

  var load = function () {
    stage = new createjs.Stage('demoCanvas');
    return new Promise(function (resolve, reject) {
      preload = new createjs.LoadQueue();
      preload.addEventListener('complete', function () {
        resolve();
      });
      preload.addEventListener('error', function () {
        reject();
      });
      preload.loadFile({ src: 'assets/images/background.png', id: 'background'});
    })
  };

  var start = function () {
    image = new createjs.Bitmap(preload.getResult("background"));

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
