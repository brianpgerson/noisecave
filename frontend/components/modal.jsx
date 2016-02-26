var React = require('react');
var LoginForm = require('../components/loginForm');
var TrackUpload = require('../components/trackUpload');

var Modal = React.createClass({
  formProps: function(type){
    var formProps;
    switch(type){
      case "signup":
        formProps = {title: "Sign Up",
          usernameLabel: "Choose a Username: ",
          emailShow: true,
          passwordLabel: "Pick a Password: ",
          buttonText: "Sign Up!",
          checkLength: true,
          buttonType: "up"
        };
        break;
      case "login":
        formProps = {
          title: "Welcome Back",
          usernameLabel: "Enter Username: ",
          emailShow: false,
          passwordLabel: "Enter Password: ",
          buttonText: "Log In!",
          checkLength: false,
          buttonType: "in"
        };
        break;
      case "upload":
        formProps = {
          height: 450,
          width: 450,
          title: "Upload a Track"
        };
        break;
    }
  return formProps;
  },
  whatToDisplay: function(){
    var modalType = this.props.modalType;
    switch(modalType) {
      case "signup":
          var theModal =
          <LoginForm
            formOptions={this.formProps("signup")}
            closeModalCallback={this.props.modalCloseCallback}
            loggedIn={this.props.loggedIn} />;
          break;
      case "login":
          theModal =
          <LoginForm
            formOptions={this.formProps("login")}
            closeModalCallback={this.props.modalCloseCallback}
            loggedIn={this.props.loggedIn} />;
          break;
      case "upload":
          theModal =
          <TrackUpload
            formOptions={this.formProps("upload")}
            closeModalCallback={this.props.modalCloseCallback}/>;
          break;
      case "profile":
          theModal =
          <LoginForm
            formOptions={this.formProps("login")}
            closeModalCallback={this.props.modalCloseCallback}
            loggedIn={this.props.loggedIn} />;
          break;
      }
    return theModal;
  },
  render: function(){
    var bool = this.props.display ? "shown" : "hidden";
    var theModal = this.whatToDisplay();
    var uploadStyle = {width: '650px',  height: '350px', transform: 'translateX(-345px)'};
    var loginStyle = {width: '360px', height: '360px'};
     return (
      <div className={bool}>
        <div className="modal-box"
          style={this.props.modalType === "upload" ? uploadStyle : loginStyle }>
          {theModal}
        </div>
        <div
          className="modal-background"
          onClick={this.props.modalCloseCallback}>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
