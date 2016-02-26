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
      modalType: null
    });
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
    this.setState({loggedIn: loggedInStatus});
  },
  modalOpenCallback: function(what){
    this.setState({showModals: true, modalType: what});
  },
  modalCloseCallback: function(){
    this.setState({showModals: false, modalType: null});
  },
  funCallback: function(track){
    alert(track);
  },
  render: function () {
    window.ServerTrackApi = ServerTrackApi;
    window.TrackStore = TrackStore;

    var childrenWithProps =
      React.Children.map(this.props.children, function(child){
    	  return React.cloneElement(child, { funCallback: this.funCallback });
      }.bind(this));

    return (
      <div>
        <NavBar
          loginCallback={this.modalOpenCallback}
          loggedIn={this.state.loggedIn} />
        <StreamBar
          display={this.state.showStreamBar} />
        <Modal
          modalCloseCallback={this.modalCloseCallback}
          display={this.state.showModals}
          modalType={this.state.modalType}
          loggedIn={this.state.loggedIn}/>
        {childrenWithProps}

      </div>
    );
  }
});

module.exports = App;
