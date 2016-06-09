import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import category from './category';

export default combineReducers({
  routing: routerReducer,
  category
});
