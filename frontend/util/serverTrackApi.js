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
  },
  fetchTrack: function(id){
    $.ajax({
      url: "api/tracks/" + id,
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
  },
  createTrack: function(newTrack){
    $.ajax({
      url: "api/tracks/",
      type: "POST",
      data: newTrack,
      success: function(data){
        TrackActions.receiveTrack(data);
        ErrorActions.resetErrors();
      },
      error: function(response){
        debugger;
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  deleteTrack: function(track){
    $.ajax({
      url: "api/tracks/" + track.id,
      type: "DELETE",
      data: {},
      success: function(data){
        TrackActions.removeTrack(data);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
};

module.exports = ServerTrackApi;
