var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var authConstants = require('../constants/authConstants');


var _sessionState = {
  authRequestInProgress: false,
  authErrors: [],
  sessionToken: null,
  username: null,
  userId: null
};

var SessionStore = new Store(AppDispatcher);

function setSessionState(sessionParams){
  _sessionState = sessionParams;
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
  }
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

SessionStore.getAuthErrors = function() {
  return (_sessionState.authErrors !== null);
};

SessionStore.isAuthRequestInProgress = function() {
  return (_sessionState.authRequestInProgress === true);
};


module.exports = SessionStore;
