import React, {Component} from 'react';
import {
  Text,
  View,
  Picker,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {LineChart, Grid, YAxis} from 'react-native-svg-charts';
import {connect} from 'react-redux';

import {fetchStationPMData, fetchAllLocationPmData} from '../utils/makeRequest';
import {updateStationPMData, updateInsightBarChartData} from '../actions';
import {getAqiColor, separateNameForDisplay} from '../utils/common';

class Insight extends Component {
  state = {
    dataset: 1,
    selectedStation: null,
    loadingBarChartData: false,
  };

  componentDidMount() {
    const {
      insight: {stations, stationsAverageData},
    } = this.props;
    if (stations && stations.length > 0) {
      this.setState({selectedStation: stations[0]}, () => {
        this.fetchStationsPmData();
      });
    }
    if (stationsAverageData.length === 0) {
      this.setState({loadingBarChartData: true}, () => {
        fetchAllLocationPmData(this.updateBarChartData);
      });
    }
  }

  updateBarChartData = data => {
    this.props.updateInsightBarChartData(data);
    this.setState({loadingBarChartData: false});
  };

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
    this.setState({selectedStation: station});
  };

  render() {
    const {
      insight: {stations, stationsPmData, stationsAverageData},
    } = this.props;
    const {selectedStation, loadingBarChartData} = this.state;
    const contentInset = {top: 20, bottom: 20};
    if (stations.length === 0 || selectedStation === null) {
      return <ActivityIndicator size="large" />;
    }
    const selectedStationLineData = stationsPmData[selectedStation];
    return (
      <ScrollView>
        <View style={[styles.rowContainer]}>
          <Text style={{fontWeight: '600', fontSize: 18}}>
            Single station PM2.5 line chart
          </Text>
        </View>
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
                numberOfTicks={8}
              />
              <LineChart
                style={{flex: 1, marginLeft: 16}}
                data={this.mapDataToLineChart(selectedStationLineData, 'value')}
                svg={{stroke: 'rgb(134, 65, 244)'}}
                contentInset={{top: 20, bottom: 20}}>
                <Grid />
              </LineChart>
            </View>
          ) : (
            <View style={{height: 200, justifyContent: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
        <View style={[styles.rowContainer]}>
          <Text style={{fontWeight: '600', fontSize: 18}}>
            Stations PM2.5 bar chart
          </Text>
        </View>
        <View style={{padding: 10}}>
          {loadingBarChartData || stationsAverageData.length === 0 ? (
            <View style={{height: 200, justifyContent: 'center'}}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View>
              {stationsAverageData
                .sort((a, b) => b.value - a.value)
                .map(station => (
                  <View
                    key={station.location}
                    style={[
                      styles.rowContainer,
                      {
                        backgroundColor: getAqiColor(station.value),
                      },
                    ]}>
                    <Text style={{color: '#fff'}}>
                      {separateNameForDisplay(station.location)}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#fff', fontWeight: '700'}}>
                        {station.value.toFixed(2)} μg/m3
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => {
  return {
    insight: state.insight,
  };
};

export default connect(
  mapStateToProps,
  {updateStationPMData, updateInsightBarChartData},
)(Insight);
