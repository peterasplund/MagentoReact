import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import category from './category';
import categories from './categories';

export default combineReducers({
  routing: routerReducer,
  categories,
  category
});
