var React = require('react');
var LoginForm = require('../components/loginForm');

var Modal = React.createClass({
  whatToDisplay: function(){
    var modalType = this.props.modalType;
    if (modalType === "signup" || modalType === "profile") {
    var theModal = <LoginForm
                      closeModalCallback={this.props.modalCloseCallback}
                      loggedIn={this.props.loggedIn} />;
    }
    return theModal;
  },
  render: function(){
    var bool = this.props.display ? "shown" : "hidden";
    var theModal = this.whatToDisplay();
     return (
      <div className={bool}>
        <div className="modal-background">
          <div className="modal-box">
            {theModal}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
