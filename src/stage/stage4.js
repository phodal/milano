define([
  'src/constants/colors.js',
  'createjs',
], function (COLORS) {
  var stage, preload, light;

  var load = function () {
    stage = new createjs.Stage('demoCanvas');
    createjs.Touch.enable(stage);

    return new Promise(function (resolve, reject) {
      preload = new createjs.LoadQueue();
      preload.addEventListener('complete', function () {
        resolve();
      });
      preload.addEventListener('error', function () {
        reject();
      });
      preload.loadManifest({src: 'assets/manifest/stage4.manifest.json', type: 'manifest'});
    })
  };

  function nextButton() {
    var background = new createjs.Shape();
    background.name = "background";
    background.graphics
      .setStrokeStyle(1)
      .beginStroke(COLORS.MENU_SHADOW_COLOR)
      .beginFill('#ffffff')
      .drawRoundRect(0, 0, 200, 60, 30);

    var label = new createjs.Text("下一章", "24px Arial", COLORS.MENU_COLOR);
    label.name = "label";
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = 200 / 2;
    label.y = 60 / 2;

    var button = new createjs.Container();
    button.name = "button";
    button.x = stage.canvas.width / 2 - 200 / 2;
    button.y = 100;
    button.addChild(background, label);
    stage.addChild(button);

    background.onClick = label.onClick = handleClick;
    button.onClick = handleClick;

    button.addEventListener('click', handleClick);

    function handleClick(event) {
      console.log(event);
      finish();
    }
  }

  var start = function () {
    nextButton();

    createjs.Ticker.timingMode =  createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.addEventListener("tick", function () {
      stage.update();
    });
  };

  var finish = function () {
    stage.removeAllChildren();
    SceneDispatcher.nextScene();
  };

  return {
    load: load,
    start: start,
    finish: finish
  };
});
