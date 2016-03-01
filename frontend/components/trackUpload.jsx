var React = require('react');
var UploadActions = require('../actions/uploadActions');
var TrackActions = require('../actions/trackActions');
var AudioUrlStore = require('../stores/audioUrlStore');
var SessionStore = require('../stores/sessionStore');

window.SessionStore = SessionStore;

DEFAULT_IMAGES = [
  "http://res.cloudinary.com/thadowg/image/upload/c_fit,h_405,w_405/v1456774334/Screen_Shot_2016-02-29_at_11.27.57_AM_tlb8ga.png",
  "http://res.cloudinary.com/thadowg/image/upload/v1456774334/Screen_Shot_2016-02-29_at_11.29.32_AM_hyce4y.png",
  "http://res.cloudinary.com/thadowg/image/upload/v1456774335/Screen_Shot_2016-02-29_at_11.31.38_AM_ru6mfi.png"
]

var TrackUpload = React.createClass({
  getInitialState: function(){
    return({
      title: "",
      description: "",
      imageUrl: DEFAULT_IMAGES[Math.floor(Math.random() * 3)],
      audioUrl: "",
      percentComplete: 0,
      newImage: false,
      thumbUrl: "http://res.cloudinary.com/thadowg/image/upload/v1456774819/default_album_300_g4_ufur3z.png"
    });
  },
  componentWillMount: function() {
    this.audioStoreListener = AudioUrlStore.addListener(this.handleAudioUpload);
  },
  componentWillUnmount: function() {
    this.audioStoreListener.remove();
  },
  handleAudioUpload: function(){
    this.setState({audioUrl: AudioUrlStore.returnUrl(),
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
        image_url: this.state.imageUrl,
        audio_url: this.state.audioUrl,
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
      upload_preset: 'funupload',
      theme: 'minimal'
    }, function(error, result){
      if (error) {
        alert("error!");
      } else {
        this.setState({
          imageUrl: result[0].url,
          thumbUrl: result[0].url,
          newImage: true
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
    if (this.state.audioUrl !== undefined && this.state.percentComplete > 0.99 &&
        this.state.title.length > 0) {
      return false;
    } else {
      return true;
    }
  },
  render: function(){
    var thumbStyle = {backgroundImage: 'url(' + this.state.thumbUrl + ')',
                      backgroundSize: 'contain'};
    var mp3ButtonStyle = this.handlePercentage();
    var imgButtonStyle = {backgroundColor: this.state.newImage ? "#2989d8" : "#F5F5F5"}
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
            <button style={imgButtonStyle}
                    className="upload-buttons"
                    onClick={this.uploadImage}>Add Image</button>
            <br />
            <input type="file"
                    accept="audio/*"
                    name="audioFile"
                    id="audioFile"
                    onChange={this.handleUpload}
                    className="input-file"/>
                  <label style={mp3ButtonStyle}
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
