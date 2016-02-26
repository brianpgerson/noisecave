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
  fetchPresignedUrls: function(prefix, file, callback) {
    $.ajax({
      type: "GET",
      url: "api/presign",
      data: {prefix: prefix, filename: file.name},
      success: function(response) {
        callback(response, file);
      }
    });
  },
  uploadTheFile: function(urls, file, callback){
    var presignedUrl = urls['presigned_url'];
    var publicUrl = urls['public_url'];
    var filetype = file.type;
    var filename = file.name;
    var xhr = new XMLHttpRequest();
    console.log(publicUrl);

    xhr.open("PUT", presignedUrl, true);
    xhr.setRequestHeader("Content-Type", filetype);

    xhr.onreadystatechange = function () {
     if (xhr.readyState === XMLHttpRequest.DONE) {
       callback(publicUrl);
      }
    };


    xhr.send(file);
  }
};



module.exports = ServerTrackApi;
