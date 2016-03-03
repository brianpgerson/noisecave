var React = require('react');
var PlaylistStore = require('../stores/playlistStore');
var SessionStore = require('../stores/sessionStore');
var PlaylistActions = require('../actions/playlistActions');
var NewPlaylist = require('./newPlaylist');
var PlaylistItem = require('./playlistItem');

var Playlists = React.createClass({
  getInitialState: function() {
    return {
      playlists: []
    };
  },
  componentDidMount: function() {
    this.PlaylistListener = PlaylistStore.addListener(this._handleStoreChanges);
    PlaylistActions.requestPlaylists(SessionStore.getUserId());
  },
  componentWillUnmount: function() {
    this.PlaylistListener.remove();
  },
  _handleStoreChanges: function(){
    this.setState({playlists: PlaylistStore.returnPlaylists()});
  },
  render: function(){
    var playlists = this.state.playlists.map(function(playlist){
      return <PlaylistItem key={playlist.id} playlist={playlist} />;
    });
    return (
      <div className="playlists container">
        <ul>
          {playlists}
        </ul>
      </div>
    );
  }
});

module.exports = Playlists;
