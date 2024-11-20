import { applyMiddleware, createStore, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import for redux-thunk
import authReducer from './reducers/authReducer'; // Adjust the path if needed

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create the Redux store with thunk middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Apply middleware for async actions
);

export default store;
