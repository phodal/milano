define([
  'require',
  'src/scenes/TransitionScene.js',
  'src/scenes/GameOverScene.js',
  'src/constants/scenes.js',
  'src/stage/stage1.js',
  'src/stage/stage2.js',
  'src/stage/stage3.js',
  'src/stage/stage4.js',
  'src/stage/stage5.js',
  'createjs'
], function (require, TransitionScene, GameOverScene, SCENES) {
  var currentIndex;

  function goto(scene_index) {
    currentIndex = scene_index;
    TransitionScene.initialize(SCENES[scene_index], require('src/stage/stage' + (scene_index + 1) + '.js'));
  }

  function nextScene() {
    currentIndex = currentIndex + 1;
    goto(currentIndex);
  }

  function prevScene() {
    currentIndex = currentIndex - 1;
    goto(currentIndex);
  }

  function getIndex() {
    return currentIndex;
  }

  function gameOver(val) {
    var gameOverScene = new GameOverScene();
    gameOverScene.start(val);
  }

  return {
    getIndex: getIndex,
    goto: goto,
    nextScene: nextScene,
    prevScene: prevScene,
    gameOver: gameOver
  };
})
;
