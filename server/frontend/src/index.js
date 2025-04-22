'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./App');
var BrowserRouter = require('react-router-dom').BrowserRouter;

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(BrowserRouter, null,
    React.createElement(App, null)
  )
);
