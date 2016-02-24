var AppDispatcher = require('../dispatcher/dispatcher');

var ErrorActions = {
  sendError: function(errors){
    AppDispatcher.dispatch({
      actionType: "DISPLAY_ERRORS",
      errors: errors
    });
  },
  resetErrors: function(){
    AppDispatcher.dispatch({
      actionType: "RESET_ERRORS",
    });
  }
};

module.exports = ErrorActions;
