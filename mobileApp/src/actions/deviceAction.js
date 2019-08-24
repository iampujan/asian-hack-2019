import {REGISTER_DEVICE} from '../reducers/types';

export const registerDevice = deviceData => {
  return {
    type: REGISTER_DEVICE,
    payload: deviceData,
  };
};
