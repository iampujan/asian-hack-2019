import {
  UPDATE_STATIONS,
  UPDATE_STATION_PM_DATA,
  UPDATE_LOCATION_BAR_CHART_DATA,
} from '../reducers/types';

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

export const updateInsightBarChartData = data => {
  return {
    type: UPDATE_LOCATION_BAR_CHART_DATA,
    payload: data,
  };
};
