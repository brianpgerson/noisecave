var React = require('react');
var ProgressStore = require('../stores/progressStore');
var Equalizer = require('./equalizer');

var ProgressBar = React.createClass({
  getInitialState: function(){
    return ({
      currentPercent: 0,
      currentTime: 0
    });
  },
  componentDidMount: function(){
    this.progressListener = ProgressStore.addListener(this._updateProgress);
  },
  componentWillUnmount: function() {
    this.progressListener.remove();
  },
  _updateProgress: function(){
    this.setState({
      currentPercent: ProgressStore.returnPercent(),
      currentTime: ProgressStore.returnTime()
    });
  },
  _handleSlide: function(e){
    e.preventDefault();
    this.props.changeAudioTime((e.target.value) / 300);
  },
  _returnTimeLeft: function() {
    var seconds = this.state.currentTime;
    var minutes;

    if (seconds < 60) {
      minutes = "0";
      var freshSeconds = Math.floor(seconds).toString();
    } else {
      minutes = Math.floor(seconds / 60).toString();
      freshSeconds = Math.floor(seconds % 60).toString();
    }
    if (freshSeconds.length === 1) {
      freshSeconds = "0" + freshSeconds;
    }
    return minutes + ":" + freshSeconds;
  },
  render: function(){
    var time = this._returnTimeLeft();
    return (
      <div>
        <div className="progress-bar-container">
          <Equalizer isPlaying={this.props.isPlaying}
                      width={this.state.currentPercent}/>
          <input type="range"
                  id="progress-slider"
                  min="0"
                  max="300"
                  step="0.1"
                  onChange={this._handleSlide}
                  value={this.state.currentPercent * 3}
                  defaultValue="0">
          </input>
        </div>
        <span className="time-left">{time}</span>
      </div>
    );
  }
});

module.exports = ProgressBar;
