define([
  'src/constants/colors.js',
  'src/stage/stage1/ClockScene.js',
  'src/games/RunningGame.js',
  'src/scenes/SelectScene.js',
  'src/scenes/ArtScene.js',
  'src/utils/EventBus.js',
  'src/services/QuestionServices.js',
  'src/services/DragServices.js',
  'src/scenes/DragOpenDoor.js',
  'createjs'
], function (COLORS, ClockScene, RunningGame, SelectScene, ArtScene, EventBus, QuestionServices,
             DragServices, DragOpenDoor) {
  var stage, stageContainer, preload, stageWidth, stageHeight, dragBox, clockScene, selectScene, artScene;
  var background, lastDragPoint = 0, offset = new createjs.Point(0, 0),  isRunningGame = false, runningGame;
  var isClockDone = false;
  var dragRatio = 0.8;

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
    if (artScene && artScene.isEnableDraw()) {
      return;
    }
    if (lastDragPoint === 0) {
      lastDragPoint = event.stageY;
      return;
    }
    offset.y = event.stageY - lastDragPoint;
    var newStageY = stageContainer.y + offset.y;
    // 限制拖拽的高度
    if (newStageY > 0 || Math.abs(newStageY) > stage.canvas.height * dragRatio) {
      return;
    }
    stageContainer.y = newStageY;
    stage.update();
    lastDragPoint = event.stageY;

    DragServices.getInstance().setDragDistance(newStageY);
  }

  function stopDrag(event) {
    lastDragPoint = 0;

    var distance = DragServices.getInstance().getDragDistance();
    console.log(distance);
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

  function createRunningGame() {
    runningGame = new RunningGame(stage, preload);
    var sceneContainer = runningGame.action();
    sceneContainer.x = 0;
    sceneContainer.y = stageHeight / 8;
    stageContainer.addChild(sceneContainer);
    isRunningGame = true;

    var door = new DragOpenDoor(stage);
    var doorContainer = door.action();
    stageContainer.addChild(doorContainer);
    door.hadDrag(function () {
      artScene.enableDraw(true);
      dragRatio = 1.6;
    });
    door.onFinish(function () {
      finish();
    });

    var options = {
      x: 0,
      y: doorContainer.y + doorContainer.height,
      height: 400,
      width: stageWidth
    };

    artScene = new ArtScene(stage, options);
    var artContainer = artScene.action();
    stage.addChild(artContainer);
  }

  var start = function () {
    var sleepImg = preload.getResult("sleep");
    background.graphics.beginBitmapFill(sleepImg, 'no-repeat', null)
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
      console.log(QuestionServices.getByType('stage1.getup')[0], data);
      createjs.Tween.get(background).to({alpha: 1}, 1000).call(function () {
        createjs.Tween.get(background).to({alpha: 0.1}, 3000);
      });
      selectScene.finish();

      if (QuestionServices.getByType('stage1.getup')[0] === data) {
        return gameOver({
          endText: '要什么自行车？'
        });
      }

      createRunningGame();
    });

    createjs.Ticker.on('tick', handleTick);
  };

  function handleTick(event) {
    clockScene.tick(event);
    if (isClockDone) {
      selectScene.tick(event);
    }
    if (isRunningGame) {
      runningGame.tick(event);
    }
    if (artScene != null) {
      artScene.tick(event);
    }

    stage.update(event);
  }

  var finish = function () {
    createjs.Tween.get(stageContainer).to({alpha: 0.5}, 1000).call(function () {
      stage.removeAllChildren();
      SceneSwitcher.nextScene();
    });
  };

  var gameOver = function (data) {
    stage.removeAllChildren();
    SceneSwitcher.gameOver(data);
  };

  return {
    load: load,
    start: start,
    finish: finish
  };
});
