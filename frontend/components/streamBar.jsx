var PlayStore = require('../stores/playStore');
var React = require('react');
var PlayActions = require('../actions/playActions');
var PlayButton = require('./playButton');
var ProgressBar = require('./progressBar');
var ProgressActions = require('../actions/progressActions');
var StreamingTrackInfo = require('./streamingTrackInfo');

var StreamBar = React.createClass({
  getInitialState: function(){
    return ({
      currentTrack: null,
      currentUrl: null,
      playlist: [],
      isPlaying: true
    });
  },
  componentWillMount: function() {
    this.playStoreListener = PlayStore.addListener(this._dealWithNewTrack);
  },
  componentWillUnmount: function() {
    this.playStoreListener.remove();
  },
  _dealWithNewTrack: function(){
    //handle repeated plays of the same track: setting a query string on the
    //source url to force a re-render of the audio element
    if (PlayStore.returnOverride()) {
        var queryString = new Date().getTime().toString();
        var track = PlayStore.returnPlayingNow();
        var newUrl = track.audioUrl + "?" + queryString;
        this.setState({
          currentTrack: track,
          currentUrl: newUrl,
          isPlaying: true
          });
      } else {
      this.setState({
        playlist: PlayStore.returnPlayListQueue()
      });
    }
  },
  checkForNext: function(){
    if (this.state.playlist.length > 0) {
      var nextTrack = this.state.playlist.shift();
      PlayActions.addFromQueue(nextTrack);
    } else {
      this.setState({isPlaying: false});
    }
  },
  stopPlay: function(){
    document.getElementsByTagName('audio')[0].pause();
    this.setState({isPlaying: false});
  },
  startPlay: function(){
    document.getElementsByTagName('audio')[0].play();
    this.setState({isPlaying: true});
  },
  updateProgress: function(e){
    e.preventDefault();
    var player = document.getElementById('audio_player');
    var percentDone;
    if (player.currentTime > 0) {
      percentDone = (player.currentTime / player.duration * 100);
    } else {
      percentDone = 0;
    }
    ProgressActions.updateProgress(percentDone, player.currentTime);
  },

  _updateAudioBar: function(percentDone){
    var player = document.getElementById('audio_player');
    player.currentTime = percentDone * player.duration;
  },

  render: function(){
    var displayBool = this.props.display ? "shown" : "hidden";
    var audio;
    if (this.state.currentUrl !== null) {
      audio = (
          <div className={this.state.repeat}>
            <audio
              id="audio_player"
              onTimeUpdate={this.updateProgress}
              onEnded={this.checkForNext}
              src={this.state.currentUrl}
              autoPlay></audio>
          </div>
      );
      var track = this.state.currentTrack;
    } else {
      audio = "nothin yet";
    }
    return (
      <div className={displayBool}>
        <div className="audio-container">
          {audio}
          <PlayButton isPlaying={this.state.isPlaying}
            play={this.startPlay} pause={this.stopPlay} />
          <ProgressBar isPlaying={this.state.isPlaying}
                        changeAudioTime={this._updateAudioBar} />
          <StreamingTrackInfo track={this.state.currentTrack} />
        </div>
      </div>
    );
  }
});

module.exports = StreamBar;
