const ADD = 'magentoreact/messages/ADD';
const CLOSE = 'magentoreact/messages/CLOSE';
const CLOSE_NEWEST = 'magentoreact/messages/CLOSE_NEWEST';
const CLOSE_ALL = 'magentoreact/messages/CLOSE_ALL';

const initialState = [];

let idCounter = 0;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case ADD:
      return [
        {
          id: idCounter,
          status: action.status,
          text: action.text
        }, ...state
      ];
    case CLOSE:
      return state.filter(message =>
        message.id !== action.id
      );
    case CLOSE_NEWEST:
      return state.slice(0, -1);
    case CLOSE_ALL:
      return [];
    default:
      return state;
  }
}

export function close(id) {
  return {
    type: CLOSE,
    id
  };
}

export function add(status, text, timeout = 6000) {
  idCounter ++;
  setTimeout(() => {
    close(idCounter);
  }, timeout);
  return {
    type: ADD,
    status,
    text
  };
}

export function closeNewest() {
  return {
    type: CLOSE_NEWEST,
  };
}

export function closeAll() {
  return {
    type: CLOSE_ALL
  };
}
