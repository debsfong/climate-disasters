import { connect } from 'react-redux';
import { fetchDisasters } from '../actions/disaster_actions';

import Map from './map';

const mapStateToProps = ({disasters}) => ({
    disasters: disasters
  });
  
  const mapDispatchToProps = dispatch => ({
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Map);
  