//React
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Root from './components/root';
import configureStore from './store/store';


document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore();

  const root = document.getElementById('map');
  ReactDOM.render(<Root store={store}/>, document.getElementById("root"));
  window.store=store;
});

let http = require("http");
setInterval(function() {
  console.log("pinged")
    http.get("http://us-climate-disasters.herokuapp.com");
}, 600000);
