define([
  'src/constants/colors.js',
  'src/effects/snow.js',
  'createjs',
], function (COLORS, Snow) {
  var stage, preload, snow;

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
      preload.loadManifest({src: 'assets/manifest/stage3.manifest.json', type: 'manifest'});
    })
  };

  var start = function () {
    var keyContainer = new createjs.Container();
    var background = new createjs.Shape();
    background.graphics.beginFill("#f5f5f5").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    keyContainer.addChild(background);

    stage.addChild(keyContainer);

    snow = new Snow(stage);
    snow.action();

    nextButton();

    createjs.Ticker.on('tick', function () {
      stage.update();
    });

    stage.update();
  };

  function nextButton() {
    var background = new createjs.Shape();
    background.name = "background";
    background.graphics
      .setStrokeStyle(1)
      .beginStroke(COLORS.MENU_COLOR)
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
    button.y = stage.canvas.height - 100;
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

  var finish = function () {
    stage.removeAllChildren();
    SceneSwitcher.nextScene();
  };

  return {
    load: load,
    start: start,
    finish: finish
  };
});
