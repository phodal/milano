function init() {
  var stage = new createjs.Stage("demoCanvas");
  var circle = new createjs.Shape();

  var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
  text.x = 100;
  text.y = 100;
  text.textBaseline = "alphabetic";

  circle.graphics.beginFill("#000").drawCircle(0, 0, 50);
  circle.x = 100;
  circle.y = 100;
  stage.addChild(circle);
  stage.update();
  stage.addChild(text);
  stage.update();
}
