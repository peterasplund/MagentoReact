import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messages from './messages';
import cart from './cart';
import category from './category';
import categories from './categories';

export default combineReducers({
  routing: routerReducer,
  messages,
  cart,
  categories,
  category
});
