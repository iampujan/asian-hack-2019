import axios from 'axios';

import {SERVER_URL} from '../config/constants';

export const fetchStationsData = async callback => {
  const response = await axios
    .get(`${SERVER_URL}/uniloc`)
    .then(resp => resp)
    .catch(err => {
      console.log('error fetching stations', err);
    });
  if (response.status === 200 && response.data.length > 0) {
    callback(response.data);
  }
};

export const fetchStationPMData = async (location, callback) => {
  console.log('making request');
  const response = await axios
    .get(`${SERVER_URL}/daily?location=${location}`)
    .then(resp => resp)
    .catch(err => {
      console.log('error fetching station pm data', err);
    });
  if (response.status === 200 && response.data.length > 0) {
    callback(location, response.data);
  }
};