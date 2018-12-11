define([
  'require',
  'src/scenes/BasicScene.js',
  'src/constants/scenes.js',
  'src/stage/stage1.js',
  'src/stage/stage2.js',
  'src/stage/stage3.js',
  'createjs'
], function (require, BasicScene, SCENES) {
  var currentIndex;
  function goto(scene_index) {
    currentIndex = scene_index;
    switch (scene_index) {
      case 0:
        BasicScene.initialize(SCENES[0], require('src/stage/stage1.js'));
        return;
      case 1:
        BasicScene.initialize(SCENES[1], require('src/stage/stage2.js'));
        return;
      case 2:
        BasicScene.initialize(SCENES[2], require('src/stage/stage3.js'));
        return;
      default:
        return;
    }
  }

  function nextScene() {
    currentIndex = currentIndex + 1;
    goto(currentIndex);
  }

  return {
    goto: goto,
    nextScene: nextScene
  };
});
