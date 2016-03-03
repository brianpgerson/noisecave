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
    this.setState({
      errors: this.props.prebakedErrors ? this.props.prebakedErrors : []
    });
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
      <ul style={{margin: "0"}}>
        {errors}
      </ul>
    );
  }
});

module.exports = ErrorHandler;
