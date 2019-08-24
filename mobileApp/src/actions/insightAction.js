import {UPDATE_STATIONS, UPDATE_STATION_PM_DATA} from '../reducers/types';

export const updateStations = stations => {
  return {
    type: UPDATE_STATIONS,
    payload: stations,
  };
};

export const updateStationPMData = (key, data) => {
  return {
    type: UPDATE_STATION_PM_DATA,
    payload: {
      key,
      data,
    },
  };
};
