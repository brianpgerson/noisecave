var AppDispatcher = require('../dispatcher/dispatcher');
var TrackActions = require('../actions/trackActions');

var PlayActions = {

  addToPlayStore: function(track){
    TrackActions.updateTrackPlays(track.id);
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAY_URL",
      url: track
    });
  },
  addToPlayStoreQueue: function(track){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_QUEUE_URL",
      url: track
    });
  },
  addToQueueInBulk: function(tracks){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_QUEUE_URLS",
      urls: tracks
    });
  },
  addFromQueue: function(track){
    TrackActions.updateTrackPlays(track.id);
    AppDispatcher.dispatch({
      actionType: "MOVE_FROM_QUEUE",
      url: track
    });
  }
};

module.exports = PlayActions;
