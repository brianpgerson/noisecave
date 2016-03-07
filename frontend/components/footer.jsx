var React = require('react');

var Footer = React.createClass({
  render: function(){
      return (
        <footer>
        <ul>
          <li>about</li>
          <li><a href="mailto:brianpgerson@gmail.com">contact</a></li>
          <li><a href="http://www.github.com/brianpgerson" target="_blank">github</a></li>
          <li><a href="http://www.linkedin.com/in/brianpgerson" target="_blank">linked in</a></li>
        </ul>
      </footer>
    );
  }
});

module.exports = Footer;
