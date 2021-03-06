import React from 'react';
import stateAbbrs from '../util/state_abbrs';

class DisastersMap extends React.Component {

    constructor(props) {
        super(props);
        
        this.disasterMin = Number.MAX_VALUE;
        this.disasterMax = -Number.MAX_VALUE;

        this.clearDisasterData = this.clearDisasterData.bind(this);
        this.loadDisasterData = this.loadDisasterData.bind(this);
        this.styleFeature = this.styleFeature.bind(this);   
        this.mouseInToRegion = this.mouseInToRegion.bind(this);   
    }
    
    componentDidMount() {
        let mapStyle = [{
            'stylers': [{ 'visibility': 'off' }]
        }, {
            'featureType': 'landscape',
            'elementType': 'geometry',
            'stylers': [{ 'visibility': 'on' }, { 'color': '#fcfcfc' }]
        }, {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [{ 'visibility': 'on' }, { 'color': '#bfd4ff' }]
        }];
        this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40, lng: -100 },
            zoom: 4,
            styles: mapStyle,
            mapTypeControl: false
        });

        this.map.data.setStyle(this.styleFeature);
        this.map.data.addListener('mouseover', this.mouseInToRegion);
        this.map.data.addListener('mouseout', this.mouseOutOfRegion)

        this.map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/states.js', { idPropertyName: 'NAME' });
        this.loadDisasterData();
    }

    componentDidUpdate() {
        this.loadDisasterData();
    }
    
    loadDisasterData() {
        this.clearDisasterData();
        Object.keys(this.props.disasters).map((stateAbbr) => {
            let stateFullName = stateAbbrs[stateAbbr];
            if (this.map.data.getFeatureById(stateFullName)) {
                this.map.data.getFeatureById(stateFullName).setProperty("disaster_variable", this.props.disasters[stateAbbr]);
                let disasterVariable = this.props.disasters[stateAbbr]
                if (this.disasterMin > disasterVariable) {
                    this.disasterMin = disasterVariable
                }
                if (this.disasterMax < disasterVariable) {
                    this.disasterMax = disasterVariable;
                }
            }
        })
        this.disasterMin === Number.MAX_VALUE ? document.getElementById('disaster-min').textContent = "min" : document.getElementById('disaster-min').textContent = this.disasterMin.toLocaleString();
        this.disasterMax === -Number.MAX_VALUE ? document.getElementById('disaster-max').textContent = "max" : document.getElementById('disaster-max').textContent = this.disasterMax.toLocaleString();
    }

    styleFeature(feature) {
        let high = [5, 69, 54];  // color of smallest datum
        let low = [127, 81, 37];   // color of largest datum

        // // delta represents where the value sits between the min and max
        let delta
        if (feature.getProperty('disaster_variable') && (this.disasterMin === this.disasterMax)) {
            delta = 0
        } else if (feature.getProperty('disaster_variable')) {
            delta = ((feature.getProperty('disaster_variable') - this.disasterMin) / (this.disasterMax - this.disasterMin))
        }
        let color = [];
        for (let i = 0; i < 3; i++) {
          // calculate an integer color based on the delta
          color[i] = (high[i] - low[i]) * delta + low[i];
        }

        // // determine whether to show this shape or not
        let polyColor;
        if (feature.getProperty('disaster_variable') == null || isNaN(feature.getProperty('disaster_variable'))) {
          polyColor = '#808080';
        } else {
            polyColor = 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)'
        }

        var outlineWeight = 1, zIndex = 1;
        if (feature.getProperty('state') === 'hover') {
          outlineWeight = zIndex = 4;
        }

        return {
            strokeWeight: outlineWeight,
            strokeColor: '#fff',
            zIndex: 2,
            fillColor: polyColor,
            fillOpacity: 0.75,
            visible: true
        };
    }

    clearDisasterData() {
        this.disasterMin = Number.MAX_VALUE;
        this.disasterMax = -Number.MAX_VALUE;
        this.map.data.forEach(function (row) {
            row.setProperty('disaster_variable', undefined);
        });
        document.getElementById('data-box').style.display = 'none';
        document.getElementById('data-caret').style.display = 'none';
    }

    mouseInToRegion(e) {
        if (e.feature.getProperty('disaster_variable')) {
            e.feature.setProperty('state', 'hover');
            
            let percent = (e.feature.getProperty('disaster_variable') - this.disasterMin) / (this.disasterMax - this.disasterMin) * 100;
            // update the label
            document.getElementById('data-value').textContent = e.feature.getProperty('NAME') + ': ';
            document.getElementById('data-value').textContent += e.feature.getProperty('disaster_variable').toLocaleString() + ' disasters';
            document.getElementById('data-box').style.display = 'block';
            document.getElementById('data-caret').style.display = 'block';
            document.getElementById('data-caret').style.paddingLeft = percent + '%';
        }
    }

    mouseOutOfRegion(e) {
        e.feature.setProperty('state', 'normal');
        document.getElementById('data-box').style.display = 'none';
        document.getElementById('data-caret').style.display = 'none';
    }

    render() {
        return (
            <div className="map" id="map" ref="map"></div>
        )
    }
}

export default DisastersMap;