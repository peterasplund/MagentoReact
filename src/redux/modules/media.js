const SELECT = 'magentoreact/media/SELECT';

const initialState = {
  selectedImage: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case SELECT:
      return {
        ...state,
        selectedImage: action.image
      };
    default:
      return state;
  }
}

export function selectImage(image) {
  return {
    type: SELECT,
    image
  };
}
