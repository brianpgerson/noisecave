var React = require('react');
var TrackStore = require('../stores/trackStore');
var TrackIndexItem = require('./trackIndexItem');
var TrackListIndexItem = require('./trackListIndexItem');
var TrackActions = require('../actions/trackActions');
var SessionStore = require('../stores/sessionStore');

var TracksIndex = React.createClass({
  getInitialState: function(){
    return ({
      tracks: [],
      searched: false
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
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.location) {
      if (nextProps.location.search.length > 0) {
        var searchterms = nextProps.location.search.split("=")[1].toLowerCase().split(("+"));
        var searchedTracks = TrackStore.all().filter(function(track){
          var splitTitle = track.title.toLowerCase().split(" ");
          return searchterms.every(function(searchWord){
            return splitTitle.indexOf(searchWord) >= 0;
          });
        });

        this.setState({
          tracks: searchedTracks,
          searched: true
        });
      }
    }
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
            <TrackListIndexItem
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
    var header = this.state.searched ? "Results: " : "";
    var trackIndex = this.buildTracksOut();
    return (
      <div className="content-container">
        <h1>{header}</h1>
        <div className="all-tracks group">
          {trackIndex}
        </div>
      </div>
    );
  }
});

module.exports = TracksIndex;
