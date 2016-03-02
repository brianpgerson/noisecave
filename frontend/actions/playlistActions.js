var AppDispatcher = require('../dispatcher/dispatcher');
var ServerPlaylistApi = require('../util/serverPlaylistApi');

var PlaylistActions = {
  //inbound
  receivePlaylists: function(playlists){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAYLISTS",
      playlists: playlists,
    });
  },
  receivePlaylist: function(playlist){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAYLIST",
      playlist: playlist,
    });
  },

  // outbound
  requestPlaylists: function(id){
    ServerPlaylistApi.fetchPlaylists(id, PlaylistActions.receivePlaylists);
  },
  addPlaylist: function(newPlaylist){
    ServerPlaylistApi.addPlaylist(newPlaylist, PlaylistActions.receivePlaylist);
  }
};

module.exports = PlaylistActions;
