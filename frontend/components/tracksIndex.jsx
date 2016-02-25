var React = require('react');
var TrackStore = require('../stores/trackStore');
var ServerTrackApi = require('../util/serverTrackApi');
var TrackIndexItem = require('./trackIndexItem');


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
    ServerTrackApi.fetchTracks();
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
      tracks = this.state.tracks.map(function(track){
        return (
          <TrackIndexItem track={track} />
        );
      });
    } else {
      tracks = "HI!";
    }
    return tracks;
  },
  render: function(){
    var trackIndex = this.buildTracksOut();
    return (
      <div className="container all-tracks">
        <div className="row">
          {trackIndex}
        </div>
      </div>
    );
  }
});

module.exports = TracksIndex;
