/* globals jest */

import DisastersReducer from '../reducers/disasters_reducer';
import RootReducer from '../reducers/root_reducer';
import { createStore } from 'redux';

describe('Reducers', () => {
    describe('DisastersReducer', () => {
        it('exports a function', () => {
            expect(typeof DisastersReducer).toEqual('function');
        });

        it('should initialize with an empty object as the default state', () => {
            expect(DisastersReducer(undefined, {})).toEqual({});
        });

        it('should return the previous state if an action is not matched', () => {
            const oldState = { 1: 'oldState' };
            const newState = DisastersReducer(oldState, { type: 'unmatchedtype' });
            expect(newState).toEqual(oldState);
        });

        describe('handling the RECEIVE_DISASTERS action', () => {
            let action,
                testDisasters;

            beforeEach(() => {
                    testDisasters = { 1: 'testDisaster1', 2: 'testDisaster2' };
                    action = {
                        type: 'RECEIVE_DISASTERS',
                        disasters: testDisasters
                    };
            });

            it('should replace the state with the action\'s disasters', () => {
                    const state = DisastersReducer(undefined, action);
                    expect(state).toEqual(testDisasters);
            });

            it('should not modify the old state', () => {
                    let oldState = { 1: 'oldState' };
                    DisastersReducer(oldState, action);
                    expect(oldState).toEqual({ 1: 'oldState' });
            });
        });

        describe('RootReducer', () => {
            let testStore;

            beforeAll(() => {
                testStore = createStore(RootReducer);
            });

            it('exports a function', () => {
                expect(typeof RootReducer).toEqual('function');
            });

            it('includes the DisastersReducer under the key `disasters`', () => {
                const disasters = { CA: 1, NV: 3 };
                const action = { type: 'RECEIVE_DISASTERS', disasters };
                testStore.dispatch(action);

                expect(testStore.getState().disasters).toEqual(DisastersReducer({}, action));
            });
        });
    });
});
