import { combineReducers } from 'redux';

import disasters from './disasters_reducer.js';

const rootReducer = combineReducers({
    disasters
});

export default rootReducer;