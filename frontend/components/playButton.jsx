var React = require('react');

var PlayButton = React.createClass({
  render: function(){
    var theButton;
    if (this.props.isPlaying) {
      theButton = (
        <button className="stream-play"
                onClick={this.props.pause}>Pause</button>
      );
    } else {
      theButton = (
        <button className="stream-play"
                onClick={this.props.play}>Play</button>
        );
    }
    return (
      <div>
        {theButton}
      </div>
    );
  }
});

module.exports = PlayButton;
