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
  updateUser: function(sessionParams){
    AppDispatcher.dispatch({
      actionType: AuthConstants.UPDATE_SESSION,
      sessionParams: sessionParams
    });
  },

  // outbound

  updateUserInfoRequest: function(newUserParams, id){
    ServerAuthApi.updateUserInfoRequest(newUserParams, AuthActions.updateUser, id);
  },
  loginCheckRequest: function(){
    ServerAuthApi.loginCheckRequest(AuthActions.checkLogin);
  },
  loginRequest: function(sessionParams){
    ServerAuthApi.loginRequest(sessionParams, AuthActions.login);
  },
  logoutRequest: function(sessionParams){
    ServerAuthApi.logoutRequest(sessionParams, AuthActions.logout);
  },
  signUpRequest: function(userParams){
    var sessionParams = userParams;
    ServerAuthApi.signUpRequest(userParams, AuthActions.loginRequest, sessionParams);
  }
};

module.exports = AuthActions;
