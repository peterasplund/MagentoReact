const LOAD = 'magentoreact/category/LOAD';
const LOAD_SUCCESS = 'magentoreact/category/LOAD_SUCCESS';
const LOAD_FAIL = 'magentoreact/category/LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  products: []
};

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
        products: action.result,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}

export function load(slug) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`Category/getProducts/s/${slug}`)
  };
}
