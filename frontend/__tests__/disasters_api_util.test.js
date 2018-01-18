/* globals jest */

import { fetchDisasters } from '../util/disaster_api_util';

describe('the api util', () => {
    beforeEach(() => {
        global.$ = require.requireMock('jquery');
        global.$.ajax = jest.fn(options => "ajax promise");
    });
  
    afterEach(() => {
        global.$.ajax.mockClear();
    });
  
    it('fetchDisasterss makes request and returns an ajax promise', () => {
        const returnValue = fetchDisasters();
        expect($.ajax).toBeCalled();
    
        // This line gets the first argument of the first call to $.ajax
        const ajaxCallArg = $.ajax.mock.calls[0][0];
        expect(ajaxCallArg.url).toEqual('api/disasters');
        expect(returnValue).toEqual("ajax promise");
    });
});
  