import {combineReducers} from 'redux';

import device from './device';
import aqi from './aqi';

const reducer = combineReducers({
  device: device,
  aqi: aqi,
});

export default reducer;
