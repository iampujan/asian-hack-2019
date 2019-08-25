export const getAqiColor = aqiValue => {
  let aqiColor = '';
  if (aqiValue > 0) {
    aqiColor = 'green';
  }
  if (aqiValue > 50) {
    aqiColor = 'yellow';
  }
  if (aqiValue > 100) {
    aqiColor = 'orange';
  }
  if (aqiValue > 150) {
    aqiColor = 'red';
  }
  if (aqiValue > 200) {
    aqiColor = 'purple';
  }
  if (aqiValue > 300) {
    aqiColor = 'maroon';
  }
  return aqiColor;
};

export const separateNameForDisplay = name => {
  return name
    .split('-')
    .map(n => {
      n = n[0].toUpperCase() + n.slice(1);
      return n;
    })
    .join(' ');
};
