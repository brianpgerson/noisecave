var AppDispatcher = require('../dispatcher/dispatcher');
var ServerPlaylistingApi = require('../util/serverPlaylistingApi');

var PlaylistingActions = {
  //inbound
  receivePlaylisting: function(playlisting){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAYLISTING",
      playlisting: playlisting
    });
  },

  // outbound
  addTrackToPlaylist: function(track, playlistId){;
    ServerPlaylistingApi.addPlaylisting(
      playlistId, track, PlaylistingActions.receivePlaylisting);
  }
};

module.exports = PlaylistingActions;
