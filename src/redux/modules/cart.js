const LOAD = 'magentoreact/cart/LOAD';
const LOAD_SUCCESS = 'magentoreact/cart/LOAD_SUCCESS';
const LOAD_FAIL = 'magentoreact/cart/LOAD_FAIL';

const ADD = 'magentoreact/cart/ADD';
const ADD_SUCCESS = 'magentoreact/cart/ADD_SUCCESS';
const ADD_FAIL = 'magentoreact/cart/ADD_FAIL';

const REMOVE = 'magentoreact/cart/REMOVE';
const REMOVE_SUCCESS = 'magentoreact/cart/REMOVE_SUCCESS';
const REMOVE_FAIL = 'magentoreact/cart/REMOVE_FAIL';

const TOGGLE = 'magentoreact/cart/TOGGLE';

const initialState = {
  loading: false,
  loaded: false,
  open: false,
  data: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
    return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      }


    case ADD:
      return {
        ...state,
        loading: true
      };
    case ADD_SUCCESS:
    return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case ADD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      }


    case REMOVE:
      return {
        ...state,
        loading: true
      };
    case REMOVE_SUCCESS:
    return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case REMOVE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      }


    case TOGGLE:
      return {
        ...state,
        open: !state.open,
      }


    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('Cart/get')
  };
}

export function add(product, qty = 1) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.get('Cart/add/product/' + product + '/qty/' + qty)
  };
}

export function remove(product) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.get('Cart/delete/id/' + product)
  };
}

export function toggle() {
  return {
    type: TOGGLE,
  };
}
