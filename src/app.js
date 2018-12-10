define([
  'createjs'
], function () {
  var stage = new createjs.Stage("demoCanvas");
  var text = new createjs.Text("Start Game", "20px Arial", "#ff7700");
  text.x = 100;
  text.y = 100;
  text.textBaseline = "alphabetic";
  text.shadow = new createjs.Shadow("#000000", 5, 5, 10);
  text.addEventListener("mouseover", function (event) {
    text.setScale(1, 5);
  });
  text.addEventListener("click", function (event) {
    stage.clear();
  });

  stage.addChild(text);
  stage.update();

  createjs.Ticker.addEventListener("tick", handleTick);

  function handleTick(event) {
    if (!event.paused) {

    }
  }
});
