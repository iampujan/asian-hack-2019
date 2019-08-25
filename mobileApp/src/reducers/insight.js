import {
  UPDATE_STATIONS,
  UPDATE_STATION_PM_DATA,
  UPDATE_LOCATION_BAR_CHART_DATA,
} from './types';

const initialState = {
  stations: [],
  stationsPmData: {},
  stationsAverageData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATIONS:
      return {
        ...state,
        stations: action.payload,
      };
    case UPDATE_STATION_PM_DATA:
      return {
        ...state,
        stationsPmData: {
          ...state.stationsPmData,
          [action.payload.key]: action.payload.data,
        },
      };
    case UPDATE_LOCATION_BAR_CHART_DATA:
      return {
        ...state,
        stationsAverageData: action.payload,
      };
    default:
      return state;
  }
};
