define([
  'require',
  'src/scenes/BasicScene.js',
  'src/constants/scenes.js',
  'src/stage/stage1.js',
  'src/stage/stage2.js',
  'src/stage/stage3.js',
  'src/stage/stage4.js',
  'src/stage/stage5.js',
  'createjs'
], function (require, BasicScene, SCENES) {
  var currentIndex;

  function goto(scene_index) {
    currentIndex = scene_index;
    BasicScene.initialize(SCENES[scene_index], require('src/stage/stage' + (scene_index + 1) + '.js'));
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
    console.log(currentIndex);
    return currentIndex;
  }

  return {
    getIndex: getIndex,
    goto: goto,
    nextScene: nextScene,
    prevScene: prevScene
  };
})
;
