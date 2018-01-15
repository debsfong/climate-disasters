import React from 'react';
import { Provider } from 'react-redux';
// import { HashRouter } from 'react-router-dom';
import App from './app.jsx'

const Root = ({store}) => (
<Provider store={store}>
    <App />
</Provider>
)
    // <HashRouter>
    // </HashRouter>

export default Root;