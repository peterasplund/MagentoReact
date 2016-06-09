import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cart from './cart';
import category from './category';
import categories from './categories';

export default combineReducers({
  routing: routerReducer,
  cart,
  categories,
  category
});
