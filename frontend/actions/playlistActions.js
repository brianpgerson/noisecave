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
  receivePlaylistsWithTracks: function(playlists){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAYLISTS_WITH_TRACKS",
      playlists: playlists,
    });
  },
  receivePlaylist: function(playlist){
    AppDispatcher.dispatch({
      actionType: "RECEIVE_PLAYLIST",
      playlist: playlist,
    });
  },

  resetPlaylists: function(){
    AppDispatcher.dispatch({
      actionType: "RESET_PLAYLISTS"
    });
  },

  // outbound


  requestPlaylists: function(id){
    ServerPlaylistApi.fetchPlaylists(id, PlaylistActions.receivePlaylists);
  },
  requestPlaylistsWithTracks: function(id){
    ServerPlaylistApi.fetchPlaylistsWithTracks(id, PlaylistActions.receivePlaylistsWithTracks);
  },
  addPlaylist: function(newPlaylist){
    ServerPlaylistApi.addPlaylist(newPlaylist, PlaylistActions.receivePlaylist);
  }
};

module.exports = PlaylistActions;
