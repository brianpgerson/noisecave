var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _publicUrl;

var AudioUrlStore = new Store(AppDispatcher);

function setUrl(url){
  _publicUrl = url;
}

AudioUrlStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "PUBLIC_URL_RECEIVED":
    setUrl(payload.publicUrl);
    this.__emitChange();
    break;
  }
};

AudioUrlStore.returnUrl = function(){
  return _publicUrl;
};

module.exports = AudioUrlStore;
