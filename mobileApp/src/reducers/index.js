import {combineReducers} from 'redux';

import device from './device';
import aqi from './aqi';
import insight from './insight';
import complaint from './complaint';

const reducer = combineReducers({
  device: device,
  aqi: aqi,
  insight: insight,
  complaint: complaint,
});

export default reducer;
