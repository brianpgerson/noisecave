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
    }
  },
  handleLogout: function(){
    AuthActions.logoutRequest();
  },
  render: function(){
    if (this.props.display) {
      var classname = "profile-dropdown";
      var profile = (
        <ul>
          // TODO finish this
          <li>Hi there, {this.props.currentUser.username}</li>
          <li onClick={this.handleLogout}>Log Out!</li>
        </ul>
      );
    } else {
      classname = "profile-dropdown hidden";
      profile = <div></div>;
    }
    return (
     <div className={classname}>
       {profile}
     </div>
    );
  }
});

module.exports = UserInfo;
