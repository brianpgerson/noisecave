var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _playlistingStore = [];

var PlaylistingStore = new Store(AppDispatcher);

function addPlaylisting(playlisting){
  _playlistingStore.push(playlisting);
}

function resetPlaylistings(playlists){
  _playlistingStore = [];
}

PlaylistingStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "RECEIVE_PLAYLISTING":
    addPlaylisting(payload.playlisting);
    this.__emitChange();
    break;
  }
};

PlaylistingStore.returnPlaylistings = function(){
  return _playlistingStore.slice();
};


module.exports = PlaylistingStore;
