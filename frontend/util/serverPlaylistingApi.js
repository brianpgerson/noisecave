var ErrorActions = require('../actions/errorActions');

var ServerPlaylistingApi = {
  addPlaylisting: function(playlistId, track, callback){
    $.ajax({
      url: "api/playlistings",
      type: "POST",
      data: {playlisting: {track_id: track.id, playlist_id: playlistId}},
      success: function(response) {
        callback(response);
      },
      error: function(response) {
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  }
};

module.exports = ServerPlaylistingApi;
