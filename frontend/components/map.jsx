import React from 'react';
import stateAbbrs from '../util/state_abbrs';

class DisastersMap extends React.Component {

    constructor(props) {
        super(props);
        
        this.censusMin = Number.MAX_VALUE;
        this.censusMax = -Number.MAX_VALUE;

        this.clearCensusData = this.clearCensusData.bind(this);
        this.loadCensusData = this.loadCensusData.bind(this);
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
        this.loadCensusData();
    }

    componentDidUpdate() {
        this.loadCensusData();
    }
    
    loadCensusData() {
        this.clearCensusData();
        Object.keys(this.props.disasters).map((stateAbbr) => {
            let stateFullName = stateAbbrs[stateAbbr];
            if (this.map.data.getFeatureById(stateFullName)) {
                this.map.data.getFeatureById(stateFullName).setProperty("census_variable", this.props.disasters[stateAbbr]);
                let censusVariable = this.props.disasters[stateAbbr]
                if (this.censusMin > censusVariable) {
                    this.censusMin = censusVariable
                }
                if (this.censusMax < censusVariable) {
                    this.censusMax = censusVariable;
                }
            }
        })
        this.censusMin === Number.MAX_VALUE ? document.getElementById('census-min').textContent = "min" : document.getElementById('census-min').textContent = this.censusMin.toLocaleString();
        this.censusMax === -Number.MAX_VALUE ? document.getElementById('census-max').textContent = "max" : document.getElementById('census-max').textContent = this.censusMax.toLocaleString();
    }

    styleFeature(feature) {
        let high = [5, 69, 54];  // color of smallest datum
        let low = [127, 81, 37];   // color of largest datum

        // // delta represents where the value sits between the min and max
        let delta
        if (feature.getProperty('census_variable') && (this.censusMin === this.censusMax)) {
            delta = 0
        } else if (feature.getProperty('census_variable')) {
            delta = ((feature.getProperty('census_variable') - this.censusMin) / (this.censusMax - this.censusMin))
        }
        let color = [];
        for (let i = 0; i < 3; i++) {
          // calculate an integer color based on the delta
          color[i] = (high[i] - low[i]) * delta + low[i];
        }

        // // determine whether to show this shape or not
        let polyColor;
        if (feature.getProperty('census_variable') == null || isNaN(feature.getProperty('census_variable'))) {
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

    clearCensusData() {
        this.censusMin = Number.MAX_VALUE;
        this.censusMax = -Number.MAX_VALUE;
        this.map.data.forEach(function (row) {
            row.setProperty('census_variable', undefined);
        });
        document.getElementById('data-box').style.display = 'none';
        document.getElementById('data-caret').style.display = 'none';
    }

    mouseInToRegion(e) {
        if (e.feature.getProperty('census_variable')) {
            e.feature.setProperty('state', 'hover');
            
            let percent = (e.feature.getProperty('census_variable') - this.censusMin) / (this.censusMax - this.censusMin) * 100;
            // update the label
            document.getElementById('data-value').textContent = e.feature.getProperty('NAME') + ': ';
            document.getElementById('data-value').textContent += e.feature.getProperty('census_variable').toLocaleString() + ' disasters';
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