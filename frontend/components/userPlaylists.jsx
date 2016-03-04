var React = require('react');
var PlaylistStore = require('../stores/playlistStore');
var TracksIndex = require('./tracksIndex');
var SessionStore = require('../stores/sessionStore');
var PlaylistActions = require('../actions/playlistActions');
var NewPlaylist = require('./newPlaylist');
var UserInfoBox = require('./userInfoBox');
var PlaylistItem = require('./playlistItem');

var Playlists = React.createClass({
  getInitialState: function() {
    return {
      playlists: [],
      whichTab: "playlists"
    };
  },
  componentDidMount: function() {
    this.PlaylistListener = PlaylistStore.addListener(this._handleStoreChanges);
    PlaylistActions.requestPlaylists(this.props.params.id);
  },
  componentWillUnmount: function() {
    this.PlaylistListener.remove();
  },
  _handleStoreChanges: function(){
    this.setState({playlists: PlaylistStore.returnPlaylists()});
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

  return (
    <div id="tracks-and-playlists" className="container">
      <UserInfoBox currentUser={SessionStore.returnUser()}/>
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
