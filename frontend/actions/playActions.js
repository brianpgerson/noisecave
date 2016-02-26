var AppDispatcher = require('../dispatcher/dispatcher');

var PlayActions = {
  addToPlayStore: function(trackUrl){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAY_URL",
      url: trackUrl
    });
  },
};

module.exports = PlayActions;
