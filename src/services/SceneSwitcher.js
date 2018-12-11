define([
  'src/scenes/BasicScene.js',
  'src/constants/scenes.js',
  'src/stage/stage1.js',
  'src/stage/stage2.js',
  'createjs'
], function (BasicScene, SCENES, Stage1, Stage2) {
  var currentIndex;
  function goto(scene_index) {
    currentIndex = scene_index;
    switch (scene_index) {
      case 0:
        BasicScene.initialize(SCENES[0], Stage1);
        return;
      case 1:
        BasicScene.initialize(SCENES[1], Stage2);
        return;
      default:
        return;
    }
  }

  function nextScene() {
    console.log(currentIndex);
  }

  return {
    goto: goto,
    nextScene: nextScene
  };
});
