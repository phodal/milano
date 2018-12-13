define([
  'src/constants/colors.js',
  'src/stage/stage1/ClockScene.js',
  'createjs'
], function (COLORS, ClockScene) {
  var stage, stageContainer, preload, stageWidth, stageHeight, dragBox, clockScene;
  var lastDragPoint = 0, offset = new createjs.Point(0, 0);

  var load = function () {
    stage = new createjs.Stage('demoCanvas');
    preload = new createjs.LoadQueue();
    createjs.Touch.enable(stage);
    createjs.Sound.alternateExtensions = ["mp3"];
    stageContainer = new createjs.Container();

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;
    clockScene = new ClockScene(stage);

    dragBox = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, stageWidth, stageHeight));
    dragBox.addEventListener("pressmove", startDrag);
    dragBox.addEventListener("pressup", stopDrag);
    stage.addChild(dragBox);

    return new Promise(function (resolve, reject) {
      preload.installPlugin(createjs.Sound);
      preload.addEventListener('complete', function () {
        resolve();
      });
      preload.addEventListener('error', function () {
        reject();
      });
      preload.loadManifest({src: 'assets/manifest/stage1.manifest.json', type: 'manifest'});
    })
  };

  function startDrag(event) {
    if (lastDragPoint === 0) {
      lastDragPoint = event.stageY;
      return;
    }
    offset.y = event.stageY - lastDragPoint;
    var newStageY = stageContainer.y + offset.y;
    // 限制拖拽的高度
    if (newStageY > 0 || Math.abs(newStageY) > stage.canvas.height * 0.8) {
      return;
    }
    stageContainer.y = newStageY;
    stage.update();
    lastDragPoint = event.stageY;
  }

  function stopDrag(event) {
    lastDragPoint = 0;
  }

  var start = function () {
    clockScene.action();
    var soundInstance = createjs.Sound.play("definite.mp3", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
    stage.addChild(stageContainer);
    stage.addEventListener('click', function () {
      soundInstance.loop = 0;
    });

    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.on('tick', handleTick);

    function handleTick(event) {
      clockScene.tick(event);
      stage.update(event);
    }
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
