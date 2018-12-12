define([
  'src/constants/colors.js',
  'createjs'
], function (COLORS) {
  var stage, preload, typingValue, keyboardValues = [];
  var KEYBOARDS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

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
      preload.loadManifest({src: 'assets/manifest/stage2.manifest.json', type: 'manifest'});
    })
  };

  var createKeyboards = function () {
    var kX, kY, fontSize = 30;
    for (var charsIndex in KEYBOARDS) {
      kX = 50 + charsIndex * 10;
      kY = stage.canvas.height / 2 + charsIndex * fontSize;
      for (var index in KEYBOARDS[charsIndex]) {
        var char = KEYBOARDS[charsIndex][index];
        var keyContainer = new createjs.Container();

        var bg1 = new createjs.Shape();
        bg1.graphics.beginFill("#cccccc").drawRect(kX - fontSize / 2 + 8, kY - fontSize / 2 - 5,
          fontSize - 2, fontSize - 2);

        var text = new createjs.Text(char, "24px monospace", COLORS.KEYBOARD);
        text.x = kX;
        text.y = kY;
        text.textBaseline = "alphabetic";
        kX = kX + fontSize;

        keyContainer.addChild(bg1, text);
        text.addEventListener('click', function (event) {
          keyboardValues.push(event.target.text);
          typingValue.text = typingValue.text + event.target.text;
          typingValue.x = typingValue.x - fontSize / 3;
          stage.update();
        });
        stage.addChild(keyContainer);
      }
    }
  };

  var start = function () {
    typingValue = new createjs.Text('', '20px monospace', COLORS.KEYBOARD);
    typingValue.x = stage.canvas.width / 2;
    typingValue.y = 100;
    typingValue.textBaseline = "alphabetic";

    stage.addChild(typingValue);

    createKeyboards();
    stage.update();

    createjs.Ticker.on('tick', function (event) {
      stage.update();
    });
  };

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
