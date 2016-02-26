var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var authConstants = require('../constants/authConstants');


var _sessionState = {
  authRequestInProgress: false,
  sessionToken: null,
  username: null,
  userId: null
};

var SessionStore = new Store(AppDispatcher);

function setSessionState(sessionParams){
  _sessionState['sessionToken'] = sessionParams['session_token'];
  _sessionState['username'] = sessionParams['username'];
  _sessionState['userId'] = sessionParams['id'];
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


module.exports = SessionStore;
