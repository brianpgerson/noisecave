var React = require('react');
var TrackStore = require('../stores/trackStore');
var TrackActions = require('../actions/trackActions');
var AuthActions = require('../actions/authActions');
var PlayActions = require('../actions/playActions');
var ModalActions = require('../actions/modalActions');
var SessionStore = require('../stores/sessionStore');

var TrackDetail = React.createClass({
  getInitialState: function(){
    return ({
      thisTrack: null,
      trackOwner: null
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
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
            <button className="big-buttons"
                    id="big-play-button"
                    onClick={this.handlePlayClick}>
                     ▶
            </button>
            <button className="big-buttons"
                    id="big-plus-button"
                    onClick={this.handlePlaylistClick}>
                     +
            </button>
          </div>

      );
    } else {
      trackDetailTopper = <div></div>;
    }
    return trackDetailTopper;
  },
  handlePlayClick: function(e){
    e.preventDefault();
    PlayActions.addToPlayStore(this.state.thisTrack);
  },
  handlePlaylistClick: function(e){
    e.preventDefault();
    if (SessionStore.isLoggedIn()) {
      ModalActions.openModal("playlist", this.state.thisTrack);
    } else {
      ModalActions.openModalError("login",
        ["Sorry, you have to be logged in for that feature to work!"]);
    }
  },
  handleUserVisit: function(e){
    e.preventDefault();
    this.context.router.push({
      pathname: '/user/' + this.state.trackOwner.id + '/music',
      query: {currentUserId: this.state.trackOwner.id}
    });
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
        <div className="track-owner-container group">
          <div style={ownerImage} className="track-owner-image">
          </div>
          <h5 onClick={this.handleUserVisit}>{owner.username}</h5>
          <article className="track-description">
            Track Description: <br />
            { track ? track.description : "" }
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
