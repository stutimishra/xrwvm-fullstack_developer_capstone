/* jshint esversion: 6, browser: true, strict: true */

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./App');
const { BrowserRouter } = require('react-router-dom');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(BrowserRouter, null,
    React.createElement(App, null)
  )
);
