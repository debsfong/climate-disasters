import { fetchDisasters, receiveDisasters, RECEIVE_DISASTERS } from '../actions/disaster_actions';
import * as DisasterApiUtil from '../util/disaster_api_util';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ disasters: {} });
  });
  
  describe('fetchDisasters', () => {
    it('should export a fetchDisasters function', () => {
      expect(typeof fetchDisasters).toEqual('function');
    });
  
    it('dispatches RECEIVE_DISASTERS when disasters have been fetched', () => {
      const disasters = { NJ: 517, ID: 249, SC: 615, NH: 258, TN: 122 };
      DisasterApiUtil.fetchDisasters = jest.fn(() => (
        Promise.resolve(disasters)
      ));
      const expectedActions = [{ type: "RECEIVE_DISASTERS", disasters }];
  
      return store.dispatch(fetchDisasters()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  })
  
});
