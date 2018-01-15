import * as APIUtil from '../util/disaster_api_util';

export const RECEIVE_DISASTERS = 'RECEIVE_DISASTERS';

export const receiveDisasters = disasters => ({
    type: RECEIVE_DISASTERS,
    disasters
});

export const fetchDisasters = filters => dispatch => (
    APIUtil.fetchDisasters(filters).then(disasters => (
        dispatch(receiveDisasters(disasters))
    ))
);