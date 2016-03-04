var React = require('react');
var PlaylistStore = require('../stores/playlistStore');
var PlayActions = require('../actions/playActions');
var PlaylistingStore = require('../stores/playlistingStore');
var PlaylistingActions = require('../actions/playlistingActions');

var PlaylistItem = React.createClass({
  getInitialState: function() {
    return {
      playlistings: []
    };
  },
  componentWillMount: function() {
    this.playlistingListener =
      PlaylistingStore.addListener(this._handleStoreChanges);
    PlaylistingActions.fetchPlaylistings(this.props.playlist.id);
  },
  _handleStoreChanges: function(){
    var newListings =
      PlaylistingStore.returnPlaylistings(this.props.playlist.id);
    if (newListings){
      var formattedListings = newListings.map(function(item, index){
        var newItem = {
          audioUrl: item.audio_url,
          imageUrl: item.image_url,
          title: item.title,
          description: item.description,
          creatorId: item.creator_id,
          created_at: item.created_at,
          updated_at: item.updated_at,
          id: item.id,
          slug: item.slug
        };
        return newItem;
      });
      this.setState({
        playlistings: formattedListings.sort(function(a, b){return a.updated_at < b.updated_at; })
      });
    }
  },
  componentWillUnmount: function() {
    this.playlistingListener.remove();
  },
  returnFormattedPlaylistings: function(){
    var playlistings;
    if (this.state.playlistings.length > 0) {
      playlistings = this.state.playlistings.map(function(item, index){
        return <li className="playlist-track"
                    onClick={function(){
                      this.handlePlaylistPlay(index);
                    }.bind(this)}
                    order={index}
                    key={index}>
                {item.title}
              </li>;
      }.bind(this));
    } else {
      playlistings = <div></div>;
    }
    return playlistings;
  },
  handlePlaylistPlay: function(index){
    var playQueue = this.state.playlistings.slice(index);
    var playNow = playQueue.shift();
    PlayActions.addToPlayStore(playNow);
    PlayActions.addToQueueInBulk(playQueue);
  },
  returnImages: function(){
    // get all images from playlist tracks
    if (this.state.playlistings.length > 0) {
      var images = [];
      this.state.playlistings.forEach(function(track){
        if (images.indexOf(track.imageUrl) === -1) {
          images.push(track.imageUrl);
        }
      });
    } else {
      images = [];
    }
    return images;
  },
  returnPhotoStyles: function(){
    var photoStyle;
    var images = this.returnImages();
    var randomPic = images[Math.floor(Math.random() * images.length)];

    if (images.length === 0) {
      photoStyle = {
        height: '100%',
        width: '100%',
        backgroundImage: 'url(http://res.cloudinary.com/thadowg/image/upload/v1456774819/default_album_300_g4_ufur3z.png)'
      };
    } else {
      photoStyle = {
        height: '100%',
        width: '100%',
        backgroundImage: 'url(' + randomPic + ')',
        backgroundSize: 'contain'
      };
    }
    return photoStyle;
  },
  render: function(){
    var playlistings = this.returnFormattedPlaylistings();
    var photoStyle = this.returnPhotoStyles();

    var date = new Date(this.props.playlist.created_at)
      .toString().split(" ").slice(0,4);
    var formattedDate =
      date[0] + ", " + date[1] + " " + date[2] + ", " + date[3];

    return (
        <div className="user-playlist group">
          <div className="playlist-info">
            <h5 className="user-playlist-title">{this.props.playlist.title}</h5>
            <div className="large-playlist-photo">
              <div style={photoStyle}></div>
            </div>
            <p>
              <span className="box-header">Tracks:</span><br />
                {this.state.playlistings.length}<br />
              <span className="box-header">Created: </span><br />
                {formattedDate}
            </p>
          </div>
          <ul className="user-playlist-tracks">
            {playlistings}
          </ul>
        </div>
    );
  }
});

module.exports = PlaylistItem;
