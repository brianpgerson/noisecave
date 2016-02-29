var ErrorActions = require('../actions/ErrorActions');

var ServerTrackApi = {
  fetchTracks: function(callback){
    $.ajax({
      url: "api/tracks/",
      type: "GET",
      data: {},
      success: function(data){
        callback(data);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  fetchTrack: function(id, callback){
    $.ajax({
      url: "api/tracks/" + id,
      type: "GET",
      data: {},
      success: function(data){
        callback(data);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  createTrack: function(newTrack, callback){
    $.ajax({
      url: "api/tracks/",
      type: "POST",
      data: newTrack,
      success: function(data){
        callback(data);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  deleteTrack: function(track, callback){
    $.ajax({
      url: "api/tracks/" + track.id,
      type: "DELETE",
      data: {},
      success: function(data){
        callback(data);
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
  uploadTheFile: function(urls, file, callback, progressCallback){
    var presignedUrl = urls['presigned_url'];
    var publicUrl = urls['public_url'];
    var filetype = file.type;
    var filename = file.name;
    var xhr = new XMLHttpRequest();

    xhr.open("PUT", presignedUrl, true);
    xhr.setRequestHeader("Content-Type", filetype);


    xhr.upload.onprogress = function(oEvent) {
      if (oEvent.lengthComputable) {
        var percentComplete = oEvent.loaded / oEvent.total;
        progressCallback(percentComplete);
      } else {
        console.log('didnt work for some reason');
      }
    };

    xhr.onreadystatechange = function () {
     if (xhr.readyState === XMLHttpRequest.DONE) {
       callback(publicUrl);
      }
    };

    xhr.send(file);
  }
};



module.exports = ServerTrackApi;
