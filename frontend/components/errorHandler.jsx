var React = require('react');
var ErrorStore = require('../stores/errorStore');

var ErrorHandler = React.createClass({
  getInitialState: function(){
    return ({
      errors: []
    });
  },
  componentDidMount: function(){
    this.errorListener = ErrorStore.addListener(this._onChange);
  },
  _onChange: function(){
    var messages = ErrorStore.all();
    this.setState({errors: messages});
  },
  componentWillUnmount: function(){
    this.errorListener.remove();
  },
  render: function(){
    var errors = this.state.errors.map(function(err, idx){
      return (<li className="error" key={idx}>{err}</li>);
    });
    return (
      <ul>
        {errors}
      </ul>
    );
  }
});

module.exports = ErrorHandler;
