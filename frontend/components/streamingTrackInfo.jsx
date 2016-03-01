var React = require('react');

var StreamingTrackInfo = React.createClass({
  render: function(){
    if (this.props.track !== null) {
      var track = this.props.track;
      var backgroundImage = {
                            backgroundImage: 'url(' + track.imageUrl + ')',
                            backgroundSize: 'contain'
                          };
      var info = (
        <div className="info-container">
          <div className="imageThumb"
                style={backgroundImage}>
          </div>
          <p>
            {track.title}
          </p>
        </div>
      );
    } else {
      info = <div></div>;
    }
    return (
      <div>
        {info}
      </div>
    );
  }
});

module.exports = StreamingTrackInfo;
