import {SUBSCRIBE_STATION} from '../reducers/types';

export const updateSubscribedStations = stations => {
  return {
    type: SUBSCRIBE_STATION,
    payload: stations,
  };
};
