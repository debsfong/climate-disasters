//React
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Root from './components/root';
// import configureStore from './store/store';


document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('map');
  ReactDOM.render(<Root />, document.getElementById("root"));
});
