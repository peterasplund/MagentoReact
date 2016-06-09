const LOAD = 'magentoreact/category/LOAD';

const initialState = {
  products: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        products: action.products,
      };
    default:
      return state;
  }
}

export function load(id) {
  return {
    type: LOAD,
    products: [
      { name: 'test 1', price: 99, thumbnail: 'http://www.crossbrands.se/media/catalog/product/cache/33/image/680x/9df78eab33525d08d6e5fb8d27136e95/2/3/23432-23433_1.jpg' },
      { name: 'test 2', price: 49, thumbnail: 'http://www.crossbrands.se/media/catalog/product/cache/33/image/680x/9df78eab33525d08d6e5fb8d27136e95/2/3/23442-23443_1.jpg' }
    ]
  };
}
