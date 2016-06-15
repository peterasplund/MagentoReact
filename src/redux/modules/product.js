const LOAD = 'magentoreact/product/LOAD';
const LOAD_SUCCESS = 'magentoreact/product/LOAD_SUCCESS';
const LOAD_FAIL = 'magentoreact/product/LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  data: {}
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
        data: action.result,
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

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`Product/get/id/${id}`)
  };
}
