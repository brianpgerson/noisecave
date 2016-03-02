var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _playlistStore = {};

var PlaylistStore = new Store(AppDispatcher);

function setPlaylist(playlist){
  _playlistStore[playlist.id] = playlist;
}

function resetPlaylists(playlists){
  playlists.forEach(function(playlist){
    setPlaylist(playlist);
  });
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
  }
};

PlaylistStore.returnPlaylists = function(){
  var playlists = Object.keys(_playlistStore).map(function(id){
    return _playlistStore[id];
  });
  return playlists;
};


module.exports = PlaylistStore;
