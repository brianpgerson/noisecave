var AppDispatcher = require('../dispatcher/dispatcher');
var ServerPlaylistingApi = require('../util/serverPlaylistingApi');

var PlaylistingActions = {
  //inbound
  receivePlaylisting: function(playlistId, playlisting){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAYLISTING",
      playlistId: playlistId,
      playlisting: playlisting
    });
  },
  receivePlaylistings: function(playlistId, playlistings){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAYLISTINGS",
      playlistId: playlistId,
      playlistings: playlistings
    });
  },

  // outbound
  fetchPlaylistings: function(playlistId){
    ServerPlaylistingApi.getPlaylistings(
      playlistId, PlaylistingActions.receivePlaylistings
    );
  },
  addTrackToPlaylist: function(playlistId, track){
    ServerPlaylistingApi.addPlaylisting(
      playlistId, track, PlaylistingActions.receivePlaylisting);
  }
};

module.exports = PlaylistingActions;
