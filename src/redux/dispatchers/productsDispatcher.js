import fetch from 'node-fetch';
import { 
  fetchProductsPending, 
  fetchProductsSuccess, 
  fetchProductsError,
} from '../actions/productsActions';

const ProductsUrl = 'https://xznrqupkl2.execute-api.eu-west-1.amazonaws.com/test/product-feed';

const fetchProducts = () => {
  const authKey = localStorage.getItem('authKey');

  return dispatch => {
    dispatch(fetchProductsPending());
    return fetch(ProductsUrl, { 
      method: 'post',  
      body: JSON.stringify({ 
        authKey: authKey,
      }) 
    })
    .then(res => res.json())
    .then(products => {
      if(products.error) throw(products.error);
      dispatch(fetchProductsSuccess(products));
      return products;
    })
    .catch(error => {
      dispatch(fetchProductsError(error));
    })
  }
}

export default fetchProducts;