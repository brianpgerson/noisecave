var AppDispatcher = require('../dispatcher/dispatcher');
var TrackConstants = require('../constants/trackConstants');
var ServerTrackApi = require('../util/serverTrackApi');
var ModalActions = require('./modalActions');

var TrackActions = {

  // INBOUND
  receiveTracks: function(trackParams){
    AppDispatcher.dispatch({
      actionType: TrackConstants.RECEIVE_TRACKS,
      trackParams: trackParams
    });
  },
  receiveTrack: function(trackParams){
    ModalActions.closeModal();
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
  receiveUpdatedTrack: function(trackParams){
    AppDispatcher.dispatch({
      actionType: TrackConstants.RECEIVE_UPDATED_TRACK,
      trackParams: trackParams
    });
  },

  // OUTBOUND
  addTrack: function(trackParams) {
    ServerTrackApi.createTrack(trackParams, TrackActions.receiveTrack);
  },

  updateTrackPlays: function(trackId){
    ServerTrackApi.updateTrackPlays(trackId, TrackActions.receiveUpdatedTrack);
  },

  getTracks: function(){
    ServerTrackApi.fetchTracks(TrackActions.receiveTracks);
  },

  getTrack: function(id){
    ServerTrackApi.fetchTrack(id, TrackActions.receiveTrack);
  }
};

module.exports = TrackActions;
