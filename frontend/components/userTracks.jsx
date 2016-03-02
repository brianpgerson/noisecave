var React = require('react');
var TracksIndex = require('./tracksIndex');
var SessionStore = require('../stores/sessionStore');

var UserTracks = React.createClass({
  getInitialState: function() {
    return ({
      currentUser: null
    });
  },
  componentDidMount: function() {
    this.setState({
      currentUser: SessionStore.returnUser()
    });
  },
  render: function(){
    return (
      <div>
        <TracksIndex currentUser={this.state.currentUser} userOnly={true} />
      </div>
    );
  }
});

module.exports = UserTracks;
