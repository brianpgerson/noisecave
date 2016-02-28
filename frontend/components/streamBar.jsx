var PlayStore = require('../stores/playStore');
var React = require('react');
var PlayActions = require('../actions/playActions');

var StreamBar = React.createClass({
  getInitialState: function(){
    return ({
      currentTrack: null,
      playlist: [],
      repeat: false
    });
  },
  componentWillMount: function() {
    PlayStore.addListener(this._dealWithNewTrack);
  },
  _dealWithNewTrack: function(){
    if (
        PlayStore.returnOverride() &&
        PlayStore.returnPlayingNow() === this.state.currentTrack
      ) {
        this.setState({
          currentTrack: PlayStore.returnPlayingNow(),
          repeat: true});
      } else if (PlayStore.returnOverride()) {
      this.setState({
        currentTrack: PlayStore.returnPlayingNow(),
        repeat: false
      });
    } else {
      this.setState({
        playlist: PlayStore.returnPlayListQueue(),
        repeat: false
      });
    }
  },
  checkForNext: function(){
    if (this.state.playlist.length > 0) {
      var nextTrack = this.state.playlist.shift();
      PlayActions.addFromQueue(nextTrack);
    }
  },
  stopPlay: function(){
    document.getElementsByTagName('audio')[0].pause();
  },
  startPlay: function(){
    document.getElementsByTagName('audio')[0].play();
  },
  render: function(){
    var displayBool = this.props.display ? "shown" : "hidden";
    var audio;
    if (this.state.currentTrack !== null) {
      audio = <audio
                onEnded={this.checkForNext}
                src={this.state.currentTrack}
                controls
                repeat={this.state.repeat}
                autoPlay></audio>;
      this.audioPlayer = audio;
    } else {
      audio = "nothin yet";
    }
    return (
      <div className={displayBool}>
        <div className="audio-container">
          <button onClick={this.stopPlay}> STOP </button>
          <button onClick={this.startPlay}> PLAY </button>
          {audio}
        </div>
      </div>
    );
  }
});

module.exports = StreamBar;
