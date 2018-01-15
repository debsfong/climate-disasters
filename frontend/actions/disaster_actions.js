

export const RECEIVE_DISASTERS = 'RECEIVE_DISASTERS';

export const receiveDisasters = disasters => ({
    type: RECEIVE_DISASTERS,
    disasters
});

export const fetchDisasters = filters => dispatch => (
    APIUtil.fetchDisasters(filters).then(disasters => (
        disatch(receiveDisasters(disasters))
    ))
);