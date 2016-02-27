var React = require('react');
var ReactDOM = require('react-dom');
var LoginForm = require('./loginForm');



var NavBar = React.createClass({
  uploadAndProfileText: function(){
    if (this.props.loggedIn === true) {
      return [
        <li onClick={function(){
          this.props.loginCallback('upload');
        }.bind(this)} className="right">
          <span>Upload</span>
        </li>,
        <li onClick={function(){
          this.props.loginCallback('profile');
        }.bind(this)} className="right">
          <span>Profile</span>
        </li>
      ];
    } else {
      return [
        <li onClick={function(){
          this.props.loginCallback('login');
        }.bind(this)} className="right">
          <span>Login</span>
        </li>,
        <li onClick={function(){
          this.props.loginCallback('signup');
        }.bind(this)} className="right">
          <span>Signup</span>
        </li>
      ];
    }
  },
  handleDiscoverClick: function(){
    this.props.discoverCallback();
  },
  render: function(){
    var Upload = this.uploadAndProfileText()[0];
    var Profile = this.uploadAndProfileText()[1];
    return (
      <nav className="navbar">
          <ul className="group">
            <li onClick={this.handleDiscoverClick}
              className="left"><span>Discover</span></li>
            <li className="left"><span>Playlists</span></li>
            <li id="search-li">
                <input type="text" id="search-box" placeholder="Search songs, playlists, users..."/>
            </li>
            {Upload}
            {Profile}
          </ul>
      </nav>
    );
  }
});

module.exports = NavBar;
