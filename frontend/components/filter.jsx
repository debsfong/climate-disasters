import React from 'react';

class Filter extends React.Component {
    constructor(props) {
        super(props);
                
        this.state = {
            selectedDisaster: "",
            selectedYear: ""
        }

        this.disasterSelect = this.disasterSelect.bind(this);
        this.yearSelect = this.yearSelect.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchDisasters({incident_type: "All", year: "All"});
    }
    
    generateOptions(filterValue) {
        let allOptions = [
            <option value="" key="" disabled>Select a {filterValue}</option>,
            <option value="All" key="All">All {filterValue}s</option>
        ];
        if (filterValue == 'Climate Disaster') {
            let allDisasters = [ 
                'Chemical',
                'Coastal Storm',
                'Dam/Levee Break',
                'Drought',
                'Earthquake',
                'Fire',
                'Fishing Losses',
                'Flood',
                'Freezing',
                'Human Cause',
                'Hurricane',
                'Mud/Landslide',
                'Other',
                'Severe Ice Storm',
                'Severe Storm(s)',
                'Snow',
                'Terrorist',
                'Tornado',
                'Toxic Substances',
                'Tsunami',
                'Typhoon',
                'Volcano' 
            ]
            allOptions = allOptions.concat(
                allDisasters.map(type => (<option value={type} key={type}>{type}</option>))
            );
        } else if (filterValue == 'Year') {
            let curYear = new Date().getFullYear();
            for (let i = 1953; i <= curYear; i++) {
                allOptions.push(<option value={i} key={i}>{i}</option>);
            }
        }
        return (
            allOptions
        );
    }

    disasterSelect(e) {
        if (this.state.selectedYear === "") {
            this.state.selectedYear = "All"
        }
        this.setState({selectedDisaster: e.target.value})
        this.props.fetchDisasters({incident_type: e.target.value, year: this.state.selectedYear})
    }

    yearSelect(e) {
        if (this.state.selectedDisaster === "") {
            this.state.selectedDisaster = "All"
        }
        this.setState({selectedYear: e.target.value})
        this.props.fetchDisasters({incident_type: this.state.selectedDisaster, year: e.target.value})
    }

    render() {
        return (
            <div id="controls" className="nicebox">
                <select id="dropdown" value={this.state.selectedDisaster} onChange={this.disasterSelect}>
                    {this.generateOptions('Climate Disaster')}
                </select>
                <select id="dropdown" value={this.state.selectedYear} onChange={this.yearSelect}>
                    {this.generateOptions('Year')}
                </select>

                <div id="legend">
                    <div id="census-min">min</div>
                    <div className="color-key"><span id="data-caret">&#x25c6;</span></div>
                    <div id="census-max">max</div>
                </div>

                <div id="data-box" className="nicebox">
                    <label id='data-label'>
                        <span id="data-value"></span>
                    </label>
                    <p id="note">*Disasters have been counted once per county in each state</p>
                </div>
                <p id="source">Source: OpenFEMA Dataset: Disaster Declarations Summaries - V1</p>
            </div>
        )
    }
}

export default Filter;