var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var PlaylistActions = require('../actions/playlistActions');

var NewPlaylists = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      title: "",
      description: "",
      creatorId: this.props.currentUser,
      tracks: []
    };
  },
  handleSubmits: function(e){
    e.preventDefault();
    PlaylistActions.addPlaylist({
      playlist: {
        title: this.state.title,
        description: this.state.description,
        creator_id: this.state.creatorId,
        tracks: this.state.tracks
      }
    });
  },
  render: function(){
    return (
      <div className="new-playlists-container">
        <form id="new-playlists-form">
          <p>
            <label>Title: </label>
            <input type="text" valueLink={this.linkState('title')} />
          </p>
          <p>
            <label>Description: </label>
            <input type="text" valueLink={this.linkState('description')} />
          </p>
          <input type="submit"
                  value="Save"
                  id="upload"
                  onClick={this.handleSubmits} />
        </form>
      </div>
    );
  }
});

module.exports = NewPlaylists;
