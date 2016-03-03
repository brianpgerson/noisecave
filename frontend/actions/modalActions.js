var AppDispatcher = require('../dispatcher/dispatcher');
var ErrorActions = require('../actions/errorActions');

var ModalActions = {
  openModal: function(type, track){
    AppDispatcher.dispatch({
      actionType: "DISPLAY_MODAL",
      type: type,
      track: track,
    });
  },
  openModalError: function(type, errors){
    AppDispatcher.dispatch({
      actionType: "DISPLAY_MODAL_WITH_ERRORS",
      type: type,
      errors: errors
    });
  },
  closeModal: function(){
    ErrorActions.resetErrors();
    AppDispatcher.dispatch({
      actionType: "CLOSE_MODAL",
    });
  }
};

module.exports = ModalActions;
