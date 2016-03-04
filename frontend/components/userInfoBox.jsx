var React = require('react');
var TrackActions = require('../actions/trackActions');
var TrackStore = require('../stores/trackStore');

var UserInfoBox = React.createClass({
  getInitialState: function() {
    return {
      tracks: 0
    };
  },
  componentWillMount: function() {
    this.trackNumberListener = TrackStore.addListener(this._getTrackNumber);
    TrackActions.getTracks();
  },
  componentWillUnmount: function() {
    this.trackNumberListener.remove();
  },
  _getTrackNumber: function() {
    var myTracks = TrackStore.all().filter(function(track) {
      return track.creatorId === this.props.currentUser.userId;
    }.bind(this));
    this.setState({
      tracks: myTracks.length
    });
  },
  render: function(){
    if (this.props.currentUser.userImage){
      var image = this.props.currentUser.userImage;
    } else {
      image = "http://res.cloudinary.com/thadowg/image/upload/v1456774819/default_album_300_g4_ufur3z.png";
    }

    if (this.props.currentUser.createdAt){
      var date = new Date(this.props.currentUser.createdAt)
        .toString().split(" ").slice(0,4);
      var formattedDate =
        date[0] + ", " + date[1] + " " + date[2] + ", " + date[3];
    } else {
      formattedDate = "Friday, May 02, 2015";
    }

    return (
      <div className="user-info-container">
        <div className="user-pic-container">
          <div className="big-user-pic"
            style={{backgroundImage: 'url('+ image + ')'}}></div>
        </div>
        <div className="user-info-box">
          <p>
            <span className="box-header">
            {this.props.currentUser.username}
            </span>
          </p>
          <p><span className="box-header">About Me: </span>
            <br />{this.props.currentUser.userDescription}</p>
          <p><span className="box-header">Member Since: </span>
            <br />{formattedDate}</p>
          <p><span className="box-header">Tracks Uploaded: </span>
            <br />{this.state.tracks}</p>
        </div>
      </div>
    );
  }
});

module.exports = UserInfoBox;
