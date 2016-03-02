var ErrorActions = require('../actions/errorActions');

var ServerPlaylistApi = {
  addPlaylistings: function(playlistId, tracks, callback){
    $.ajax({
      url: "api/playlistings",
      type: "POST",
      data: {playlisting: {tracks: tracks, playlist_id: playlistId}},
      success: function(response) {
        if (response.errors.length > 0) {
          ErrorActions.sendError(response.errors);
        }
        callback(response);
      },
      error: function(response) {
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  }
};

module.exports = ServerPlaylistApi;
