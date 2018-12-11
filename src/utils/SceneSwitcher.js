define([
  'src/scenes/BasicScene.js',
  'src/constants/scenes.js',
  'src/stage/stage1.js',
  'createjs'
], function (BasicScene, SCENES, Stage1) {
  var goto = function (scene_index) {
    switch (scene_index) {
      case 0:
        BasicScene.initialize(SCENES[0], Stage1);
      default:
        return;
    }
  };

  return {
    goto: goto
  };
});
