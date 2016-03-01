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
      document.getElementById('profile-dropdown')
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
    var classname = this.props.display ? "shown" : "hidden";
    return (
     <div className={classname}>
       <ul id={"profile-dropdown"}>
         <li><div id="tiny-pic"
                  style={{
                    background: 'url('+ this.props.currentUser.userImage + ')',
                    backgroundSize: 'contain'
                  }}>

         </div>{this.props.currentUser.username}</li>
         <hr />
         <li>Edit Profile</li>
         <hr />
         <li>Your Tracks</li>
         <hr />
         <li id="logout">Log Out!</li>
       </ul>
     </div>
    );
  }
});

module.exports = UserInfo;
