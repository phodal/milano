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
        bg1.graphics.beginFill(COLORS.KEYBOARD_BG).drawRoundRectComplex(kX - fontSize / 2 + 8, kY - fontSize / 2 - 5,
          fontSize - 2, fontSize - 2, 4, 4,4,4);

        var keyboardText = new createjs.Text(char, "24px monospace", COLORS.KEYBOARD);
        keyboardText.x = kX;
        keyboardText.y = kY;
        keyboardText.textBaseline = "alphabetic";
        kX = kX + fontSize;

        var blurFilter = new createjs.BlurFilter(1, 1, 1);
        keyboardText.filters = [blurFilter];
        var bounds = blurFilter.getBounds();

        keyboardText.cache(-50 + bounds.x, -50 + bounds.y, 100 + bounds.width, 100 + bounds.height);

        keyContainer.addChild(bg1, keyboardText);
        keyContainer.on('click', function (event) {
          var text = event.currentTarget.children[1].text;
          keyboardValues.push(text);
          typingValue.text = typingValue.text + text;
          typingValue.x = typingValue.x - fontSize / 3;
          stage.update();
        });
        stage.addChild(keyContainer);
      }
    }
  };

  var start = function () {
    typingValue = new createjs.Text('', '20px monospace', COLORS.SCENE_TEXT);
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
