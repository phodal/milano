define([
  'createjs'
], function () {
  function Character(assets, pos) {
    var spriteSheet = new createjs.SpriteSheet({
      framerate: 30,
      "images": [assets],
      "frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
      "animations": {
        "run": [0, 25, "run", 1.5],
        "jump": [26, 63, "run", 2]
      }
    });

    this.grant = new createjs.Sprite(spriteSheet, "run");
    this.grant.scaleX = 0.5;
    this.grant.scaleY = 0.5;
    this.grant.y = pos.y;
  }

  Character.prototype = {
    getObj: function() {
      return this.grant;
    },
    addToStage: function (stage) {
      stage.addChild(this.grant);
    },
    removeFromStage: function (stage) {
      stage.removeChild(this.grant);
    },
    getWidth: function () {
      return this.grant.getBounds().width * this.grant.scaleX;
    },
    getX: function () {
      return this.grant.x;
    },
    getY: function () {
      return this.grant.y;
    },
    setX: function (val) {
      this.grant.x = val;
    },
    playAnimation: function (animation) {
      this.grant.gotoAndPlay(animation);
    }
  };

  return Character;
});
