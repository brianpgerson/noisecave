var React = require('react');
var ErrorHandler = require('./errorHandler');
var ErrorActions = require('../actions/ErrorActions');

var LoginForm = React.createClass({

  getInitialState: function(){
    return ({
      username: "",
      email: "",
      password: "",
    });
  },

  handleSubmits: function(e){
    e.preventDefault();
    var type = e.target.name;
    var request;
    var alreadyDoneThisAction;
    switch(type) {
      case "up":
        request = "signUpRequest";
        alreadyDoneThisAction = true;
        break;
      case "in":
        request = "loginRequest";
        alreadyDoneThisAction = true;
        break;
      case "out":
        request = "logoutRequest";
        alreadyDoneThisAction = false;
        break;
    }

    var sessionParams =
      {user: {
              username: this.state.username,
              email: this.state.email,
              password: this.state.password
            }
      };

      debugger;
    //check email validity before sending server request.
    if (request === "signUpRequest" && !this.isGoodEmail(sessionParams.user.email)) {
      ErrorActions.sendError(["Please use a real email address!"]);
    } else if (this.props.loggedIn !== alreadyDoneThisAction) {
      authActions[request](sessionParams);
    }
  },

  isGoodEmail: function(email){
    return /(\@)(.+)(\.)/.test(email);
  },

  handleInputChanges: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  determineValidity: function(){
    if (this.state.username.length > 0 &&
        (this.state.email.length > 0 || !this.props.formOptions.emailShow) &&
        (this.state.password.length > 6 && this.state.password.length > 0)) {
        var lengthCheck = "";
        var anyInvalid = false;
      } else if (this.state.password.length > 0 && 6 > this.state.password.length){
        lengthCheck = <span className="helper-text"> Please select a password > 6 characters.</span>;
        anyInvalid = true;
      } else {
        lengthCheck = "";
        anyInvalid = true;
      }
    return [anyInvalid, lengthCheck];
  },
  render: function(){
    var options = this.props.formOptions;

    var checks = this.determineValidity();
    var anyInvalid = checks[0];
    var lengthCheck = (options.checkLength && checks[1]) ? checks[1] : "";

    return (
      <div className="sign-up-in">
        <ErrorHandler />
        <form>
          <h5>{options.title}</h5>
          <p>
            <label>{options.usernameLabel}
            <input type="text"
                    className="login-text-input"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChanges}/>
            </label>
          </p>
          <p className={options.emailShow ? "show" : "hidden"}>
            <label>Enter your Email:
            <input type="email"
                    className="login-text-input"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChanges}/>
            </label>
          </p>
          <p>
            <label>{options.passwordLabel}{lengthCheck}
            <input type="password"
                    className="login-text-input"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChanges}/>
            </label>
          </p>
          <div className="login-pair">
            <input type="submit"
                    value={options.buttonText}
                    name={options.buttonType}
                    disabled={anyInvalid}
                    onClick={this.handleSubmits} />
            <input type="submit"
                    value="Cancel"
                    name="out"
                    onClick={this.handleSubmits} />
          </div>

        </form>

      </div>
    );
  }
});

module.exports = LoginForm;
