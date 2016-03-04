var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _playlistingStore = {};

var PlaylistingStore = new Store(AppDispatcher);

function addPlaylisting(playlistId, playlisting){
  if (_playlistingStore[playlistId]) {
    _playlistingStore[playlistId].push(playlisting);
  }
}

function setPlaylistings(playlistId, playlistings){
  _playlistingStore[playlistId] = playlistings;
}

PlaylistingStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "RECEIVE_PLAYLISTING":
    addPlaylisting(payload.playlistId, payload.playlisting);
    this.__emitChange();
    break;
  case "RECEIVE_PLAYLISTINGS":
    setPlaylistings(payload.playlistId, payload.playlistings);
    this.__emitChange();
    break;
  }
};

PlaylistingStore.returnPlaylistings = function(id){
  if (_playlistingStore[id]){
    return _playlistingStore[id].slice();
  }
};


module.exports = PlaylistingStore;
