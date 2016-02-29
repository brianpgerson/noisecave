var React = require('react');
var SessionStore = require('../stores/sessionStore');
var AuthActions = require('../actions/authActions');
var UserInfo = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.display) {
      document.getElementsByTagName('body')[0]
        .addEventListener('click', function(e){
          this.props.closeMenuCallback();
      }.bind(this));
      document.getElementsByClassName('profile-dropdown')[0]
        .addEventListener('click', function(e){
          e.stopPropagation();
      });
      document.getElementById('logout').addEventListener('click', function(e){
        this.handleLogout();
      }.bind(this));
    }
  },
  handleLogout: function(){
    AuthActions.logoutRequest();
  },
  render: function(){
    var classname = this.props.display ? "profile-dropdown" : "profile-dropdown hidden";
    return (
     <div className={classname}>
       <ul>
         <li>Hi there, {this.props.currentUser.username}</li>
         <li id="logout">Log Out!</li>
       </ul>
     </div>
    );
  }
});

module.exports = UserInfo;
