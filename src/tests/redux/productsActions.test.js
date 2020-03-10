import fetchProducts from '../../redux/dispatchers/productsDispatcher';
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import nock from 'nock';
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const API_URL = 'https://xznrqupkl2.execute-api.eu-west-1.amazonaws.com';
const products = [];

describe("Products Actions", () => {
  afterEach(() => fetchMock.restore());

  describe('PRODUCTS', () => {
    describe("Success", () => {
      it("should dispatch FETCH_PRODUCTS_PENDING and FETCH_PRODUCTS_SUCCESS", () => {
        const store = mockStore({ products: [] });
        localStorage.setItem('authKey', 'abcd1234');
  
        nock(API_URL)
        .post('/test/product-feed',{ authKey: 'abcd1234'})
        .reply(200, products);
  
        return store.dispatch(fetchProducts()).then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toEqual(2);
          expect(expectedActions[0]).toEqual({ type: 'FETCH_PRODUCTS_PENDING' });
          expect(expectedActions[1]).toEqual({ type: 'FETCH_PRODUCTS_SUCCESS', products });
        });
      });
    });
  
    describe("Failure", () => {
      it("should dispatch FETCH_PRODUCTS_PENDING and FETCH_PRODUCTS_ERROR", () => {
        localStorage.removeItem('authKey');
        const error = {
          message: 'request to https://xznrqupkl2.execute-api.eu-west-1.amazonaws.com/test/product-feed failed, reason: Not found',
          type: 'system',
          errno: 404,
          code: 404 
        };

        const store = mockStore({ products: [] });
  
        nock(API_URL)
        .post('/test/product-feed')
        .replyWithError({code: 404, message: 'Not found'});
  
        return store.dispatch(fetchProducts()).then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toEqual(2);
          expect(expectedActions[0].type).toEqual('FETCH_PRODUCTS_PENDING');
          expect(expectedActions[1].type).toEqual('FETCH_PRODUCTS_ERROR');
          expect(expectedActions[1].error).toEqual(error);
          
        });
      });
    });
  });
});