var React = require('react');
var LoginForm = require('../components/loginForm');

var Modal = React.createClass({
  loginProps: function(type){
    if (type === "signup"){
      var loginProps = {title: "Sign Up",
      usernameLabel: "Choose a Username: ",
      emailShow: true,
      passwordLabel: "Pick a Password: ",
      buttonText: "Sign Up!",
      checkLength: true,
      buttonType: "up"
      };
    } else {
      loginProps = {
        title: "Welcome Back",
        usernameLabel: "Enter Username: ",
        emailShow: false,
        passwordLabel: "Enter Password: ",
        buttonText: "Log In!",
        checkLength: false,
        buttonType: "up"
      };
    }
    return loginProps;
  },
  whatToDisplay: function(){
    var modalType = this.props.modalType;
    switch(modalType) {
      case "signup":
          var theModal =
          <LoginForm
            formOptions={this.loginProps("signup")}
            closeModalCallback={this.props.modalCloseCallback}
            loggedIn={this.props.loggedIn} />;
          break;
      case "login":
          theModal =
          <LoginForm
            formOptions={this.loginProps("login")}
            closeModalCallback={this.props.modalCloseCallback}
            loggedIn={this.props.loggedIn} />;
          break;
      case "upload":
          theModal =
          <LoginForm
            formOptions={this.loginProps("login")}
            closeModalCallback={this.props.modalCloseCallback}
            loggedIn={this.props.loggedIn} />;
          break;
      case "profile":
          theModal =
          <LoginForm
            formOptions={this.loginProps("login")}
            closeModalCallback={this.props.modalCloseCallback}
            loggedIn={this.props.loggedIn} />;
          break;
      }
    return theModal;
  },
  render: function(){
    var bool = this.props.display ? "shown" : "hidden";
    var theModal = this.whatToDisplay();
     return (
      <div className={bool}>
        <div className="modal-box">
          {theModal}
        </div>
        <div className="modal-background" onClick={this.props.modalCloseCallback}>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
