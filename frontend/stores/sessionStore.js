
var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var authConstants = require('../constants/authConstants');


var _sessionState = {
  authRequestInProgress: false,
  sessionToken: null,
  username: null,
  userId: null,
  userDescription: null,
  userImage: null,
  createdAt: null
};

var _userInfo = {};

var SessionStore = new Store(AppDispatcher);

function setSessionState(sessionParams){
  _sessionState['sessionToken'] = sessionParams['session_token'];
  _sessionState['username'] = sessionParams['username'];
  _sessionState['userId'] = sessionParams['id'];
  _sessionState['userDescription'] = sessionParams['description'];
  _sessionState['userImage'] = sessionParams['image'];
  _sessionState['userEmail'] = sessionParams['email'];
  _sessionState['createdAt'] = sessionParams['created_at'];
}

function setUserInfo(userParams){
  _userInfo = userParams;
}

SessionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case authConstants.LOGIN_CHECK:
    setSessionState(payload.sessionParams);
    this.__emitChange();
    break;
  case authConstants.LOGIN_REQUEST:
    setSessionState(payload.sessionParams);
    this.__emitChange();
    break;
  case authConstants.LOGOUT_REQUEST:
    setSessionState(payload.sessionParams);
    this.__emitChange();
    break;
  case authConstants.UPDATE_SESSION:
    setSessionState(payload.sessionParams);
    this.__emitChange();
    break;
  case authConstants.RECEIVE_USER_INFO:
    setUserInfo(payload.userParams);
    this.__emitChange();
    break;
  }
};

SessionStore.returnUser = function() {
  return {
    username: _sessionState.username,
    userId: _sessionState.userId,
    userDescription: _sessionState.userDescription,
    userImage: _sessionState.userImage,
    userEmail: _sessionState.userEmail,
    createdAt: _sessionState.createdAt
  };
};

SessionStore.getUsername = function() {
  return _sessionState.username;
};

SessionStore.getUserId = function() {
  return _sessionState.userId;
};

SessionStore.isLoggedIn = function() {
  return (_sessionState.sessionToken !== null);
};

SessionStore.returnTrackOwner = function(){
  return _userInfo;
};


module.exports = SessionStore;
