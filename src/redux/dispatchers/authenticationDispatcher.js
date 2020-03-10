import fetch from 'node-fetch';
import { 
  loginRequestPending, 
  loginRequestSuccess, 
  loginRequestError,
} from '../actions/authenticationActions';

const loginUrl = 'https://xznrqupkl2.execute-api.eu-west-1.amazonaws.com/test/login';

const loginUser = (username, password) => {
  return dispatch => {
    dispatch(loginRequestPending());
    return fetch(loginUrl, {
      method: 'post',
      body: JSON.stringify({ 
        username: username,
        password: password,
      })
    })
    .then(res => res.json())
    .then(user => {
      if(user.error) throw(user.error);
      localStorage.setItem('authKey', user.authKey);
      dispatch(loginRequestSuccess(user));
      return user;
    })
    .catch(error => {
      dispatch(loginRequestError(error));
    })
  }
}

export default loginUser;