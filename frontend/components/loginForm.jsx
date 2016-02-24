var React = require('react');
var ServerAuthApi = require('../util/serverAuthApi');
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
    var check;
    switch(type) {
      case "up":
        request = "signUpRequest";
        check = true;
        break;
      case "in":
        request = "loginRequest";
        check = true;
        break;
      case "out":
        request = "logoutRequest";
        check = false;
        break;
    }

    var sessionParams =
      {user: {
              username: this.state.username,
              email: this.state.email,
              password: this.state.password
            }
      };
    //check email validity before sending server request.
    if (check === true && !this.isGoodEmail(sessionParams.user.email)) {
      ErrorActions.sendError(["Please use a real email address!"]);
    } else if (this.props.loggedIn !== check) {
      ServerAuthApi[request](sessionParams);
      this.props.closeModalCallback();
    }
  },

  isGoodEmail: function(email){
    return /(\@)(.+)(\.)/.test(email);
  },

  handleInputChanges: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  render: function(){
    if (this.state.email.length > 0 && this.state.username.length > 0 &&
      (this.state.password.length > 6 && this.state.password.length > 0)) {
        var anyInvalid = false;
      } else if (this.state.password.length > 0 && 6 > this.state.password.length){
        var lengthCheck = "Please select a password > 6 characters.";
        anyInvalid = true;
      } else {
        anyInvalid = true;
      }
      var test;

      switch(this.props.loggedIn){
        case null:
          test = "";
          break;
        case true:
          test = "Logged In";
          break;
        case false:
          test = "Who Are You?";
          break;
      }
    return (
      <div className="sign-up-in">
        <ErrorHandler />
        <form>
          <p>
            <label>Pick a Username: <br />
            <input type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChanges}/>
            </label>
          </p>
          <p>
            <label>Enter your Email: <br />
            <input type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChanges}/>
            </label>
          </p>
          <p>
            <label>Pick a Password: {lengthCheck}<br />
            <input type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChanges}/>
            </label>
          </p>
          <p>
            <input type="submit"
                    value="Sign Up"
                    name="up"
                    disabled={anyInvalid}
                    onClick={this.handleSubmits} />
            <input type="submit"
                    value="Sign In"
                    name="in"
                    disabled={anyInvalid}
                    onClick={this.handleSubmits} />
            <input type="submit"
                    value="Sign Out"
                    name="out"
                    onClick={this.handleSubmits} />
          </p>
          <p>{test}</p>

        </form>

      </div>
    );
  }
});

module.exports = LoginForm;
