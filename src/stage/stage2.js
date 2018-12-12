define([
  'src/constants/colors.js',
  'createjs'
], function (COLORS) {
  var stage, preload, keyboardValues = [];
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
    var kX, kY, fontSize = 24;
    for (var charsIndex in KEYBOARDS) {
      kX = 50 + charsIndex * 10;
      kY = stage.canvas.height / 2 + charsIndex * fontSize;
      for (var index in KEYBOARDS[charsIndex]) {
        var char = KEYBOARDS[charsIndex][index];
        var text = new createjs.Text(char, "24px monospace", COLORS.SCENE_TEXT);
        text.x = kX;
        text.y = kY;
        text.textBaseline = "alphabetic";
        kX = kX + fontSize;
        text.addEventListener('click', function (event) {
          keyboardValues.push(event.target.text);
          console.log(keyboardValues);
          finish();
        });
        stage.addChild(text);
      }
    }
  };

  var start = function () {
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
