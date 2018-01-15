import React from 'react';
import { Provider } from 'react-redux';
// import { HashRouter } from 'react-router-dom';
import MapContainer from './map_container.jsx'

const Root = ({store}) => (
<Provider store={store}>
    <MapContainer />
</Provider>
)
    // <HashRouter>
    // </HashRouter>

export default Root;