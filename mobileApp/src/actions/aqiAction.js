import {SUBSCRIBE_STATION, UPDATE_REALTIME_DATA} from '../reducers/types';

export const updateSubscribedStations = stations => {
  return {
    type: SUBSCRIBE_STATION,
    payload: stations,
  };
};

export const updateRealtimeData = realtimeData => {
  return {
    type: UPDATE_REALTIME_DATA,
    payload: realtimeData,
  };
};
