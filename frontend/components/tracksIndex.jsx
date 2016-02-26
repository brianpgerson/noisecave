var React = require('react');
var TrackStore = require('../stores/trackStore');
var TrackIndexItem = require('./trackIndexItem');
var TrackActions = require('../actions/trackActions');


var TracksIndex = React.createClass({
  getInitialState: function(){
    return ({
      tracks: []
    });
  },
  componentWillMount: function(){
    this.changeListener = TrackStore.addListener(this._onChange);
  },
  componentDidMount: function(){
    TrackActions.getTracks();
  },
  componentWillUnmount: function() {
    this.changeListener.remove();
  },
  _onChange: function(){
    this.setState({
      tracks: TrackStore.all()
    });
  },
  buildTracksOut: function(){
    var tracks;
    if (this.state.tracks.length > 0) {
      tracks = this.state.tracks.map(function(track, idx){
        return (
          <TrackIndexItem
            key={idx}
            track={track}
            playCallback={this.props.funCallback}/>
        );
      }.bind(this));
    } else {
      tracks = "HI!";
    }
    return tracks;
  },
  render: function(){
    var trackIndex = this.buildTracksOut();
    return (
      <div className="content-container">
        <div className="all-tracks group">
          {trackIndex}
        </div>
      </div>
    );
  }
});

module.exports = TracksIndex;
