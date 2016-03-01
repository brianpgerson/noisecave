var React = require('react');
var SessionStore = require('../stores/sessionStore');
var AuthActions = require('../actions/authActions');
var ErrorHandler = require('./errorHandler');
var ErrorActions = require('../actions/ErrorActions');

var EditForm = React.createClass({
  getInitialState: function(){
    return ({
      username: "",
      email: "",
      imageUrl: "",
      description: "",
      newImage: false
    });
  },

  componentDidMount: function() {
    var currentUser = SessionStore.returnUser();
    this.setState({
      username: currentUser.username,
      description: currentUser.userDescription,
      imageUrl: currentUser.userImage,
      email: currentUser.userEmail
    });
  },

  uploadImage: function(e){
    e.preventDefault();
    cloudinary.openUploadWidget({
      cloud_name: 'thadowg',
      upload_preset: 'funupload',
      theme: 'minimal'
    }, function(error, result){
      if (error) {
        alert("error!");
      } else {
        this.setState({
          imageUrl: result[0].url,
          newImage: true
        });
      }
    }.bind(this));
  },

  isGoodEmail: function(email){
    return /(\@)(.+)(\.)/.test(email);
  },

  handleInputChanges: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },

  handleCancel: function(e){
    e.preventDefault();
    this.props.closeModalCallback();
  },

  determineValidity: function(){
    if (this.state.username.length > 0 &&
        this.state.email.length > 0  &&
        this.isGoodEmail(this.state.email)){
        var anyInvalid = false;
      } else {
        anyInvalid = true;
      }
    return anyInvalid;
  },

  _handleSubmits: function(e){
    e.preventDefault();
    var newUser = {user:
      {
        username: this.state.username,
        email: this.state.email,
        image: this.state.imageUrl,
        description: this.state.description
      }
    };
    AuthActions.updateUserInfoRequest(newUser, SessionStore.getUserId());
  },

  render: function() {
    var imgButtonStyle =
      {backgroundColor: this.state.newImage ? "#2989d8" : "#F5F5F5"};
    var anyInvalid = this.determineValidity();
    var thumbStyle = {backgroundImage: 'url(' + this.state.imageUrl + ')',
                      backgroundSize: 'contain'};
    return (
      <div className="edit-profile">
        <ErrorHandler />
        <form>
          <h5>Edit Your Profile</h5>
            <div className="title-and-descrip group">
              <label>Edit Username
              <input type="text"
                      className="login-text-input"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInputChanges}/>
              </label>
              <label>Update your Email:
              <input type="email"
                      className="login-text-input"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChanges}/>
              </label>
              <label>Update your Bio:
              <textarea
                      className="login-text-input"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChanges}/>
              </label>
            </div>
            <div className="file-section">
              <span className="helper-text">Other users can see this image on your user profile page, your public playlists, and any tracks you've uploaded.</span>
              <div className="image-thumbnail" style={thumbStyle}></div>
              <button style={imgButtonStyle}
                      className="upload-buttons"
                      onClick={this.uploadImage}>Add Image</button>
            </div>
            <br />
            <input type="submit"
                    value="Update"
                    disabled={anyInvalid}
                    onClick={this._handleSubmits} />
            <input type="submit"
                    value="Cancel"
                    name="cancel"
                    onClick={this.handleCancel} />
        </form>

      </div>
    );
  }
});

module.exports = EditForm;
