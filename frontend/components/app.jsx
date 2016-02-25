var NavBar = require('../components/navbar');
var LoginForm = require('../components/loginForm');
var SessionStore = require('../stores/sessionStore');
var TrackStore = require('../stores/trackStore');
var ServerAuthApi = require('../util/serverAuthApi');
var ServerTrackApi = require('../util/serverTrackApi');
var React = require('react');
var Modal = require('./modal');



var App = React.createClass({
  getInitialState: function(){
    return ({
      loggedIn: null,
      showModals: false,
      modalType: null
    });
  },
  componentWillMount: function(){
    this.sessionListenerToken = SessionStore.addListener(this._onChange);
    ServerAuthApi.loginCheck();
  },
  componentWillUnmount: function(){
    this.sessionListenerToken.remove();
  },
  _onChange: function(){
    var loggedInStatus = SessionStore.isLoggedIn();
    this.setState({loggedIn: loggedInStatus});
  },
  modalOpenCallback: function(what){
    this.setState({showModals: true, modalType: what});
  },
  modalCloseCallback: function(){
    this.setState({showModals: false, modalType: null});
  },
  render: function () {
    window.ServerTrackApi = ServerTrackApi;
    window.TrackStore = TrackStore;


    return (
      <div>
        <NavBar
          loginCallback={this.modalOpenCallback}
          loggedIn={this.state.loggedIn} />
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
