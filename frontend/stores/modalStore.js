var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _display;
var _type;
var _track;
var _errors;

var ModalStore = new Store(AppDispatcher);

function setModal(display, type, track){
  _display = display;
  _type = type;
  _track = track;
  _errors = [];
}

function setModalErrors(display, type, errors){
  _display = display;
  _type = type;
  _errors = errors;
}

ModalStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "DISPLAY_MODAL":
    setModal(true, payload.type, payload.track);
    this.__emitChange();
    break;
  case "DISPLAY_MODAL_WITH_ERRORS":
    setModalErrors(true, payload.type, payload.errors);
    this.__emitChange();
    break;
  case "CLOSE_MODAL":
    setModal(false);
    this.__emitChange();
  }
};

ModalStore.returnDisplay = function(){
  return _display;
};

ModalStore.returnType = function(){
  return _type;
};

ModalStore.returnTrack = function(){
  return _track;
};

ModalStore.returnErrors = function(){
  return _errors;
};


module.exports = ModalStore;
