var React = require('react');
var PlaylistStore = require('../stores/playlistStore');
var TracksIndex = require('./tracksIndex');
var SessionStore = require('../stores/sessionStore');
var AuthActions = require ('../actions/authActions');
var PlaylistActions = require('../actions/playlistActions');
var NewPlaylist = require('./newPlaylist');
var UserInfoBox = require('./userInfoBox');
var PlaylistItem = require('./playlistItem');
var PlayStore = require('../stores/playStore');

var Playlists = React.createClass({
  getInitialState: function() {
    return {
      playlists: [],
      playlistUser: null,
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
    this.userListener = SessionStore.addListener(this._handleUserChanges);

    if (this.comingFromNavBar() || this.notFromNavButSameUser()) {
      PlaylistActions.requestPlaylists(this.props.params.id);
      AuthActions.getUserInfo(this.props.params.id);
    } else {
      this.context.router.push({
        pathname: "discover"
      });
    }
  },

  componentWillUnmount: function() {
    this.playlistListener.remove();
    this.playStoreListener.remove();
    this.userListener.remove();
  },

  _handlePlayChanges: function(){
    var playingNow = (PlayStore.returnPlayingNow() !== null);
    this.setState({
      isPlaying: playingNow
    });
  },

  _handleUserChanges: function(){
    var userToDisplay = SessionStore.returnTrackOwner();
    if (userToDisplay) {
      this.setState({
        playlistUser: userToDisplay
      });
    }
  },

  _handleStoreChanges: function(){
    this.setState({playlists: PlaylistStore.returnPlaylists()});
  },

  comingFromNavBar: function(){
    return (this.props.location &&
      this.props.location.search.split("=")[1].match(/\d+/)[0] === this.props.params.id);
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
      playlists = <div>This user has no playlists yet!</div>;
    }
    return playlists;
  },
  returnTracksTab: function(){
    if (this.state.playlistUser) {
      return <TracksIndex currentUser={this.state.playlistUser} userOnly={true} />;
    } else {
      return <div></div>;
    }
  },

  returnUserInfoBox: function(){
    if (this.state.playlistUser){
      var userInfoStyle = (this.state.isPlaying) ?
        {height: 'calc(100%)'} :
        {height: 'calc(100% + 15px)'};

      var userInfoBox = <UserInfoBox userInfoStyle={userInfoStyle}
        currentUser={this.state.playlistUser}/>;
    } else {
      userInfoBox = <div></div>;
    }
    return userInfoBox;
  },
  render: function(){
  var musicTab = this.state.whichTab === "playlists" ?
    this.returnPlaylistsTab() :
    this.returnTracksTab();

  var containerStyle = (this.state.isPlaying) ?
    {marginTop: '150px', height: 'calc(100% - 85px)'} :
    {marginTop: '100px', height: 'calc(100% - 50px)'};

  var userInfoBox = this.returnUserInfoBox();

  return (
    <div id="tracks-and-playlists" className="container" style={containerStyle}>
      {userInfoBox}
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
