var React = require('react');

var Video = React.createClass({
  getInitialState: function() {
    return {
      whichVid: 0,
      source: ""
    };
  },

  changeVideo: function(){
    var videos = [
      "http://res.cloudinary.com/thadowg/video/upload/v1457296142/defocus-concert.mp4",
      "http://res.cloudinary.com/thadowg/video/upload/v1457298202/dj-hands.mp4",
      "http://res.cloudinary.com/thadowg/video/upload/q_82/v1457300384/guitargirl.mp4"
    ];
    if (this.state.whichVid === videos.length - 1) {
      this.setState({
        whichVid: 0,
        source: videos[0]
      });
    } else {
      this.setState({
        whichVid: this.state.whichVid + 1,
        source: videos[this.state.whichVid + 1]
      });
    }
  },
  render: function(){
    return (
      <video autoPlay
              preload="true"
              loop
              id="video-wrapper"
              onEnd={this.changeVideo}>
        <source src="http://res.cloudinary.com/thadowg/video/upload/v1457296142/defocus-concert.mp4" />
      </video>
    );
  }
});

module.exports = Video;
