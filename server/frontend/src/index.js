/* jshint esversion: 6, browser: true, strict: true */
(function () {
  'use strict';

  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  import { BrowserRouter } from 'react-router-dom';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
})();
