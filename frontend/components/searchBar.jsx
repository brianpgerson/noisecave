var React = require('react');
var TrackStore = require('../stores/trackStore');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var SearchBar = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      currentSearch: ""
    };
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  handleSubmit: function(e){
    if (e.charCode === 13) {
      e.preventDefault();
      this.context.router.push({
        pathname: '/search',
        query: {searchTerms: e.target.value}
      });
    }
  },
  render: function(){
    return (
      <div>
        <input type="text"
          valueLink={this.linkState('currentSearch')}
          id="search-box"
          onKeyPress={this.handleSubmit}
          placeholder="Search songs, playlists, users..."/>
      </div>
    );
  }

});

module.exports = SearchBar;
