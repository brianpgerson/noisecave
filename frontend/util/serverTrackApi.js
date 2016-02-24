var TrackActions = require('../actions/trackActions');
var ErrorActions = require('../actions/ErrorActions');

var ServerTrackApi = {
  fetchTracks: function(){
    $.ajax({
      url: "api/tracks/",
      type: "GET",
      data: {},
      success: function(data){
        TrackActions.receiveTracks(data);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  }
};

module.exports = ServerTrackApi;
