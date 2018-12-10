define([
  'src/scenes/BasicScene.js',
  'src/stage/stage1.js',
  'createjs'
], function (BasicScene, Stage1) {
  var goto = function (scene_index) {
    BasicScene.initialize(scene_index, function () {
      console.log('START SCENE: ' + scene_index);
      Stage1.start();
    });
  };

  return {
    goto: goto
  };
});
