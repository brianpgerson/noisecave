var React = require('react');
var TrackStore = require('../stores/trackStore');
var TrackIndexItem = require('./trackIndexItem');
var TrackListIndexItem = require('./trackListIndexItem');
var TrackActions = require('../actions/trackActions');
var SessionStore = require('../stores/sessionStore');
var Footer = require('../components/footer');
var ModalActions = require('../actions/modalActions');

var SplashPage = React.createClass({
  getInitialState: function(){
    return ({
      tracks: [],
      loggedIn: null
    });
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount: function(){
    this.changeListener = TrackStore.addListener(this._onChange);
    this.logListener = SessionStore.addListener(this._onLogin);
  },
  componentDidMount: function(){
    TrackActions.getTracks();
  },
  componentWillUnmount: function() {
    this.changeListener.remove();
  },
  _onChange: function(){
    this.setState({
      tracks: TrackStore.all()
    });
  },
  _onLogin: function(){
    this.setState({
      loggedIn: SessionStore.isLoggedIn()
    });
  },
  routeToDetail: function(id){
    this.context.router.push('track/' + id );
  },
  buildTracksOut: function(){
    var tracks;
    if (this.state.tracks.length > 0) {
      tracks = this.state.tracks
      .sort(function(a, b){return b.plays - a.plays;})
      .slice(0, 8)
      .map(function(track, idx){
        return (
          <TrackIndexItem
            key={idx}
            trackDetailClick={this.routeToDetail}
            track={track}/>
        );
      }.bind(this));
    } else {
      tracks = "";
    }
    return tracks;
  },
  handleSignUp: function(){
    ModalActions.openModal("signup");
  },
  render: function(){
    var loggedInButton = this.state.loggedIn ? "hidden" : "shown";
    var userStyle = {
        marginTop: '100px',
        display: 'flex',
        margin: '0 auto',
        marginBottom: '0',
        flexFlow: 'wrap',
        justifyContent: 'center'
      };
    var backgroundStyle = {paddingBottom: "65px"};
    var trackWrapperClassname =
      "all-tracks";
    var trackIndex = this.buildTracksOut();
    var videos = [
      "http://res.cloudinary.com/thadowg/video/upload/e_fade:1000/e_fade:-1000/c_scale,w_1200/v1457296142/defocus-concert.mp4",
      "http://res.cloudinary.com/thadowg/video/upload/e_fade:1000/e_fade:-1000/c_scale,w_1200/v1457298202/dj-hands.mp4",
      "http://res.cloudinary.com/thadowg/video/upload/e_fade:1000/e_fade:-1000/q_82/v1457300384/guitargirl.mp4"
    ];
    return (
      <div className="track-index-wrapper" style={{marginTop: "-30px"}}>
        <button className={loggedInButton} onClick={this.handleSignUp} id="splash-sign">Sign Up</button>
        <div id="header-hero">
          <video autoPlay loop id="video-wrapper">
            <source src={videos[Math.floor(Math.random() * 3)]} />
          </video>
        </div>
        <div style={backgroundStyle} className="content-container">
          <h1 className="splash-header">discover what's trending</h1>
          <h4>Check out the top tracks on <span style={{fontWeight: "bold"}}>noisecave</span>,<br />
              add your favorites to playlists,<br />
              and listen as you browse
          </h4>
          <div className="all-tracks" style={userStyle}>
            {trackIndex}
          </div>
      </div>
      <section className="copy-section">
        <h4>Community</h4>
        <p>
          <span style={{fontWeight: "bold"}}>noisecave</span> is where creative artists and dedicated fans come together to create a thriving community centered around music.
        </p>
        <hr />
        <h4>Simplicity</h4>
        <p>
          We'll always offer free music hosting, fast and high-quality playback, creative vibes, and a collaborative attitude.
        </p>
        <hr />
        <h4>Discovery</h4>
        <p>
          Sign up or sign in to start building your profile: upload your music and get discovered by new fans, build out your own playlists, and find your new favorite sounds.
        </p>
      </section>
      <Footer />
  </div>
    );
  }
});

module.exports = SplashPage;
