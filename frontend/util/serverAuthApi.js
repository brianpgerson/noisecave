var ErrorActions = require('../actions/ErrorActions');

var ServerAuthApi = {
  loginCheckRequest: function(callback){
    $.ajax({
      url: "api/session/auth",
      type: "GET",
      data: {},
      success: function(data){
        callback(data);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  loginRequest: function(formData, callback){
    $.ajax({
      url: "api/session",
      type: "POST",
      data: formData,
      success: function(data){
        callback(data);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    });
  },
  logoutRequest: function(data, callback){
    $.ajax({
      url: "api/session",
      type: "DELETE",
      data: data,
      success: function(response){
        callback(response);
        ErrorActions.resetErrors();
      },
      error: function(response){
        var error = JSON.parse(response.responseText).errors;
        ErrorActions.sendError(error);
      }
    }
    );
  },
  signUpRequest: function(data, callback){
    $.ajax({
      url: "/api/users",
      type: "POST",
      data: data,
      success: function(response){
        var newParams = {user: response};
        callback(newParams);
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
