import {UPDATE_COMPLAINTS, UPDATE_NEW_COMPLAINT} from '../reducers/types';

export const updateComplaints = complaints => {
  return {
    type: UPDATE_COMPLAINTS,
    payload: complaints,
  };
};

export const updateNewComplaint = complaint => {
  return {
    type: UPDATE_NEW_COMPLAINT,
    payload: complaint,
  };
};
