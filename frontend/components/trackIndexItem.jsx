var React = require('react');

var TrackIndexItem = React.createClass({
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
      <div className="three columns">
        <div className="album-container">
          <div className="album-cover" style={divStyle}>
          </div>
          <div>
            <h5 className="caption">{this.props.track.title}</h5>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TrackIndexItem;
