define([
  'createjs'
], function () {
  var QUESTIONS = {
    'stage1.getup': ['继续睡下去', '起来吃个饭', '准备去上课']
  };

  function getByType(type) {
    return QUESTIONS[type];
  }

  var QuestionServices = {
    getByType: getByType,
  };

  return QuestionServices;
});
