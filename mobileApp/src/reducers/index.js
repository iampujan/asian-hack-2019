import {combineReducers} from 'redux';

import device from './device';
import aqi from './aqi';
import insight from './insight';

const reducer = combineReducers({
  device: device,
  aqi: aqi,
  insight: insight,
});

export default reducer;
