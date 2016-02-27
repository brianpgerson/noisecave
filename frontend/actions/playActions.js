var AppDispatcher = require('../dispatcher/dispatcher');

var PlayActions = {
  addToPlayStore: function(trackUrl){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAY_URL",
      url: trackUrl
    });
  },
  addToPlayStoreQueue: function(trackUrl){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_QUEUE_URL",
      url: trackUrl
    });
  },
  addFromQueue: function(trackUrl){
    AppDispatcher.dispatch({
      actionType: "MOVE_FROM_QUEUE",
      url: trackUrl
    });
  }
};

module.exports = PlayActions;
