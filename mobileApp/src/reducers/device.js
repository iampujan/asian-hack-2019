import {REGISTER_DEVICE} from './types';

const initialState = {
  deviceId: null,
  fcmToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_DEVICE:
      return action.payload;
    default:
      return state;
  }
};
