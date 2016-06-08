import { createStore } from 'redux';
import reducer from './modules/reducer';

export default function configureStore(initialState = {}) {
  return createStore(reducer, initialState)
}
