var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _errors = [];

var ErrorStore = new Store(AppDispatcher);

function setErrors(errors){
  _errors = errors;
}

ErrorStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case "DISPLAY_ERRORS":
    setErrors(payload.errors);
    this.__emitChange();
    break;
  case "RESET_ERRORS":
    setErrors([]);
    this.__emitChange();
  }
};

ErrorStore.all = function(){
  return _errors.slice();
};

module.exports = ErrorStore;
