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
  createFormData: function(response){
    var fd = new FormData();
    var keys = Object.keys(response.params);
    keys.forEach(function(key){ fd.append(key, response.params[key]); });
    return fd;
  },
  sendToAmazon: function(formdata){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://briansdopetracks.s3.amazonaws.com/");
    xhr.setRequestHeader("Content-Type", "audio/mpeg");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log("you've done it, you bastard.");
      }
    };
    xhr.send(formdata);
  },
  getCredentials: function(file){
    var filename = file.name;
    $.ajax({
      url: "api/credentials",
      type: "GET",
      data: {
        filename: filename
      },
      success: function(response){
        var fd = this.createFormData(response);
        fd.append('file', file);
        this.sendToAmazon(fd);
      }.bind(this),
      error: function(response){
        console.log(response);
      }
    });
  }
};


module.exports = ServerTrackApi;
