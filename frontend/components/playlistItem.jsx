var React = require('react');

var PlaylistItem = React.createClass({
  handleClick: function(){
    this.props.addToPlaylist(this.props.id);
  },
  render: function(){
    if (this.props.special){
      var specialStyle = {backgroundColor: "#0FC879"};
      var addedText = " - added!";
    } else {
      specialStyle = {};
      addedText = "";
    }
    return (
        <div className="playlist-item" style={specialStyle} onClick={this.handleClick}>
          <li>{this.props.playlist.title}<span style={
              {fontSize: "12px", fontStyle: "italic"}
            }>{addedText}</span></li>
        </div>
    );
  }
});

module.exports = PlaylistItem;
