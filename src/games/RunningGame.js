define([
  'createjs'
], function () {
  var stageContainer, score;

  function RunningGame(container) {
    stageContainer = container;
  }

  RunningGame.prototype.start = function () {

  };

  RunningGame.prototype.end = function () {

    return new Promise(resolve => {

    }, reject => {

    })
  };

  return RunningGame;
});
