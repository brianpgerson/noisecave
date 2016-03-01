var React = require('react');
var TrackStore = require('../stores/trackStore');
var TrackActions = require('../actions/trackActions');

var TrackDetail = React.createClass({
  getInitialState: function(){
    return ({
      thisTrack: null
    });
  },
  componentWillMount: function(){
    TrackActions.getTracks();
    this.changeListener = TrackStore.addListener(this.handleTrackChanges);
  },
  componentWillUnmount: function() {
    this.changeListener.remove();
  },
  handleTrackChanges: function(){
    this.setState({
      thisTrack: TrackStore.find(this.props.params.id)
    });
  },
  render: function(){
    if (this.state.thisTrack) {
      var track = this.state.thisTrack;
      var albumStyle = {
        backgroundImage: 'url(' + track.imageUrl + ')',
        backgroundSize: '100% 100%'
      };
      var trackDetail = (
          <div className="track-detail group">
            <div className="detail-album-cover" style={albumStyle}>
            </div>
            <h3>{track.title}</h3>
          </div>
      );
    } else {
      trackDetail = <div></div>;
    }
    return (
      <div className="content-container">
        {trackDetail}
      </div>
    );
  }
});

module.exports = TrackDetail;
