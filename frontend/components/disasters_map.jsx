import React from 'react';

class DisastersMap extends React.Component {
    componentDidMount() {
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
    }

    render() {
        return (
            <div className="map" id="map" ref="map"></div>
        )
    }
}

export default DisastersMap;