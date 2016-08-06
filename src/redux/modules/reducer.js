import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messages from './messages';
import cart from './cart';
import category from './category';
import categories from './categories';
import product from './product';
import media from './media';
import cmspage from './cmspage';
import attributeValues from './attributeValues';
import attributeCollection from './attributeCollection';

export default combineReducers({
  routing: routerReducer,
  messages,
  cart,
  categories,
  category,
  product,
  media,
  cmspage,
  attributeValues,
  attributeCollection
});
