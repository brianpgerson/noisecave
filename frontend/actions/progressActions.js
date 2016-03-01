var AppDispatcher = require('../dispatcher/dispatcher');

var ProgressActions = {
  updateProgress: function(percent, time){
    AppDispatcher.dispatch({
      actionType: "UPDATE_PROGRESS",
      percent: percent,
      time: time
    });
  }
};

module.exports = ProgressActions;
