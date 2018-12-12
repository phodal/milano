define([
  'createjs'
], function () {
  var stage, preload, backSnowContainer, frontSnowContainer, images = {};

  var load = function () {
    stage = new createjs.Stage('demoCanvas');

    // 雪景容器
    backSnowContainer = new createjs.Container();
    stage.addChild(backSnowContainer);
    frontSnowContainer = new createjs.Container();
    stage.addChild(frontSnowContainer);

    return new Promise(function (resolve, reject) {
      preload = new createjs.LoadQueue();
      preload.addEventListener('fileload', function (evt) {
        if (evt.item.type === "image") {
          images[evt.item.id] = evt.result;
        }
      });
      preload.addEventListener('complete', function () {
        resolve();
      });
      preload.addEventListener('error', function () {
        reject();
      });
      preload.loadManifest({src: 'assets/manifest/stage3.manifest.json', type: 'manifest'});
    })
  };

  //雪花数组 用作回收
  var _snow1List = [];
  var _snow2List = [];
  var _snow3List = [];
  var _snow4List = [];
  var _snow5List = [];
  var _snow6List = [];
  var _snow7List = [];
  var _snow8List = [];
  var _frameIndex = 0;

  function createSnow() {
    var i;
    var snow;
    var scale;
    for (i = 0; i < 100; i++) {
      //后景雪
      snow = getSnow(1);
      scale = 0.2 + Math.random() * 0.3;
      snow.scaleX = scale;
      snow.scaleY = scale;
      snow.x = Math.random() * 1920;
      snow.y = Math.random() * 800;
      snow.speed = 0.5 + Math.random();
      snow.rotation = 360 * Math.random();
      backSnowContainer.addChild(snow);

      //前景雪
      snow = getSnow(0);
      scale = 0.6 + Math.random() * 0.4;
      snow.scaleX = scale;
      snow.scaleY = scale;
      snow.x = Math.random() * 1920;
      snow.y = Math.random() * 800;
      snow.speed = 0.7 + Math.random() * 1.3;
      snow.rotation = 360 * Math.random();
      frontSnowContainer.addChild(snow);
    }
  }

  function lightFrameHandler() {
    var i;
    var snow;
    var scale;

    if (_frameIndex % 10 === 0) {
      //后景雪
      snow = getSnow(1);
      scale = 0.2 + Math.random() * 0.3;
      snow.scaleX = scale;
      snow.scaleY = scale;
      snow.x = Math.random() * 1920;
      snow.y = -20;
      snow.speed = 0.5 + Math.random();
      backSnowContainer.addChild(snow);

      //前景雪
      snow = getSnow(0);
      scale = 0.6 + Math.random() * 0.4;
      snow.scaleX = scale;
      snow.scaleY = scale;
      snow.x = Math.random() * 1920;
      snow.y = -20;
      snow.speed = 0.7 + Math.random() * 1.3;
      frontSnowContainer.addChild(snow);
    }

    var mc;
    for (i = 0; i < backSnowContainer.numChildren; i++) {
      mc = backSnowContainer.getChildAt(i);
      if (mc.y > stage.canvas.height) {
        if (mc.parent) {
          mc.parent.removeChild(mc);
        }
        ["_snow" + mc.type + "List"].push(mc);
      }
      mc.x -= 0.1;
      mc.y += mc.speed;
    }
    for (i = 0; i < frontSnowContainer.numChildren; i++) {
      mc = frontSnowContainer.getChildAt(i);
      if (mc.y > stage.canvas.height) {
        if (mc.parent) mc.parent.removeChild(mc);
        ["_snow" + mc.type + "List"].push(mc);
      }
      mc.x -= 0.2;
      mc.y += mc.speed;
      mc.rotation += 1;
    }
    _frameIndex++;
  }

  function getSnow(type) {
    var snow;
    switch (type) {
      case 0:// 0时随机
      {
        var random = Math.random();
        if (random >= 0 && random < 0.2) {
          snow = getSnow(1);
        } else if (random >= 0.2 && random < 0.4) {
          snow = getSnow(2);
        } else if (random >= 0.4 && random < 0.6) {
          snow = getSnow(3);
        } else if (random >= 0.6 && random < 0.8) {
          snow = getSnow(4);
        } else if (random >= 0.8 && random < 0.85) {
          snow = getSnow(5);
        } else if (random >= 0.85 && random < 0.9) {
          snow = getSnow(6);
        } else if (random >= 0.9 && random < 0.95) {
          snow = getSnow(7);
        } else if (random >= 0.95) {
          snow = getSnow(8);
        }
        break;
      }

      case 1: {
        if (_snow1List.length > 0) {
          snow = _snow1List.shift();
        } else {
          snow = new createjs.Bitmap(images.snow1);
        }
        snow.type = type;
        break;
      }
      case 2: {
        if (_snow2List.length > 0) {
          snow = _snow2List.shift();
        } else {
          snow = new createjs.Bitmap(images.snow2);
        }
        snow.type = type;
        break;
      }
      case 3: {
        if (_snow3List.length > 0) {
          snow = _snow3List.shift();
        } else {
          snow = new createjs.Bitmap(images.snow3);
        }
        snow.type = type;
        break;
      }
      case 4: {
        if (_snow4List.length > 0) {
          snow = _snow4List.shift();
        } else {
          snow = new createjs.Bitmap(images.snow4);
        }
        snow.type = type;
        break;
      }
      case 5: {
        if (_snow5List.length > 0) {
          snow = _snow5List.shift();
        } else {
          snow = new createjs.Bitmap(images.snow5);
        }
        snow.type = type;
        break;
      }
      case 6: {
        if (_snow6List.length > 0) {
          snow = _snow6List.shift();
        } else {
          snow = new createjs.Bitmap(images.snow6);
        }
        snow.type = type;
        break;
      }
      case 7: {
        if (_snow7List.length > 0) {
          snow = _snow7List.shift();
        } else {
          snow = new createjs.Bitmap(images.snow7);
        }
        snow.type = type;
        break;
      }
      case 8: {
        if (_snow8List.length > 0) {
          snow = _snow8List.shift();
        } else {
          snow = new createjs.Bitmap(images.snow8);
        }
        snow.type = type;
        break;
      }
      default: {
        break;
      }
    }
    return snow;
  }

  function stageBreakHandler(event) {
    lightFrameHandler();
    stage.update();
  }

  var start = function () {
    createjs.MotionGuidePlugin.install();
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stageBreakHandler);

    stageBreakHandler();
    createSnow();
  };

  var finish = function () {

  };

  return {
    load: load,
    start: start,
    finish: finish
  };
});
