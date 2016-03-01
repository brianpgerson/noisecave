var React = require('react');

var Equalizer = React.createClass({
  createBars: function(){
    var bars = [];
    for (var i = 0; i < 150; i++) {
      bars.push(i);
    }
    return bars;
  },
  render: function(){
    var percentBasedWidth = ((this.props.width / 100) * 300);
    var eqStyle = {
      width: percentBasedWidth + 'px',
      opacity: '1'
    };
    var offStyle = {
      width: percentBasedWidth + 'px',
      opacity: '0'
    };
    var coolBars = this.createBars().map(function(num, index){
      return (<div key={index} className='bar'></div>);
    });

    return (
      <div id="bars" style={this.props.isPlaying ? eqStyle : offStyle}>
        {coolBars}
      </div>
    );
  }
});

module.exports = Equalizer;
