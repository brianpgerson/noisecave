var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var trackConstants = require('../constants/trackConstants');


var _tracks = {};

var TrackStore = new Store(AppDispatcher);

function resetTracks(trackParams){
  Object.keys(trackParams).forEach(function(track){
    resetTrack(track);
  });
}

function resetTrack(track){
  _tracks[track.id] = track;
}

TrackStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case trackConstants.RECEIVE_TRACKS:
    resetTracks(payload.trackParams);
    this.__emitChange();
    break;
  case trackConstants.RECEIVE_TRACK:
    resetTrack(payload.trackParams);
    this.__emitChange();
    break;
  }
};

TrackStore.all = function() {
  var tracksArray = Object.keys(_tracks).map(function(trackId){
    return _tracks[trackId];
  });
  return tracksArray;
};

module.exports = TrackStore;
