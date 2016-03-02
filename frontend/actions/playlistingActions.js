var AppDispatcher = require('../dispatcher/dispatcher');
var ServerPlaylistingApi = require('../util/serverPlaylistApi');

var PlaylistingActions = {
  //inbound
  receivePlaylistings: function(playlistings){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAYLISTINGS",
      playlistings: playlistings,
    });
  },

  // outbound
  addTracksToPlaylist: function(playlistId, tracks){
    ServerPlaylistingApi.addPlaylistings(
      playlistId, tracks, PlaylistingActions.receivePlaylistings);
  }
};

module.exports = PlaylistingActions;
