import merge from 'lodash/merge';

import { RECEIVE_DISASTERS } from '../actions/disaster_actions';

const disastersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = merge({}, state);

    switch (action.type) {
        case RECEIVE_DISASTERS:
            return action.disasters;
        default:
            return state;
    }
}

export default disastersReducer;