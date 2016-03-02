var React = require('react');
var TrackStore = require('../stores/trackStore');
var TrackIndexItem = require('./trackIndexItem');
var TrackActions = require('../actions/trackActions');
var SessionStore = require('../stores/sessionStore');

var TracksIndex = React.createClass({
  getInitialState: function(){
    return ({
      tracks: []
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
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
  routeToDetail: function(id){
    this.context.router.push('track/' + id );
  },
  buildTracksOut: function(){
    var tracks;
    if (this.state.tracks.length > 0) {
      if (this.props.userOnly) {
        tracks = this.state.tracks.filter(function(track) {
          return track.creatorId === SessionStore.getUserId();
        }).map(function(track, idx){
          return (
            <TrackIndexItem
              key={idx}
              trackDetailClick={this.routeToDetail}
              track={track}/>
          );
        }.bind(this));
      } else {
        tracks = this.state.tracks.map(function(track, idx){
          return (
            <TrackIndexItem
              key={idx}
              trackDetailClick={this.routeToDetail}
              track={track}/>
          );
        }.bind(this));
      }
    } else {
      tracks = "";
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
