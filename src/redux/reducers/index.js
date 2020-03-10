import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import authenticationReducer from './authenticationReducer';

const rootReducer = combineReducers({ authenticationReducer, productsReducer });

export default rootReducer;