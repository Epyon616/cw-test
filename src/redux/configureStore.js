import { applyMiddleware, createStore, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";

const middlewares = [thunk];

const configureStore = (initialState) => {
  const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // to get redux dev tools working!
  
  return createStore(
    rootReducer, 
    initialState, 
    composeEnhancers(applyMiddleware(...middlewares))
  );
}

 export default configureStore;