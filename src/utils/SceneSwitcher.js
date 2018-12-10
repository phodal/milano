define([
  'src/scenes/BasicScene.js',
  'src/stage/stage1.js',
  'createjs'
], function (BasicScene, Stage1) {
  var goto = function (scene_index) {
    BasicScene.initialize(scene_index, Stage1);
  };

  return {
    goto: goto
  };
});
