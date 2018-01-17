import React from 'react';

class Filter extends React.Component {
    constructor(props) {
        super(props);
                
        this.state = {
            selected: ""
        }

        this.handleSelect = this.handleSelect.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchDisasters({incident_type: this.state.selected});
    }
    
    generateOptions() {
        let allDisasters = [
            "Earthquake",
            "Chemical",
            "Human Cause",
            "Tornado",
            "Typhoon",
            "Mud/Landslide",
            "Coastal Storm",
            "Snow",
            "Other",
            "Severe Ice Storm",
            "Severe Storm(s)",
            "Freezing",
            "Hurricane",
            "Drought",
            "Fire",
            "Terrorist",
            "Tsunami",
            "Volcano",
            "Dam/Levee Break",
            "Fishing Losses",
            "Toxic Substances",
            "Flood"
        ]

        let allOptions = allDisasters.map(type => (
            <option value={type} key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
        ))
        return (
            [<option value="" disabled key="disabled">Select a Climate Disaster</option>].concat(allOptions)
        )
    }

    handleSelect(e) {
        this.setState({selected: e.target.value})
        this.props.fetchDisasters({incident_type: e.target.value})
    }

    render() {
        return (
            <div id="controls" className="nicebox">
                <select id="census-variable" value={this.state.selected} onChange={this.handleSelect}>
                    {this.generateOptions()}
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
                </div>
            </div>
        )
    }
}

export default Filter;