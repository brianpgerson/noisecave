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
    };
  },
  handleSubmits: function(e){
    e.preventDefault();
    PlaylistActions.addPlaylist({
      playlist: {
        title: this.state.title,
        description: this.state.description,
        creator_id: this.state.creatorId,
      }
    });
    this.props.switchBack();
  },
  handleCancel: function(e){
    e.preventDefault();
    this.props.switchBack();
  },
  render: function(){
    var title = "Title: ";
    var description = "Description: ";
    return (
      <div className="playlist-quadrant" style={{overflowY: "hidden"}}>
        <form id="new-playlists-form">
          <p className="group">
            <label>{title}</label>
            <input type="text" valueLink={this.linkState('title')} />
          </p>
          <p className="group">
            <label>{description}</label>
            <input type="text" valueLink={this.linkState('description')} />
          </p>
            <input type="submit"
                    value="Cancel"
                    id="upload"
                    onClick={this.handleCancel} />
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
