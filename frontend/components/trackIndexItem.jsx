var React = require('react');
var PlayActions = require('../actions/playActions');
var PlayStore = require('../stores/playStore');
var ModalActions = require('../actions/modalActions');

var SessionStore = require('../stores/sessionStore');

window.PlayStore = PlayStore;

var TrackIndexItem = React.createClass({
  playCallback: function(track){
    PlayActions.addToPlayStore(track);
  },
  addToQueue: function(track) {
    PlayActions.addToPlayStoreQueue(track);
  },
  addToPlaylist: function(track) {
    if (SessionStore.isLoggedIn()) {
      ModalActions.openModal("playlist", track);
    } else {
      ModalActions.openModalError("login",
        ["Sorry, you have to be logged in for that feature to work!"]);
    }
  },
  render: function(){
    if (this.props.track.imageUrl) {
      var source = this.props.track.imageUrl;
    } else {
      source =
      "https://s3-us-west-1.amazonaws.com/briansdopealbumcovers/Screen+Shot+2016-02-24+at+2.27.54+PM.png";
    }
    var divStyle = {
      backgroundImage: 'url(' + source + ')'
    };
    return (
      <div className="track-index-item">
        <div className="album-container">
          <div className="album-cover"
                style={divStyle}>
            <div className="index-item-controls">
              <button className="track-buttons"
                onClick={function(){
                  this.playCallback(this.props.track);}.bind(this)}>
                  ▶ Play
              </button>
              <button className="track-buttons play-button" onClick={function(){
                        this.addToQueue(this.props.track);
                      }.bind(this)}>
                + Queue
              </button>
              <button className="track-buttons" onClick={function(){
                        this.addToPlaylist(this.props.track);
                      }.bind(this)}>
                + Playlist
              </button>
            </div>
          </div>
          <div>
            <p className="caption"
              onClick={function(){
                this.props.trackDetailClick(this.props.track.id);
                      }.bind(this)}>
              {this.props.track.title} <br />
              Plays: {this.props.track.plays}
            </p>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = TrackIndexItem;
