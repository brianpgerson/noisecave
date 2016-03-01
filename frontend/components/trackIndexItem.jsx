var React = require('react');
var PlayActions = require('../actions/playActions');
var PlayStore = require('../stores/playStore');
window.PlayStore = PlayStore;

var TrackIndexItem = React.createClass({
  playCallback: function(trackUrl){
    PlayActions.addToPlayStore(trackUrl);
  },
  addToQueue: function(trackUrl){
    PlayActions.addToPlayStoreQueue(trackUrl);
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
              <div className="play-button-icon"
                onClick={function(){
                  this.playCallback(this.props.track);}.bind(this)}>
              </div>
              <button onClick={function(){
                        this.addToQueue(this.props.track);
                      }.bind(this)} className="add-to-queue">
                Add To Queue
              </button>
            </div>
          </div>
          <div>
            <p className="caption"
              onClick={function(){
                this.props.trackDetailClick(this.props.track.id);
                      }.bind(this)}>
              {this.props.track.title}
            </p>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = TrackIndexItem;
