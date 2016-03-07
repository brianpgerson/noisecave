var React = require('react');
var PlaylistStore = require('../stores/playlistStore');
var TracksIndex = require('./tracksIndex');
var SessionStore = require('../stores/sessionStore');
var PlaylistActions = require('../actions/playlistActions');
var NewPlaylist = require('./newPlaylist');
var UserInfoBox = require('./userInfoBox');
var PlaylistItem = require('./playlistItem');
var PlayStore = require('../stores/playStore');

var Playlists = React.createClass({
  getInitialState: function() {
    return {
      playlists: [],
      whichTab: "playlists",
      isPlaying: (PlayStore.returnPlayingNow() !== null)
    };
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {

    this.playlistListener = PlaylistStore.addListener(this._handleStoreChanges);
    this.playStoreListener = PlayStore.addListener(this._handlePlayChanges);

    if (this.comingFromNavBar() || this.notFromNavButSameUser()) {
      PlaylistActions.requestPlaylists(this.props.params.id);
    } else {
      this.context.router.push({
        pathname: "discover"
      });
    }
  },

  componentWillUnmount: function() {
    this.playlistListener.remove();
    this.playStoreListener.remove();
  },

  _handlePlayChanges: function(){
    var playingNow = (PlayStore.returnPlayingNow() !== null);
    this.setState({
      isPlaying: playingNow
    });
  },

  _handleStoreChanges: function(){
    this.setState({playlists: PlaylistStore.returnPlaylists()});
  },

  comingFromNavBar: function(){
    return (this.props.location &&
      this.props.location.search.split("=")[1][0] === this.props.params.id);
  },

  notFromNavButSameUser: function(){
    return (SessionStore.getUserId().toString() === this.props.params.id);
  },

  switchTabs: function(e){
    e.preventDefault();
    this.setState({
      whichTab: e.target.name
    });
  },
  returnPlaylistsTab: function(){
    if (this.state.playlists.length > 0){
      var playlists = this.state.playlists.map(function(playlist){
        return <PlaylistItem key={playlist.id} playlist={playlist} />;
      });
    } else {
      playlists = <div></div>;
    }
    return playlists;
  },
  returnTracksTab: function(){
    return <TracksIndex currentUser={SessionStore.returnUser()} userOnly={true} />;
  },
  render: function(){
  var musicTab = this.state.whichTab === "playlists" ?
    this.returnPlaylistsTab() :
    this.returnTracksTab();

  var containerStyle = (this.state.isPlaying) ?
    {marginTop: '150px', height: 'calc(100% - 85px)'} :
    {marginTop: '100px', height: 'calc(100% - 50px)'};

  var userInfoStyle = (this.state.isPlaying) ?
    {height: 'calc(100%)'} :
    {height: 'calc(100% + 15px)'};

  return (
    <div id="tracks-and-playlists" className="container" style={containerStyle}>
      <UserInfoBox userInfoStyle={userInfoStyle} currentUser={SessionStore.returnUser()}/>
      <div className="tab-switcher-container">
        <button name="tracks" onClick={this.switchTabs}
          className="tab-switcher">Tracks</button>
        <button name="playlists" onClick={this.switchTabs}
          className="tab-switcher">Playlists</button>
      </div>
      <ul className="music-tab">
        {musicTab}
      </ul>
      </div>
    );
  }
});

module.exports = Playlists;
