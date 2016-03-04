var React = require('react');
var PlaylistStore = require('../stores/playlistStore');
var PlaylistingStore = require('../stores/playlistingStore');
var SessionStore = require('../stores/sessionStore');
var PlaylistActions = require('../actions/playlistActions');
var PlaylistingActions = require('../actions/playlistingActions');
var NewPlaylist = require('./newPlaylist');
var PlaylistTrackInfo = require('./playlistTrackInfo');
var PlaylistListItem = require('./playlistListItem');

var PlaylistModal = React.createClass({
  getInitialState: function() {
    return {
      playlists: [],
      addingPlaylist: false,
      hasNewPlaylisting: []
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
    this.setState({playlists: PlaylistStore.returnPlaylists().reverse()});
  },
  createNewPlaylistForm: function(){
    if (!this.state.addingPlaylist) {
      this.setState({addingPlaylist: true});
    }
  },
  switchQuadrants: function(){
    this.setState({addingPlaylist: false});
  },
  addToPlaylist: function(id){
    PlaylistingActions.addTrackToPlaylist(id, this.props.track);
  },
  render: function(){

    var playlists = this.state.playlists.map(function(playlist){
      return <PlaylistListItem key={playlist.id}
                            id={playlist.id}
                            addToPlaylist={this.addToPlaylist}
                            playlist={playlist} />;
                        }.bind(this));

    var imageStyle = {
      backgroundImage: 'url('+ this.props.track.imageUrl + ')',
      backgroundSize: 'contain'
    };

    if (this.state.addingPlaylist) {
      var quadrant = <NewPlaylist

                        switchBack={this.switchQuadrants}
                        currentUser={SessionStore.getUserId()}/>;
      var header = "Create a Playlist";
    } else {
      quadrant = <PlaylistTrackInfo track={this.props.track}/>;
      header = "Add to Playlist";
    }

    debugger;
    
    return (
      <div className="playlist-modal-container">
        <div className="playlists-container">
          <ul>
            <div onClick={this.createNewPlaylistForm} className="playlist-item blue"><li>Create a New Playlist</li></div>
            {playlists}
          </ul>
        </div>
        <h5>{header}</h5>
        {quadrant}
      </div>
    );
  }
});

module.exports = PlaylistModal;
