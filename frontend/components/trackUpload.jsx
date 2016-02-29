var React = require('react');
var UploadActions = require('../actions/uploadActions');
var TrackActions = require('../actions/trackActions');
var AudioUrlStore = require('../stores/audioUrlStore');
var SessionStore = require('../stores/sessionStore');

window.SessionStore = SessionStore;

var TrackUpload = React.createClass({
  getInitialState: function(){
    return({
      title: "",
      description: "",
      image_url: "http://res.cloudinary.com/thadowg/image/upload/v1456691500/qupu3aoeebrbx38b4ffp.jpg",
      audio_url: "",
      percentComplete: 0
    });
  },
  componentWillMount: function() {
    this.audioStoreListener = AudioUrlStore.addListener(this.handleAudioUpload);
  },
  componentWillUnmount: function() {
    this.audioStoreListener.remove();
  },
  handleAudioUpload: function(){
    this.setState({audio_url: AudioUrlStore.returnUrl(),
                    percentComplete: AudioUrlStore.returnPercent()});
  },
  handleInputChanges: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  handleUpload: function(e){
    e.preventDefault();
    var file = $('#audioFile')[0].files[0];
    UploadActions.initiateUpload("tracks/audio/", file);
  },
  handleSubmits: function(e){
    e.preventDefault();
    TrackActions.addTrack({
      track: {
        title: this.state.title,
        description: this.state.description,
        image_url: this.state.image_url,
        audio_url: this.state.audio_url,
        creator_id: SessionStore.getUserId(),
        archived: false
      }
    });
    alert("thanks bitch!");
  },
  uploadImage: function(e){
    e.preventDefault();
    cloudinary.openUploadWidget({
      cloud_name: 'thadowg',
      upload_preset: 'funupload'
    }, function(error, result){
      if (error) {
        alert("error!");
      } else {
        this.setState({
          image_url: result[0].url,
          thumbnail_url: result[0].thumbnail_url
        });
      }
    }.bind(this));
  },
  handlePercentage: function(){
    var percent = (this.state.percentComplete * 100);
    console.log(percent);
    var coolButtonStyle = {
      background: "#2989d8",
      background: '-moz-linear-gradient(left,  #2989d8 0%, #2989d8 ' + percent + '%, #F5F5F5 ' + percent + '%, #F5F5F5 ' + percent + '%)',
      background: 'linear-gradient(to right,  #2989d8 0%,#2989d8 ' + percent + '%,#F5F5F5 ' + percent + '%,#F5F5F5 ' + percent + '%)',
      filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#F5F5F5', endColorstr='#F5F5F5',GradientType=1)"
    }
    return coolButtonStyle;
  },
  areAnyInvalid: function(){
    if (this.state.audio_url !== undefined && this.state.percentComplete > 0.99 &&
        this.state.title.length > 0) {
      return false;
    } else {
      return true;
    }
  },

  render: function(){
    var thumbStyle = {backgroundImage: 'url(' + this.state.image_url + ')',
                      backgroundSize: 'contain'};
    var buttonStyle = this.handlePercentage();
    var anyInvalid = this.areAnyInvalid();
    return (
      <div className="track-upload">
        <h5>Upload a Track</h5>
        <form>
          <div className="title-and-descrip group">
            <label>Track Title: <br></br>
            <input type="text"
                    name="title"
                    className="upload-text"
                    value={this.state.username}
                    onChange={this.handleInputChanges}/>
            </label>
            <label>Track Description: <br></br>
            <textarea
                    name="description"
                    className="upload-text"
                    value={this.state.username}
                    onChange={this.handleInputChanges}>
            </textarea>
            </label>
          </div>
          <div className="file-section">
            <label>Upload Files: </label>
              <div className="image-thumbnail" style={thumbStyle}>
              </div>
            <button className="upload-buttons"
                    onClick={this.uploadImage}>Add Image</button>
            <br />
            <input type="file"
                    accept="audio/*"
                    name="audioFile"
                    id="audioFile"
                    onChange={this.handleUpload}
                    className="input-file"/>
                  <label style={buttonStyle}
                          className="upload-buttons"
                          htmlFor="audioFile">Add an MP3</label>
          </div>

          <input type="submit"
                  value="Save"
                  id="upload"
                  disabled={anyInvalid}
                  onClick={this.handleSubmits} />
        </form>
      </div>
    );
  }
});

module.exports = TrackUpload;
