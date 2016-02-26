var AppDispatcher = require('../dispatcher/dispatcher');
var TrackConstants = require('../constants/trackConstants');

var TrackActions = {

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
  removeTrack: function(trackParams){
    AppDispatcher.dispatch({
      actionType: TrackConstants.REMOVE_TRACK,
      trackParams: trackParams
    });
  }
};

module.exports = TrackActions;
