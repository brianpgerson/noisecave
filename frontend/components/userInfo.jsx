var React = require('react');
var AuthActions = require('../actions/authActions');
var ModalActions = require('../actions/modalActions');

var UserInfo = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
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
      document.getElementById('profileEdit')
      .addEventListener('click', function(e){
        ModalActions.openModal("profileEdit");
      }.bind(this));
      document.getElementById('logout').addEventListener('click', function(e){
        this.handleLogout();
      }.bind(this));
      document.getElementById('profilePage').addEventListener('click', function(e){
        this.props.userProfileCallback();
      }.bind(this));
    }
  },
  handleLogout: function(){
    AuthActions.logoutRequest();
    this.context.router.push('/discover');
  },
  render: function(){
    var classname = this.props.display ? "shown" : "hidden";
    return (
     <div className={classname}>
       <ul id={"profile-dropdown"}>
         <li id="profilePage"><div id="tiny-pic"
                  style={{
                    background: 'url('+ this.props.currentUser.userImage + ')',
                  }}>

         </div>{this.props.currentUser.username}</li>
         <hr />
         <li id="profileEdit">Edit Profile</li>
         <hr />
         <li id="logout">Log Out!</li>
       </ul>
     </div>
    );
  }
});

module.exports = UserInfo;
