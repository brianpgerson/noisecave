var NavBar = require('../components/navbar');
var SessionStore = require('../stores/sessionStore');
var PlayStore = require('../stores/playStore');
var TrackStore = require('../stores/trackStore');
var AuthActions = require('../actions/authActions');
var ServerTrackApi = require('../util/serverTrackApi');
var React = require('react');
var Modal = require('./modal');
var StreamBar = require('../components/streamBar');

window.AuthActions = AuthActions;

var App = React.createClass({
  getInitialState: function(){
    return ({
      loggedIn: null,
      showModals: false,
      showStreamBar: false,
      modalType: null,
      currentUser: null
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount: function(){
    this.sessionListenerToken = SessionStore.addListener(this._onSessionChange);
    this.playListenerToken = PlayStore.addListener(this._onPlayChange);
    AuthActions.loginCheckRequest();
  },
  componentWillUnmount: function(){
    this.sessionListenerToken.remove();
    this.playListenerToken.remove();
  },
  _onPlayChange: function(){
    this.setState({showStreamBar: true});
  },
  _onSessionChange: function(){
    var loggedInStatus = SessionStore.isLoggedIn();
    var currentUser = SessionStore.returnUser();
    this.setState({
      loggedIn: loggedInStatus, currentUser: currentUser, showModals: false
    });
  },
  modalOpenCallback: function(what){
    this.setState({showModals: true, modalType: what});
  },
  modalCloseCallback: function(){
    this.setState({showModals: false, modalType: null});
  },
  discoverClickCallback: function(){
    this.context.router.push('/discover');
  },
  render: function () {
    window.ServerTrackApi = ServerTrackApi;
    window.TrackStore = TrackStore;

    return (
      <div>
        <NavBar
          currentUser={this.state.currentUser}
          modalCallback={this.modalOpenCallback}
          loggedIn={this.state.loggedIn}
          discoverCallback={this.discoverClickCallback}/>
        <StreamBar
          display={this.state.showStreamBar} />
        <Modal
          modalCloseCallback={this.modalCloseCallback}
          display={this.state.showModals}
          modalType={this.state.modalType}
          loggedIn={this.state.loggedIn}/>
        {this.props.children}

      </div>
    );
  }
});

module.exports = App;
