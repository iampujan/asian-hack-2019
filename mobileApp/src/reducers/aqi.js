import {SUBSCRIBE_STATION} from './types';

const initialState = {
  realtime: [
    {
      name: 'Baisipati',
      key: 'baisipati-ktm',
      value: 50,
    },
    {
      name: 'Bhaktapur',
      key: 'birendra-school-bhaktapur',
      value: 70,
    },
    {
      name: 'Damak',
      key: 'damak',
      value: 343,
    },
    {
      name: 'Dang',
      key: 'dang',
      value: 23,
    },
    {
      name: 'Dhankuta',
      key: 'dhankuta',
      value: 123,
    },
    {
      name: 'Dhulikhel',
      key: 'dhulikhel-kavre',
      value: 450,
    },
    {
      name: 'Nepalgunj',
      key: 'nepalgunj',
      value: 255,
    },
  ],
  subscribedStations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_STATION:
      return {
        ...state,
        subscribedStations: action.payload,
      };
    default:
      return state;
  }
};
