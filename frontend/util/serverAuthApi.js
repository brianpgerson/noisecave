var AuthActions = require('../actions/authActions');
var ErrorActions = require('../actions/ErrorActions');

var ServerAuthApi = {
  loginCheck: function(){
    $.ajax({
      url: "api/session/auth",
      type: "GET",
      data: {},
      success: function(data){
        AuthActions.loginCheck(data);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  loginRequest: function(formData){
    $.ajax({
      url: "api/session",
      type: "POST",
      data: formData,
      success: function(data){
        AuthActions.loginRequest(data);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  logoutRequest: function(data){
    $.ajax({
      url: "api/session",
      type: "DELETE",
      data: data,
      success: function(response){
        AuthActions.logoutRequest(response);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    }
    );
  },
  signUpRequest: function(data){
    $.ajax({
      url: "/api/users",
      type: "POST",
      data: data,
      success: function(response){
        AuthActions.loginRequest(response);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  }
};

module.exports = ServerAuthApi;
