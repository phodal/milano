define([
  'src/constants/colors.js',
  'src/stage/stage1/ClockScene.js',
  'src/scenes/SelectScene.js',
  'src/utils/EventBus.js',
  'src/services/QuestionServices.js',
  'src/services/CharacterServices.js',
  'createjs'
], function (COLORS, ClockScene, SelectScene, EventBus, QuestionServices, CharacterServices) {
  var stage, stageContainer, preload, stageWidth, stageHeight, dragBox, clockScene, selectScene;
  var background, lastDragPoint = 0, offset = new createjs.Point(0, 0), tree1, tree2, isRunningGame = false, ground;
  var cloud1, cloud2, character;

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

  function createRunningGame() {
    var bg2 = new createjs.Shape();
    bg2.graphics.beginFill('#000000').drawRect(0, stageHeight / 2, stageWidth, stageHeight / 2);
    bg2.graphics.alpha = 1;
    stageContainer.addChild(bg2);

    var groundImg = preload.getResult("ground");
    ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, stageWidth + groundImg.width, groundImg.height);
    ground.tileW = groundImg.width;
    ground.y = stageHeight - groundImg.height;

    character = new CharacterServices(preload.getResult("grant"), {x: 0, y: stageHeight / 2});
    character.addToStage(stageContainer);

    tree1 = new createjs.Bitmap(preload.getResult("tree1"));
    tree1.setTransform(Math.random() * stageWidth, stageHeight - tree1.image.height - groundImg.height + 10, 1, 1);
    tree2 = new createjs.Bitmap(preload.getResult("tree2"));
    tree2.setTransform(Math.random() * stageWidth, stageHeight - tree2.image.height - groundImg.height + 10, 1, 1);

    cloud1 = new createjs.Bitmap(preload.getResult("cloud1"));
    cloud1.setTransform(Math.random() * stageWidth, stageHeight - cloud1.image.height - groundImg.height - 100, 0.5, 0.5);
    cloud1.alpha = 1;

    stageContainer.addChild(tree1, tree2, cloud1);
    stageContainer.addChild(ground);

    isRunningGame = true;
  }

  function updateTree(event) {
    var deltaS = event.delta / 1000;
    tree1.x = (tree1.x - deltaS * 30);
    if (tree1.x + tree1.image.width * tree1.scaleX <= 0) {
      tree1.x = stageWidth;
    }
    tree2.x = (tree2.x - deltaS * 45);
    if (tree2.x + tree2.image.width * tree2.scaleX <= 0) {
      tree2.x = stageWidth;
    }
    cloud1.x = (cloud1.x - deltaS * 15);
    if (cloud1.x + cloud1.image.width * cloud1.scaleX <= 0) {
      cloud1.x = stageWidth;
    }

    if (character) {
      var position = character.getX() + 150 * deltaS;
      character.setX((position >= stageWidth + character.getWidth()) ? -character.getWidth() : position);
    }
  }

  var start = function () {
    var isClockDone = false;
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
      console.log(data);
      createjs.Tween.get(background).to({alpha: 1}, 1000).call(function () {
        createjs.Tween.get(background).to({alpha: 0.1}, 3000);
      });
      selectScene.finish();

      createRunningGame();
    });

    createjs.Ticker.on('tick', handleTick);

    function handleTick(event) {
      clockScene.tick(event);
      if (isClockDone) {
        selectScene.tick(event);
      }
      if (isRunningGame) {
        updateTree(event);
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
