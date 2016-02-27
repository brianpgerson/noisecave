var PlayStore = require('../stores/playStore');
var React = require('react');
var PlayActions = require('../actions/playActions');

var StreamBar = React.createClass({
  getInitialState: function(){
    return ({
      currentTrack: null,
      playlist: []
    });
  },
  componentWillMount: function() {
    PlayStore.addListener(this._addToPlaylist);
  },
  _addToPlaylist: function(){
    this.setState({playlist: PlayStore.returnPlayListQueue()});
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({currentTrack: PlayStore.returnPlayingNow()});
  },
  checkForNext: function(){
    if (this.state.playlist.length > 0) {
      var nextTrack = this.state.playlist.shift();
      PlayActions.addFromQueue(nextTrack);
    }
  },
  stopPlay: function(){
    document.getElementsByTagName('audio')[0].pause();
    debugger;
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
                controls
                src={this.state.currentTrack}
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
