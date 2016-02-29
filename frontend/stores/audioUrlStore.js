var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _publicUrl;
var _percent = 0;

var AudioUrlStore = new Store(AppDispatcher);

function setUrl(url){
  _publicUrl = url;
}

function setProgress(percent){
  _percent = percent;
}

AudioUrlStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "PUBLIC_URL_RECEIVED":
    setUrl(payload.publicUrl);
    this.__emitChange();
    break;
  case "PERCENT_COMPLETED":
    setProgress(payload.percent);
    this.__emitChange();
    break;
  }
};

AudioUrlStore.returnUrl = function(){
  return _publicUrl;
};

AudioUrlStore.returnPercent = function(){
  return _percent;
};

module.exports = AudioUrlStore;
