var AppDispatcher = require('../dispatcher/dispatcher');
var TrackConstants = require('../constants/trackConstants');
var ServerTrackApi = require('../util/serverTrackApi');


var TrackActions = {

  // INBOUND
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
  },

  // OUTBOUND
  addTrack: function(trackParams) {
    ServerTrackApi.createTrack(trackParams, TrackActions.receiveTrack);
  },

  getTracks: function(){
    ServerTrackApi.fetchTracks(TrackActions.receiveTracks);
  },

  getTrack: function(id){
    ServerTrackApi.fetchTrack(id, TrackActions.receiveTrack)
  }
};

module.exports = TrackActions;
