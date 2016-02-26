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
      image_url: "",
      audio_url: ""
    });
  },
  componentWillMount: function() {
    this.audioStoreListener = AudioUrlStore.addListener(this.PubURLReceived);
  },
  componentWillUnmount: function() {
    this.audioStoreListener.remove();
  },
  PubURLReceived: function(){
    this.setState({audio_url: AudioUrlStore.returnUrl()});
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
  render: function(){
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
            <input type="file"
                    accept="image/*"
                    name="imageFile"
                    id="imageFile"
                    className="input-file"/>
                  <label htmlFor="imageFile">Add an Image</label>
            <br />
            <input type="file"
                    accept="audio/*"
                    name="audioFile"
                    id="audioFile"
                    onChange={this.handleUpload}
                    className="input-file"/>
            <label htmlFor="audioFile">Add an MP3</label>
          </div>

          <input type="submit"
                  value="Save"
                  id="upload"
                  onClick={this.handleSubmits} />
        </form>
      </div>
    );
  }
});

module.exports = TrackUpload;
