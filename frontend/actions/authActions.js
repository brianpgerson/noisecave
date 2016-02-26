var AppDispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/authConstants');
var ServerAuthApi = require('../util/serverAuthApi');

var AuthActions = {
  // inbound
  login: function(sessionParams){
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_REQUEST,
      sessionParams: sessionParams
    });
  },
  checkLogin: function(sessionParams){
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_CHECK,
      sessionParams: sessionParams
    });
  },
  logout: function(sessionParams){
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_REQUEST,
      sessionParams: sessionParams
    });
  },
  // outbound
  loginCheckRequest: function(){
    ServerAuthApi.loginCheckRequest(AuthActions.checkLogin);
  },
  loginRequest: function(sessionParams){
    ServerAuthApi.loginRequest(sessionParams, AuthActions.login);
  },
  logoutRequest: function(sessionParams){
    ServerAuthApi.logoutRequest(sessionParams, AuthActions.logoutRequest);
  },
  signUpRequest: function(sessionParams){
    ServerAuthApi.signUpRequest(sessionParams, AuthActions.loginRequest);
  }
};

module.exports = AuthActions;
