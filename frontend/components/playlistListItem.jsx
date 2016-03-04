var React = require('react');

var PlaylistListItem = React.createClass({
  getInitialState: function() {
    return {
      special: false
    };
  },
  handleClick: function(){
    this.props.addToPlaylist(this.props.id);
    this.setState({
      special: true
    });
  },
  render: function(){
    if (this.state.special){
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

module.exports = PlaylistListItem;
