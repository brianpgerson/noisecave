var PlayStore = require('../stores/playStore');
var React = require('react');

var StreamBar = React.createClass({
  getInitialState: function(){
    return ({
      currentTrack: null
    });
  },
  componentWillMount: function() {

  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({currentTrack: PlayStore.returnUrl()});
  },
  render: function(){
    var displayBool = this.props.display ? "shown" : "hidden";
    var audio;
    if (this.state.currentTrack !== null) {
      audio = <audio src={this.state.currentTrack} controls autoPlay></audio>;
    } else {
      audio = "nothin yet";
    }
    return (
      <div className={displayBool}>
        <div className="audio-container">
          {audio}
        </div>
      </div>
    );
  }
});

module.exports = StreamBar;
