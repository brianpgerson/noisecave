var ErrorActions = require('../actions/errorActions');
var PlaylistingActions = require('../actions/playlistingActions');

var ServerPlaylistApi = {
  addPlaylist: function(newPlaylist, callback){
    $.ajax({
      url: "api/playlists",
      type: "POST",
      data: newPlaylist,
      success: function(data){
        callback(data);
        if (newPlaylist.tracks){
          PlaylistingActions.addTracksToPlaylist(data.id,newPlaylist.tracks);
        }
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  fetchPlaylists: function(id, callback){
    $.ajax({
      url: "api/playlists",
      type: "GET",
      data: {id: id},
      success: function(data){
        callback(data);
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  }
};

module.exports = ServerPlaylistApi;
