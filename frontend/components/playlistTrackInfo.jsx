var React = require('react');

var PlaylistTrackInfo = React.createClass({
  render: function(){
    var imageStyle = {
      backgroundImage: 'url('+ this.props.track.imageUrl + ')',
      backgroundSize: 'contain'
    };
    return (
      <div className="playlist-quadrant">
        <div style={imageStyle} className="playlist-track-picture"></div>
        <h6>{this.props.track.title}</h6>
        <p>{this.props.track.description}</p>
      </div>
    );
  }
});

module.exports = PlaylistTrackInfo;
