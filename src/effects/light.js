/*
 * MIT License
 *
 * Copyright (c) 2018 Andy+
 *
 * GitHub: https://github.com/zzlw/createjs
 *
 */
define([
  'createjs'
], function () {
  var proto, stage;

  function Light(stage) {
    this.stage = stage;
    this.init();
  }

  Light.prototype.init = function () {
    Light.webFontTxtFilters = {};
    Light.properties = {
      width: 550,
      height: 400,
      fps: 24,
      color: "#000000",
      webfonts: {},
      manifest: []
    };

    Light.webfontAvailable = function (family) {
      Light.properties.webfonts[family] = true;
      var txtFilters = Light.webFontTxtFilters && Light.webFontTxtFilters[family] || [];
      for (var f = 0; f < txtFilters.length; ++f) {
        txtFilters[f].updateCache();
      }
    };

    Light.aa = function (mode, startPosition, loop) {
      this.initialize(mode, startPosition, loop, {});
      this.shape = new createjs.Shape();
      this.shape.graphics.rf(["#ffffff", "rgba(255,255,0,0)"], [0, 1], 0, 0, 0, 0, 0, 4.1).s().p("AgbAcQgMgLAAgRQAAgPAMgMQAMgMAPAAQAQAAAMAMQALAMABAPQgBARgLALQgMAMgQAAQgPAAgMgMg");
      this.shape.setTransform(4, 4);
      this.timeline.addTween(createjs.Tween.get(this.shape).wait(1));
    };
    Light.aa.prototype = proto = new createjs.MovieClip();
    proto.nominalBounds = new createjs.Rectangle(0, 0, 8, 8);

    Light.lightY = function (mode, startPosition, loop) {
      this.initialize(mode, startPosition, loop, {});
      this.instance = new Light.aa();
      this.instance.setTransform(4, 4, 1, 1, 0, 0, 0, 4, 4);

      this.timeline.addTween(createjs.Tween.get(this.instance).to({
        x: -26.6,
        y: -335
      }, 130).to({
        guide: {path: [-26.4, -334.9, -22.6, -370.7, -8.8, -401.8, 1.9, -430.8, 24, -432.6]},
        alpha: 0
      }, 49).wait(1));

    };
    Light.lightY.prototype = proto = new createjs.MovieClip();
    proto.nominalBounds = new createjs.Rectangle(0, 0, 8, 8);

    Light.light = function (mode, startPosition, loop) {
      this.initialize(mode, startPosition, loop, {});

    };
    Light.light.prototype = proto = new createjs.MovieClip();
    proto.nominalBounds = null;
  };

  Light.prototype.action = function () {
    var scount = 300;
    for (var i = 0; i < scount; i++) {
      var light = new Light.lightY();
      light.x = 1920 * Math.random();
      light.y = 600;
      light.gotoAndPlay(Math.ceil(Math.random() * light.totalFrames));
      light.mouseEnabled = false;
      light.mouseChildren = false;
      this.stage.addChild(light);
      var scale = 0.3 + Math.random() * 0.7;
      var arrow = Math.random() > 0.5 ? 1 : -1; // 左右2个方向随机
      light.scaleX = scale * arrow;
      light.scaleY = scale;
      light.alpha = 0.4 + Math.random() * 0.3;
    }
  };

  Light.prototype.finish = function () {

  };

  return Light;
});
