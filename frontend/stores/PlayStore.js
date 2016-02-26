var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _plays;

var PlayStore = new Store(AppDispatcher);

function setUrl(url){
  _plays = url;
}

PlayStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "RECEIVE_PLAY_URL":
    setUrl(payload.url);
    this.__emitChange();
    break;
  }
};

PlayStore.returnUrl = function(){
  return _plays;
};

module.exports = PlayStore;
