define([
  'src/constants/colors.js',
  'src/stage/stage1/ClockScene.js',
  'src/scenes/SelectScene.js',
  'src/utils/EventBus.js',
  'src/services/QuestionServices.js',
  'createjs'
], function (COLORS, ClockScene, SelectScene, EventBus, QuestionServices) {
  var stage, stageContainer, preload, stageWidth, stageHeight, dragBox, clockScene, selectScene;
  var background, lastDragPoint = 0, offset = new createjs.Point(0, 0);

  var load = function () {
    background = new createjs.Shape();
    stage = new createjs.Stage('demoCanvas');
    preload = new createjs.LoadQueue();
    createjs.Touch.enable(stage);
    createjs.Sound.alternateExtensions = ['mp3'];
    stageContainer = new createjs.Container();

    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;
    clockScene = new ClockScene(stage);

    dragBox = new createjs.Shape(new createjs.Graphics().beginFill('#ffffff').drawRect(0, 0, stageWidth, stageHeight));
    dragBox.addEventListener('pressmove', startDrag);
    dragBox.addEventListener('pressup', stopDrag);
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

  function handleClock() {
    var clockContainer = clockScene.action();
    var soundInstance = createjs.Sound.play('definite.mp3', {interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1});
    clockContainer.addEventListener('click', function () {
      clockContainer.removeAllChildren();
      soundInstance.loop = 0;
      EventBus.post('stage1.clock.done');
    });

    stage.addChild(clockContainer);
  }

  var start = function () {
    var isClockDone = false;
    var sleepImg = preload.getResult("sleep");
    background.graphics.beginBitmapFill(sleepImg, 'no-repeat')
      .drawRect(0, 0, stageWidth, stageHeight);
    background.alpha = 0;

    stageContainer.addChild(background);
    stage.addChild(stageContainer);

    handleClock();

    selectScene = new SelectScene(stage, QuestionServices.getByType('stage1.getup'));
    EventBus.subscribe('stage1.clock.done', function () {
      isClockDone = true;
      createjs.Tween.get(background).to({alpha: 0.5}, 1000);
      selectScene.action();
    });

    EventBus.subscribe('select.scene.done', function (data) {
      console.log(data);
      createjs.Tween.get(background).to({alpha: 1}, 1000);
      selectScene.finish();
    });

    createjs.Ticker.on('tick', handleTick);

    function handleTick(event) {
      clockScene.tick(event);
      if (isClockDone) {
        selectScene.tick(event);
      }
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
