import React, {Component} from 'react';
import {Text, View, Button, Picker, ActivityIndicator} from 'react-native';
import {LineChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';
import {connect} from 'react-redux';

import {fetchStationPMData} from '../utils/makeRequest';
import {updateStationPMData} from '../actions';

class Insight extends Component {
  state = {
    dataset: 1,
    selectedStation: null,
  };

  componentDidMount() {
    const {
      insight: {stations},
    } = this.props;
    if (stations && stations.length > 0) {
      this.setState({selectedStation: stations[0]}, () => {
        this.fetchStationsPmData();
      });
    }
  }

  changeData = value => {
    this.setState({selectedStation: value}, () => {
      this.fetchStationsPmData();
    });
  };

  fetchStationsPmData = () => {
    const {
      insight: {stationsPmData},
    } = this.props;
    const {selectedStation} = this.state;
    const selectedStationLineData = stationsPmData[selectedStation];
    if (!selectedStationLineData) {
      fetchStationPMData(selectedStation, this.updateStationsPmData);
    }
  };

  mapDataToLineChart = (rawData, key) => {
    const mappedData = rawData.map(d => d[key]);
    return mappedData;
  };

  updateStationsPmData = (station, pmData) => {
    this.props.updateStationPMData(station, pmData);
  };

  render() {
    const {
      insight: {stations, stationsPmData},
    } = this.props;
    const {selectedStation} = this.state;
    const contentInset = {top: 20, bottom: 20};
    const data = {
      1: [50, 10, 40, 95, 85],
      2: [10, 20, 10, 55, 65],
      3: [56, 89, 23, 43, 89],
    };
    if (stations.length === 0 || selectedStation === null) {
      return <ActivityIndicator size="large" />;
    }
    const selectedStationLineData = stationsPmData[selectedStation];
    console.log(selectedStationLineData);
    return (
      <View style={{padding: 10}}>
        <View style={{borderBottomColor: '#ddd', borderBottomWidth: 1}}>
          <Text>Select station</Text>
          <Picker
            selectedValue={selectedStation}
            style={{
              height: 50,
              width: '100%',
            }}
            onValueChange={this.changeData}>
            {stations.map(station => (
              <Picker.Item label={station} value={station} key={station} />
            ))}
          </Picker>
        </View>
        {selectedStationLineData ? (
          <View style={{height: 200, flexDirection: 'row'}}>
            <YAxis
              data={this.mapDataToLineChart(selectedStationLineData, 'value')}
              contentInset={contentInset}
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              numberOfTicks={10}
            />
            <LineChart
              style={{flex: 1, marginLeft: 16}}
              data={this.mapDataToLineChart(selectedStationLineData, 'value')}
              svg={{stroke: 'rgb(134, 65, 244)'}}
              contentInset={{top: 20, bottom: 20}}>
              <Grid />
            </LineChart>
            <XAxis
              style={{marginHorizontal: -10}}
              data={this.mapDataToLineChart(selectedStationLineData, 'value')}
              formatLabel={(value, index) => {
                return `${index}\n`;
              }}
              contentInset={{left: 115, right: -37}}
              svg={{fill: 'red', fontSize: 10, rotation: 20, originY: 30, y: 5}}
            />
          </View>
        ) : (
          <View style={{height: 200, justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    insight: state.insight,
  };
};

export default connect(
  mapStateToProps,
  {updateStationPMData},
)(Insight);
