const LOAD = 'magentoreact/attributeValues/LOAD';
const LOAD_SUCCESS = 'magentoreact/attributeValues/LOAD_SUCCESS';
const LOAD_FAIL = 'magentoreact/attributeValues/LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  data: []
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
        data: action.result
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

export function load(attribute) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`Attribute/getAttribute/attribute/${attribute}`)
  };
}
