var React = require('react');
var LoginForm = require('../components/loginForm');
var TrackUpload = require('../components/trackUpload');
var EditForm = require('../components/editForm');
var Modal = require('boron/OutlineModal');
var ModalStore = require('../stores/modalStore');
var PlaylistModal = require('../components/playlistModal');

var MyModal = React.createClass({
  getInitialState: function() {
    return {
      display: false,
      type: null,
      errors: []
    };
  },
  componentWillMount: function() {
    this.modalStoreListener = ModalStore.addListener(this._handleModalChanges);
  },
  _handleModalChanges: function() {
    this.setState({
      type: ModalStore.returnType(),
      errors: ModalStore.returnErrors()
    });
    if (ModalStore.returnDisplay()) {
      this.refs.modal.show();
    } else {
      this.refs.modal.hide();
    }
  },
  formProps: function(type){
    var formProps;
    switch(type){
      case "signup":
        formProps = {title: "Sign Up",
          usernameLabel: "Choose a Username: ",
          emailShow: true,
          passwordLabel: "Pick a Password: ",
          buttonText: "Sign Up!",
          checkLength: true,
          buttonType: "up"
        };
        break;
      case "login":
        formProps = {
          title: "Welcome Back",
          usernameLabel: "Enter Username: ",
          emailShow: false,
          passwordLabel: "Enter Password: ",
          buttonText: "Log In!",
          checkLength: false,
          buttonType: "in",
          errors: this.state.errors
        };
        break;
      case "upload":
        formProps = {
          title: "Upload a Track"
        };
        break;
    }
  return formProps;
  },
  whatToDisplay: function(){
    switch(ModalStore.returnType()) {
      case "signup":
        var theModal =
          <div className="modal-wrapper"> <LoginForm
            formOptions={this.formProps("signup")}
            loggedIn={this.props.loggedIn} />
          </div>;
        break;
      case "login":
        theModal =
          <div className="modal-wrapper"> <LoginForm
            formOptions={this.formProps("login")}
            loggedIn={this.props.loggedIn} />
          </div>;
        break;
      case "upload":
        theModal =
          <div className="modal-wrapper"> <TrackUpload/>
          </div>;
        break;
      case "profileEdit":
        theModal =
          <div className="modal-wrapper">
            <EditForm loggedIn={this.props.loggedIn} />
          </div>;
        break;
      case "playlist":
          theModal =
            <div className="modal-wrapper">
              <PlaylistModal track={ModalStore.returnTrack()} />
            </div>;
          break;
      }
    return theModal;
  },
  returnModalStyles: function(){
    return {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      borderRadius: '5px'
    };
  },
  render: function(){

    var type = ModalStore.returnType();
    var theModal = this.whatToDisplay();
    var modalSizing = {};
    if (type === "upload") {
      modalSizing.width = '680px';
      modalSizing.height = '350px';
    } else if (type === "signup") {
      modalSizing.width = '400px';
      modalSizing.height = '360px';
    } else if (type === "login" ) {
      modalSizing.width = '380px';
      modalSizing.height = '300px';
    } else if (type === "playlist"){
      modalSizing.width = '680px';
      modalSizing.height = '300px';
    } else {
      modalSizing.width = '680px';
      modalSizing.height = '450px';
    }

    var contentStyle = this.returnModalStyles();

     return (
      <div>
        <Modal contentStyle={contentStyle} modalStyle={modalSizing} ref="modal">
          {theModal}
        </Modal>
      </div>
    );
  }
});

module.exports = MyModal;
