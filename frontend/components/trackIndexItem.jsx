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
    if (this.props.track.image_url) {
      var source = this.props.track.image_url;
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
          <div className="album-cover" style={divStyle}>
          </div>
          <div>
            <p className="caption"
              onClick={function(){
                        this.playCallback(this.props.track.audio_url);
                      }.bind(this)}>
              {this.props.track.title}
            </p>

            <span onClick={function(){
                      this.addToQueue(this.props.track.audio_url);
                    }.bind(this)}>Add to Q</span>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = TrackIndexItem;
