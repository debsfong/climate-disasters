import React from 'react';
import DisastersMap from './disasters_map';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDisasters();

        let mapStyle = [{
            'stylers': [{'visibility': 'off'}]
        }, {
            'featureType': 'landscape',
            'elementType': 'geometry',
            'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
        }, {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [{'visibility': 'on'}, {'color': '#bfd4ff'}]
        }];
        let map = new google.maps.Map(document.getElementById("map"), {
            center: {lat: 40, lng: -100},
            zoom: 4,
            styles: mapStyle, 
            mapTypeControl: false
        })
        map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/states.js', { idPropertyName: 'STATE'});
        
    }

    render() {
        return (
            <div>
                 <div id="controls" className="nicebox">
                    <select id="census-variable">
                        <option value="Thing1">Thing1</option>
                        <option value="Thing2">Thing2</option>
                    </select>
                </div>

                <div id="legend">
                    <div id="census-min">min</div>
                    <div className="color-key"><span id="data-caret">&#x25c6;</span></div>
                    <div id="census-max">max</div>
                </div>

                <div id="data-box" className="nicebox">
                    <label>data-value
                        <span id="data-value"></span>
                    </label>
                </div>

                <div className="map" id="map" ref="map"></div></div>
        )
    }
}

export default App;