var React = require('react');
var ReactDOM = require('react-dom');
var SearchBar = require('./searchBar');
var LoginForm = require('./loginForm');
var UserInfo = require('./userInfo');
var ModalActions = require('../actions/modalActions');

var NavBar = React.createClass({
  getInitialState: function(){
    return ({
      showUserInfo: false
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  openProfile: function(){
    this.setState({showUserInfo: true});
  },
  closeProfile: function(){
    this.setState({showUserInfo: false});
  },
  uploadAndProfileText: function(){
    if (this.props.loggedIn === true) {
      return [
        <li onClick={function(){ModalActions.openModal('upload');}} className="right">
          <span>Upload</span>
        </li>,
        <li onClick={this.openProfile} className="right">
          <span>Profile</span>
          <UserInfo
            userProfileCallback={this.handleMyMusicClick}
            currentUser={this.props.currentUser}
            closeMenuCallback={this.closeProfile}
            display={this.state.showUserInfo} />
        </li>
      ];
    } else {
      return [
        <li onClick={function(){ModalActions.openModal('login');}} className="right">
          <span>Login</span>
        </li>,
        <li onClick={function(){ModalActions.openModal('signup');}} className="right">
          <span>Signup</span>
        </li>
      ];
    }
  },
  handleDiscoverClick: function(){
    this.props.discoverCallback();
  },
  handleMyMusicClick: function(){
    this.props.myMusicCallback();
  },
  handleHomeClick: function(){
    this.context.router.push('/');
  },
  render: function(){
    var Upload = this.uploadAndProfileText()[0];
    var Profile = this.uploadAndProfileText()[1];
    return (
      <nav className="navbar">
        <div id="logo" onClick={this.handleHomeClick}><span>noisecave</span></div>
          <ul className="group">
            <li onClick={this.handleDiscoverClick}
              className="left"><span>Discover</span></li>
            <li onClick={this.handleMyMusicClick}
              className="left"><span>My Music</span></li>
            <li id="search-li">
                <SearchBar />
            </li>
            {Upload}
            {Profile}
          </ul>
      </nav>
    );
  }
});

module.exports = NavBar;
