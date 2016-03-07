var AppDispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/authConstants');
var ServerAuthApi = require('../util/serverAuthApi');
var PlaylistActions = require('../actions/playlistActions');
var ModalActions = require('./modalActions');

var AuthActions = {
  // inbound
  login: function(sessionParams){
    ModalActions.closeModal();
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_REQUEST,
      sessionParams: sessionParams
    });
  },
  checkLogin: function(sessionParams){
    ModalActions.closeModal();
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_CHECK,
      sessionParams: sessionParams
    });
  },
  logout: function(sessionParams){
    ModalActions.closeModal();
    PlaylistActions.resetPlaylists();
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_REQUEST,
      sessionParams: sessionParams
    });
  },
  updateUser: function(sessionParams){
    ModalActions.closeModal();
    AppDispatcher.dispatch({
      actionType: AuthConstants.UPDATE_SESSION,
      sessionParams: sessionParams
    });
  },
  receiveUserInfo: function(userParams){
    AppDispatcher.dispatch({
      actionType: AuthConstants.RECEIVE_USER_INFO,
      userParams: userParams
    });
  },


  // outbound

  updateUserInfoRequest: function(newUserParams, id){
    ServerAuthApi.updateUserInfoRequest(newUserParams, AuthActions.updateUser, id);
  },
  getUserInfo: function(id){
    ServerAuthApi.getUserInfo(id, AuthActions.receiveUserInfo);
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
