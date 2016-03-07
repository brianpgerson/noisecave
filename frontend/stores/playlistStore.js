var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _playlistStore = {};

var PlaylistStore = new Store(AppDispatcher);

function setPlaylist(playlist){
  _playlistStore[playlist.id] = playlist;
}

function resetPlaylistsWithTracks(playlists){
  playlists.forEach(function(playlist){
    playlist.playlist.tracks = playlist.tracks;
    setPlaylist(playlist.playlist);
  });
}

function resetPlaylists(playlists){
  playlists.forEach(function(playlist){
    setPlaylist(playlist);
  });
}

function setPlaylistsToNull(){
  _playlistStore = {};
}

PlaylistStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "RECEIVE_PLAYLIST":
    setPlaylist(payload.playlist);
    this.__emitChange();
    break;
  case "RECEIVE_PLAYLISTS":
    resetPlaylists(payload.playlists);
    this.__emitChange();
    break;
  case "RECEIVE_PLAYLISTS_WITH_TRACKS":
    resetPlaylistsWithTracks(payload.playlists);
    this.__emitChange();
    break;
  case "RESET_PLAYLISTS":
    setPlaylistsToNull();
    this.__emitChange();
  }
};

PlaylistStore.returnPlaylists = function(){
  var playlists = Object.keys(_playlistStore).map(function(id){
    return _playlistStore[id];
  });
  return playlists;
};


module.exports = PlaylistStore;
