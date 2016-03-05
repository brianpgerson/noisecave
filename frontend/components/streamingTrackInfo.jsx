var React = require('react');

var StreamingTrackInfo = React.createClass({
  returnQueueDown: function(){
    var queue;
    var songs = this.props.playlist.map(function(track, index){
      return <li key={index}
                  className="queue-items"
                  onClick={function(){
                    this.props.handleQueueClick(track, index);
                  }.bind(this)}>
                <span id="little-number">
                  {index + 1}:
                </span>
                {track.title}
              </li>;
      }.bind(this));
      if (this.props.queueDown) {
        queue = (
          <ul id="play-queue">
            {songs}
          </ul>
        );
      } else {
        queue = <div className="hidden"></div>;
        }
    return queue;
  },
  render: function(){
    var queue = this.returnQueueDown();
    var queueStyle = this.props.queueFull ? {visibility: "visible"} :
      {visibility: "hidden"};
    if (this.props.track !== null) {
      var track = this.props.track;
      var arrow = this.props.queueDown ? "▲" : "▼";
      var backgroundImage = {
                            backgroundImage: 'url(' + track.imageUrl + ')',
                            backgroundSize: 'contain'
                          };
      var info = (
        <div className="info-container">
          <div className="imageThumb"
                style={backgroundImage}>
          </div>
          <span className="title-track">{track.title}<div onClick={
              this.props.queueDownCallBack
            } id="littlearrow">{arrow}</div></span>
          <div id="play-queue-wrapper" style={queueStyle}>{queue}</div>
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
