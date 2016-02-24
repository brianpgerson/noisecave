var AppDispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/authConstants');

var AuthActions = {
  loginRequest: function(sessionParams){
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_REQUEST,
      sessionParams: sessionParams
    });
  },
  loginCheck: function(sessionParams){
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_CHECK,
      sessionParams: sessionParams
    });
  },
  logoutRequest: function(sessionParams){
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_REQUEST,
      sessionParams: sessionParams
    });
  },
};

module.exports = AuthActions;
