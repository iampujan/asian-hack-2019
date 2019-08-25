import {UPDATE_COMPLAINTS, UPDATE_NEW_COMPLAINT} from './types';

const initialState = {
  complaints: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMPLAINTS:
      return {
        ...state,
        complaints: action.payload,
      };
    case UPDATE_NEW_COMPLAINT:
      return {
        ...state,
        complaints: [action.payload, ...state.complaints],
      };
    default:
      return state;
  }
};
