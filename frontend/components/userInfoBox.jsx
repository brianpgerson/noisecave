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
      return track.creatorId === this.props.currentUser.id;
    }.bind(this));
    this.setState({
      tracks: myTracks.length
    });
  },
  render: function(){
    if (this.props.currentUser.image){
      var image = this.props.currentUser.image;
    } else {
      image = "http://res.cloudinary.com/thadowg/image/upload/v1456774819/default_album_300_g4_ufur3z.png";
    }

    if (this.props.currentUser.created_at){
      var date = new Date(this.props.currentUser.created_at)
        .toString().split(" ").slice(0,4);
      var formattedDate =
        date[0] + ", " + date[1] + " " + date[2] + ", " + date[3];
    } else {
      formattedDate = "Friday, May 02, 2015";
    }

    return (
      <div style={this.props.userInfoStyle} className="user-info-container">
        <h5 className="user-info-name">
          {this.props.currentUser.username}
        </h5>
        <div className="user-pic-container">
          <div className="big-user-pic"
            style={{backgroundImage: 'url('+ image + ')'}}></div>
        </div>
        <div className="user-info-box">
          <p><span className="box-header">about me: </span>
            <br />{this.props.currentUser.description}</p>
          <p><span className="box-header">member since: </span>
            <br />{formattedDate}</p>
          <p><span className="box-header">tracks uploaded: </span>
            <br />{this.state.tracks}</p>
        </div>
      </div>
    );
  }
});

module.exports = UserInfoBox;
