var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var SessionStore = require('./stores/sessionStore');
var ServerTrackApi = require('./util/serverTrackApi');
var App = require('./components/app');
var TracksIndex = require('./components/tracksIndex');
var TrackUpload = require('./components/trackUpload');

var routes = (
  <Route component={App} path="/">
    <Route component={TracksIndex} path="discover">
    </Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('#root');
  ReactDOM.render(
    <Router history={hashHistory}>
      {routes}
    </Router>,
    root
  );
});
