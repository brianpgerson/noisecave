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
    var albumBackground = {
      backgroundImage: 'url(' + source + ')'
    };

    return (
      <div className="track-list-index-item">
        <div className="list-item-container group">
          <div className="album-pic"
                style={albumBackground}>
            <div id="play"
                  className="list-buttons"
                  onClick={function(){
                    this.playCallback(this.props.track);}.bind(this)}>
            </div>
          </div>
          <div>
            <p className="title"
              onClick={function(){
                this.props.trackDetailClick(this.props.track.id);
                      }.bind(this)}>
              {this.props.track.title}
            </p>
            <div id="queue"
                  className="list-buttons"
                  onClick={function(){
                        this.addToQueue(this.props.track);
                      }.bind(this)}>
            </div>
            <div id="playlist"
                  className="list-buttons"
                  onClick={function(){
                      this.addToPlaylist(this.props.track);
                    }.bind(this)}>
            </div>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = TrackIndexItem;
