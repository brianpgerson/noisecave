var React = require('react');

var Playlists = React.createClass({
  render: function(){
    return (
          <li>{this.props.playlist.title} <br />
          {this.props.playlist.description}
          </li>
    );
  }
});

module.exports = Playlists;
