var AppDispatcher = require('../dispatcher/dispatcher');
var TrackConstants = require('../constants/trackConstants');

var AuthActions = {
  receiveTracks: function(trackParams){
    AppDispatcher.dispatch({
      actionType: TrackConstants.RECEIVE_TRACKS,
      trackParams: trackParams
    });
  },
  receiveTrack: function(trackParams){
    AppDispatcher.dispatch({
      actionType: TrackConstants.RECEIVE_TRACK,
      trackParams: trackParams
    });
  },
};

module.exports = AuthActions;
