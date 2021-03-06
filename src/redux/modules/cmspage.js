const LOAD = 'magentoreact/cmspage/LOAD';
const LOAD_SUCCESS = 'magentoreact/cmspage/LOAD_SUCCESS';
const LOAD_FAIL = 'magentoreact/cmspage/LOAD_FAIL';

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

export function load(identifier) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`CMS/getPage/s/${identifier}`)
  };
}
