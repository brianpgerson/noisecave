var NavBar = require('../components/navbar');
var SessionStore = require('../stores/sessionStore');
var PlayStore = require('../stores/playStore');
var TrackStore = require('../stores/trackStore');
var AuthActions = require('../actions/authActions');
var ModalActions = require('../actions/modalActions');
var ServerTrackApi = require('../util/serverTrackApi');
var React = require('react');
var Modal = require('./modal');
var StreamBar = require('../components/streamBar');
var Backgrounds = require('../constants/backgroundConstants');

var App = React.createClass({
  getInitialState: function(){
    return ({
      loggedIn: null,
      showStreamBar: false,
      modalType: null,
      currentUser: null
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount: function(){
    document.body.style.backgroundImage
      = 'url(' + Backgrounds[Math.floor(Math.random() * 3)] + ')';
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
      loggedIn: loggedInStatus, currentUser: currentUser,
    });
  },
  discoverClickCallback: function(){
    this.context.router.push('/discover');
  },
  myMusicClickCallback: function(){
    if (this.state.loggedIn) {
      var userId = SessionStore.getUserId();
      this.context.router.push({
        pathname: '/user/' + userId + '/music',
        query: {currentUserId: userId}
      });
    } else {
      ModalActions.openModalError("login", ["Sorry, you have log in to visit your music page!"]);
    }
  },
  render: function () {
    window.ServerTrackApi = ServerTrackApi;
    window.TrackStore = TrackStore;

    return (
      <div id="big-wrapper">
        <NavBar
          currentUser={this.state.currentUser}
          loggedIn={this.state.loggedIn}
          discoverCallback={this.discoverClickCallback}
          myMusicCallback={this.myMusicClickCallback} />
        <StreamBar
          display={this.state.showStreamBar} />
        <Modal
          loggedIn={this.state.loggedIn}/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
