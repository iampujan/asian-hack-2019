import axios from 'axios';

import {SERVER_URL} from '../config/constants';

export const fetchStationsData = async callback => {
  const response = await axios
    .get(`${SERVER_URL}/uniloc`)
    .then(resp => resp)
    .catch(err => {
      console.log('error fetching stations', err);
    });
  if (response && response.status === 200 && response.data.length > 0) {
    callback(response.data);
  }
};

export const fetchStationPMData = async (location, callback) => {
  const response = await axios
    .get(`${SERVER_URL}/daily?location=${location}`)
    .then(resp => resp)
    .catch(err => {
      console.log('error fetching station pm data', err);
    });
  if (response && response.status === 200 && response.data.length > 0) {
    callback(location, response.data);
  }
};

export const fetchRealtimeData = async callback => {
  const response = await axios
    .get(`${SERVER_URL}/pollution/fetch`)
    .then(resp => resp)
    .catch(err => {
      console.log('error fetching station pm data', err);
    });
  if (
    response &&
    response.status === 200 &&
    response.data &&
    response.data.length > 0
  ) {
    callback(response.data);
  }
};

export const saveDeviceData = deviceData => {
  axios({
    method: 'POST',
    url: `${SERVER_URL}/device`,
    contentType: 'application/json',
    data: deviceData,
  })
    .then(resp => resp)
    .catch(err => {
      console.log('error saving device data', err);
    });
};

export const subscribeToStation = subscriptionData => {
  axios({
    method: 'POST',
    url: `${SERVER_URL}/subscribe`,
    contentType: 'application/json',
    data: subscriptionData,
  })
    .then(resp => resp)
    .catch(err => {
      console.log('error while subscribing', err);
    });
};

export const unsubscribeToStation = subscriptionData => {
  axios({
    method: 'POST',
    url: `${SERVER_URL}/unsubscribe`,
    contentType: 'application/json',
    data: subscriptionData,
  })
    .then(resp => resp)
    .catch(err => {
      console.log('error while unsubscribing', err);
    });
};

export const submitComplaint = async (complaint, callback) => {
  const response = await axios({
    method: 'POST',
    url: `${SERVER_URL}/complaint`,
    contentType: 'application/json',
    data: complaint,
  })
    .then(resp => resp)
    .catch(err => {
      console.log('error while submitting complaint', err);
    });
  if (response && response.status === 200) {
    callback(response.data);
  }
};

export const fetchComplaints = async callback => {
  const response = await axios
    .get(`${SERVER_URL}/complaint`)
    .then(resp => resp)
    .catch(err => {
      console.log('error fetching complaints', err);
    });
  if (response && response.status === 200 && response.data.length > 0) {
    callback(response.data);
  }
};

export const fetchAllLocationPmData = async callback => {
  const response = await axios
    .get(`${SERVER_URL}/locations`)
    .then(resp => resp)
    .catch(err => {
      console.log('error on /locations', err);
    });
  if (response && response.status === 200 && response.data.length > 0) {
    callback(response.data);
  }
};
