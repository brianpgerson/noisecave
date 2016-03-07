var React = require('react');
var TrackStore = require('../stores/trackStore');
var TrackActions = require('../actions/trackActions');
var AuthActions = require('../actions/authActions');
var SessionStore = require('../stores/sessionStore');

var TrackDetail = React.createClass({
  getInitialState: function(){
    return ({
      thisTrack: null,
      trackOwner: null
    });
  },
  componentWillMount: function(){
    TrackActions.getTracks();
    this.trackChangeListener = TrackStore.addListener(this.handleTrackChanges);
    this.userChangeListener = SessionStore.addListener(this.handleUserChanges);
  },
  componentWillUnmount: function() {
    this.trackChangeListener.remove();
    this.userChangeListener.remove();
  },
  handleTrackChanges: function(){
    var thisTrack = TrackStore.find(this.props.params.id);
    AuthActions.getUserInfo(thisTrack.creatorId);
    this.setState({
      thisTrack: thisTrack
    });
  },
  handleUserChanges: function(){
    var trackOwner = SessionStore.returnTrackOwner();
    this.setState({
      trackOwner: trackOwner
    });
  },
  returnTrackDetails: function(){
    if (this.state.thisTrack) {
      var track = this.state.thisTrack;
      var albumStyle = {
        backgroundImage: 'url(' + track.imageUrl + ')',
        backgroundSize: '100% 100%'
      };
      var date = new Date(track.createdAt).toString().split(" ").slice(0,4);
      var formattedDate =
        date[0] + ", " + date[1] + " " + date[2] + ", " + date[3];
      var trackDetailTopper = (
          <div className="track-detail-topper">
            <div className="detail-album-cover" style={albumStyle}></div>
            <h3>{track.title}</h3>
            <p>
            <span style={{fontWeight: "bold"}}>Uploaded:</span> {formattedDate} <br />
            <span style={{fontWeight: "bold"}}>Plays:</span> {track.plays}
            </p>
            <button id="big-play-button"> ▶ </button>
          </div>

      );
    } else {
      trackDetailTopper = <div></div>;
    }
    return trackDetailTopper;
  },
  returnUserStuff: function(){
    if (this.state.trackOwner) {
      var owner = this.state.trackOwner;
      var track = this.state.thisTrack;
      var ownerImage = {
        backgroundImage: 'url(' + owner.image + ')',
        backgroundSize: 'contain'
      };
      var userStuff = (
        <div className="track-owner-container">
          <h5>{owner.username}</h5>
          <div style={ownerImage}
                className="track-owner-image"></div>
              <article className="track-description">
                {
                  track ?
                  track.description :
                  ""
                }
              </article>
        </div>
      );
    } else {
      userStuff = <div></div>;
    }
    return userStuff;
  },
  render: function(){
    var trackDetailTopper = this.returnTrackDetails();
    var userInfo = this.returnUserStuff();
    return (
      <div className="detail-container">
        {trackDetailTopper}
        {userInfo}
      </div>
    );
  }
});

module.exports = TrackDetail;
