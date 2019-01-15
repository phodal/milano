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
    this.grant.scaleX = 0.3;
    this.grant.scaleY = 0.3;
    this.originGrantY = this.grant.y = pos.y;
    this.isJumping = false;
    this.startJumpCount = false;
    this.jumpCount = 0;
  }

  Character.prototype = {
    getObj: function () {
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
    getHeight: function () {
      return this.grant.getBounds().height * this.grant.scaleY;
    },
    getX: function () {
      return this.grant.x;
    },
    getY: function () {
      return this.grant.y;
    },
    setY: function (val) {
      console.log(this.originGrantY);
      this.originGrantY = this.grant.y = val;
    },
    setX: function (val) {
      this.grant.x = val;
    },
    tick: function () {
      if (this.startJumpCount) {
        this.jumpCount++;
      }
    },
    playAnimation: function (animation) {
      this.grant.y = this.originGrantY;
      this.grant.gotoAndPlay(animation);
      this.isJumping = true;
      this.startJumpCount = true;
    }
  };

  return Character;
});
