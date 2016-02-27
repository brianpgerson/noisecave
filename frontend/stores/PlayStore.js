var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _playingNow;
var _playQueue = [];

var PlayStore = new Store(AppDispatcher);

function setPlayNowUrl(url){
  _playingNow = url;
}

function setQueueUrl(url){
  _playQueue.push(url);
}

function moveFromQueue(url){
  _playQueue.shift();
  _playingNow = url;
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
  return _playingNow;
};

PlayStore.returnPlayListQueue = function(){
  return _playQueue;
};

module.exports = PlayStore;
