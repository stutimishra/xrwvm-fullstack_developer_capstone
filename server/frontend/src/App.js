'use strict';

var React = require('react');
var { Routes, Route } = require('react-router-dom');
var LoginPanel = require('./components/Login/Login');
var Register = require('./components/Register/Register');
var Dealers = require('./components/Dealers/Dealers');
var Dealer = require('./components/Dealers/Dealer');
var PostReview = require('./components/Dealers/PostReview');

function App() {
  return (
    React.createElement(Routes, null, 
      React.createElement(Route, { path: "/login", element: React.createElement(LoginPanel) }),
      React.createElement(Route, { path: "/register", element: React.createElement(Register) }),
      React.createElement(Route, { path: "/postreview/:id", element: React.createElement(PostReview) }),
      React.createElement(Route, { path: "/dealers", element: React.createElement(Dealers) }),
      React.createElement(Route, { path: "/dealer/:id", element: React.createElement(Dealer) })
    )
  );
}

module.exports = App;
