var React = require('react');
var TrackStore = require('../stores/trackStore');
var TrackIndexItem = require('./trackIndexItem');
var TrackListIndexItem = require('./trackListIndexItem');
var TrackActions = require('../actions/trackActions');
var SessionStore = require('../stores/sessionStore');
var Footer = require('./footer');



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
    if (nextProps.location && nextProps.location.search.length > 0) {
      this._handleSearch(nextProps);
    } else {
      this.setState({
        tracks: TrackStore.all(),
        searched: false
      });
    }
  },
  _handleSearch: function(props){
    var searchterms = props.location.search.split("=")[1].toLowerCase().split(("+"));
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
  },
  _onChange: function(){
    if (this.props.location && this.props.location.search.length > 0) {
      this._handleSearch(this.props);
    } else {
      this.setState({
        tracks: TrackStore.all(),
        searched: false
      });
    }
  },
  routeToDetail: function(id){
    this.context.router.push('track/' + id );
  },
  buildTracksOut: function(){
    var tracks;
    if (this.state.tracks.length > 0) {
      if (this.props.userOnly) {
        tracks = this.state.tracks.filter(function(track) {
          return track.creatorId === this.props.currentUser.id;
        }.bind(this)).map(function(track, idx){
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
    var userStyle = this.props.userOnly ?
      {marginTop: '0'} :
      {
        marginTop: '100px',
        display: 'flex',
        margin: '0 auto',
        marginBottom: '0',
        flexFlow: 'wrap',
        justifyContent: 'center'
      };
    var backgroundStyle;
    if (this.props.userOnly) {
      backgroundStyle = {backgroundColor: 'transparent'};
    }  else if (this.state.searched) {
      backgroundStyle = {minHeight: '58%'};
    } else {
      backgroundStyle = {};
    }
    var header = this.state.searched ? <h4>Search Result for {this.props.location.search.split("=")[1].split("+").join(" ")}: </h4> : <div></div>;
    var hero = this.props.userOnly ? <div></div> :
      <div id="discover-hero"><h1>browse the top tracks on noisecave</h1>
      <hr />
        <p>You can always find the top played tracks within the past two weeks on the Discover page. Explore and discover the music our community is into right now.</p>
      </div>;
    var trackWrapperClassname = this.props.userOnly ? "all-tracks group" :
      "all-tracks";
    var trackIndex = this.buildTracksOut();
    return (
      <div className="track-index-wrapper">
        {hero}
        <div style={backgroundStyle} className="content-container">
          {header}
          <div className={trackWrapperClassname} style={userStyle}>
            {trackIndex}
          </div>
      </div>
      <Footer />
  </div>
    );
  }
});

module.exports = TracksIndex;
