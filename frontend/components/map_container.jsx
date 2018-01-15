import { connect } from 'react-redux';
import { fetchDisasters } from '../actions/disaster_actions';

import Map from './map';

const mapStateToProps = ({disasters}) => ({
    disasters: Object.keys(disasters).map(key => disasters[key])
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchDisasters: (filter) => dispatch(fetchDisasters(filter))
    // updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Map);
  