var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _playStore = {
  playingNow: null,
  playQueue: [],
  override: null
};

var PlayStore = new Store(AppDispatcher);

function setPlayNowUrl(url){
  _playStore.playingNow = url;
  _playStore.override = true;
}

function setQueueUrl(url){
  _playStore.playQueue.push(url);
  _playStore.override = false;
}

function moveFromQueue(url){
  _playStore.playQueue.shift();
  _playStore.playingNow = url;
  _playStore.override = true;
}

PlayStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "RECEIVE_PLAY_URL":
    setPlayNowUrl(payload.url);
    this.__emitChange();
    break;
  case "RECEIVE_QUEUE_URL":
    setQueueUrl(payload.url);
    this.__emitChange();
    break;
  case "MOVE_FROM_QUEUE":
    moveFromQueue(payload.url);
    this.__emitChange();
    break;
  }
};

PlayStore.returnPlayingNow = function(){
  return _playStore.playingNow;
};

PlayStore.returnOverride = function(){
  return _playStore.override;
};

PlayStore.returnPlayListQueue = function(){
  return _playStore.playQueue;
};

module.exports = PlayStore;
