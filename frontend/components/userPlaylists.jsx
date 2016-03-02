var React = require('react');
var PlaylistStore = require('../stores/playlistStore');
var SessionStore = require('../stores/sessionStore');
var PlaylistActions = require('../actions/playlistActions');
var NewPlaylist = require('./newPlaylist');
var Playlist = require('./playlist');

var Playlists = React.createClass({
  getInitialState: function() {
    return {
      playlists: []
    };
  },
  componentWillMount: function() {
    debugger;
    this.PlaylistListener = PlaylistStore.addListener(this._handleStoreChanges);
    PlaylistActions.requestPlaylists(this.props.params.id);
  },
  componentWillUnmount: function() {
    this.PlaylistListener.remove();
  },
  _handleStoreChanges: function(){
    debugger;
    this.setState({playlists: PlaylistStore.returnPlaylists()});
  },
  render: function(){
    debugger;
    var playlists = this.state.playlists.map(function(playlist){
      return <Playlist key={playlist.id} playlist={playlist} />;
    });
    return (
      <div className="playlists container">
        <NewPlaylist currentUser={this.props.params.id} />
        <ul>
          {playlists}
        </ul>
      </div>
    );
  }
});

module.exports = Playlists;
