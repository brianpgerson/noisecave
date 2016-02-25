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
  testAmazon: function(cool){
      $.ajax({
      type: "PUT",
      url: "https://s3-us-west-1.amazonaws.com/briansdopetracks/",
      headers: {
        'Content-Length': '2759522',
        'Date': "Wed Feb 24 2016 18:39:02 GMT-0800 (PST)"
      },
      data: cool,
      success: function(response){
        debugger;
      },
      error: function(response){
        debugger;
      }
    });
  }
};

module.exports = ServerTrackApi;
