var React = require('react');
var ServerAuthApi = require('../util/serverAuthApi');
var ErrorHandler = require('./errorHandler');
var ErrorActions = require('../actions/ErrorActions');

var TrackUpload = React.createClass({
  getInitialState: function(){
    return({
      title: "",
      description: "",
      image_url: ""
    });
  },
  handleInputChanges: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  handleSubmits: function(e){
    e.preventDefault();
    debugger;
  },
  render: function(){
    return (
      <div>
        <form>
          <label>Track Title <br></br>
          <input type="text"
                  name="title"
                  value={this.state.username}
                  onChange={this.handleInputChanges}/>
          </label>
          <label>Description <br></br>
          <textarea
                  name="description"
                  value={this.state.username}
                  onChange={this.handleInputChanges}>
          </textarea>
          </label>
          <label>Track Image <br></br>
          <input type="file"
                  accept="image/*"
                  title=" "
                  name="imageFile"
                  className="custom-file-input"/>
          </label>
          <label>Audio File <br></br>
          <input type="file"
                  accept="audio/*"
                  title=" "
                  id="audioFile"
                  className="custom-file-input"/>
          </label>
          <input type="submit"
                  value="Upload"
                  id="upload"
                  onClick={this.handleSubmits} />
        </form>
      </div>
    );
  }
});

module.exports = TrackUpload;
