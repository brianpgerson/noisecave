var React = require('react');
var ServerAuthApi = require('../util/serverAuthApi');
var UploadActions = require('../actions/uploadActions');
var TrackActions = require('../actions/trackActions');
var ErrorHandler = require('./errorHandler');
var ErrorActions = require('../actions/ErrorActions');
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
    AudioUrlStore.addListener(this.PubURLReceived);
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
    TrackActions.receiveTrack({
      track: {
        title: this.state.title,
        description: this.state.description,
        image_url: this.state.image_url,
        audio_url: this.state.audio_url,
        creator_id: SessionStore.getUserId(),
        archived: false
      }
    });
    alert("thanks bitch!")

  },
  render: function(){
    return (
      <div>
        <form>
          <label>Track Title <br></br>
          <input type="text"
                  name="title"
                  value={this.state.username}
                  onChange={this.handleInputChanges}/>
          </label>
          <label>Description <br></br>
          <textarea
                  name="description"
                  value={this.state.username}
                  onChange={this.handleInputChanges}>
          </textarea>
          </label>
          <label>Track Image <br></br>
          <input type="file"
                  accept="image/*"
                  title=" "
                  name="imageFile"
                  className="custom-file-input"/>
          </label>
          <label>Audio File <br></br>
          <input type="file"
                  accept="audio/*"
                  title=" "
                  id="audioFile"
                  onChange={this.handleUpload}
                  className="custom-file-input"/>
          </label>
          <input type="submit"
                  value="Upload"
                  id="upload"
                  onClick={this.handleSubmits} />
        </form>
      </div>
    );
  }
});

module.exports = TrackUpload;
