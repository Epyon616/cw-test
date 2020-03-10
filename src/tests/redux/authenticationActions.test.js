import loginUser from '../../redux/dispatchers/authenticationDispatcher';
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import nock from 'nock';
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const API_URL = 'https://xznrqupkl2.execute-api.eu-west-1.amazonaws.com';
const user = { 
  id: 1,
  username: 'test', 
  authKey: 'ABCD1234'
};

describe("Authentication Actions", () => {
  afterEach(() => fetchMock.restore());

  describe('loginUser', () => {
    describe("Success", () => {
      it("should dispatch LOGIN_REQUEST_PENDING and LOGIN_REQUEST_SUCCESS", () => {
        const store = mockStore({ user });
  
        nock(API_URL)
        .post('/test/login', { username: 'test', password: 'test'})
        .reply(200, user);
  
        return store.dispatch(loginUser('test', 'test')).then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toEqual(2);
          expect(expectedActions[0]).toEqual({ type: 'LOGIN_REQUEST_PENDING' });
          expect(expectedActions[1]).toEqual({ type: 'LOGIN_REQUEST_SUCCESS', user });
        });
      });
    });
  
    describe("Failure", () => {
      it("should dispatch LOGIN_REQUEST_PENDING and LOGIN_REQUEST_SUCCESS", () => {
        const error = {
          message: 'request to https://xznrqupkl2.execute-api.eu-west-1.amazonaws.com/test/login failed, reason: Unauthorized',
          type: 'system',
          errno: 401,
          code: 401 
        };

        const store = mockStore({ products: [] });
  
        nock(API_URL)
        .post('/test/login', {})
        .replyWithError({code: 401, message: 'Unauthorized'});
  
        return store.dispatch(loginUser()).then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toEqual(2);
          expect(expectedActions[0].type).toEqual('LOGIN_REQUEST_PENDING');
          expect(expectedActions[1].type).toEqual('LOGIN_REQUEST_ERROR');
          expect(expectedActions[1].error).toEqual(error);
          
        });
      });
    });
  });
});