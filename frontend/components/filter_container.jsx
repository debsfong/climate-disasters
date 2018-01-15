import { connect } from 'react-redux';
import { fetchDisasters } from '../actions/disaster_actions';

import Filter from './filter';

const mapStateToProps = ({disasters}) => ({
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchDisasters: (filter) => dispatch(fetchDisasters(filter))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Filter);
  