import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  registerDevice,
  updateSubscribedStations,
  updateStations,
  updateRealtimeData,
} from '../actions';

import {
  fetchStationsData,
  fetchRealtimeData,
  saveDeviceData,
  subscribeToStation,
  unsubscribeToStation,
} from '../utils/makeRequest';
import {getAqiColor} from '../utils/common';

class Home extends Component {
  componentDidMount() {
    const {insight, registerDevice} = this.props;
    const deviceId = DeviceInfo.getUniqueID();
    registerDevice({
      deviceId,
      fcmToken: 'data',
    });
    saveDeviceData({
      deviceId,
      fcmToken: 'data',
    });
    if (insight.stations.length === 0) {
      fetchStationsData(this.updateStationsData);
    }
    fetchRealtimeData(this.updateRealtimeData);
  }

  updateStationsData = stations => {
    this.props.updateStations(stations);
  };

  updateRealtimeData = realtimeData => {
    this.props.updateRealtimeData(realtimeData);
  };

  alertToSubscribe = (key, name) => {
    Alert.alert(
      'Are you sure?',
      `Subscribe to ${name}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.subscribeToStation(key)},
      ],
      {cancelable: true},
    );
  };

  subscribeToStation = station => {
    const {
      updateSubscribedStations,
      aqi: {subscribedStations},
      device: {deviceId},
    } = this.props;
    if (subscribedStations.indexOf(station) === -1) {
      const updatedSubscribedStations = [...subscribedStations, station];
      updateSubscribedStations(updatedSubscribedStations);
      subscribeToStation({
        deviceId,
        station,
      });
    }
  };

  alertToUnSubscribe = (key, name) => {
    Alert.alert(
      'Are you sure?',
      `UnSubscribe to ${name}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.unsubscribeToStation(key)},
      ],
      {cancelable: true},
    );
  };

  unsubscribeToStation = station => {
    const {
      updateSubscribedStations,
      aqi: {subscribedStations},
      device: {deviceId},
    } = this.props;
    if (subscribedStations.indexOf(station) > -1) {
      const updatedSubscribedStations = subscribedStations.filter(
        st => st !== station,
      );
      updateSubscribedStations(updatedSubscribedStations);
      unsubscribeToStation({
        deviceId,
        station,
      });
    }
  };

  isUserSubscribed = key => {
    const {subscribedStations} = this.props.aqi;
    if (subscribedStations.indexOf(key) > -1) {
      return true;
    }
    return false;
  };

  render() {
    const {
      aqi: {realtime},
    } = this.props;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={[styles.rowContainer]}>
          <Text style={{fontWeight: '600', fontSize: 18}}>STATION</Text>
          <Text style={{fontWeight: '600', fontSize: 18}}>AQI</Text>
        </View>
        {realtime
          .sort((a, b) => b.value - a.value)
          .map(station => (
            <View
              key={station.key}
              style={[
                styles.rowContainer,
                {
                  backgroundColor: getAqiColor(station.value),
                },
              ]}>
              <Text style={{color: '#fff'}}>{station.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#fff', fontWeight: '700'}}>
                  {station.value}
                </Text>
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() =>
                    this.isUserSubscribed(station.key)
                      ? this.alertToUnSubscribe(station.key, station.name)
                      : this.alertToSubscribe(station.key, station.name)
                  }>
                  {this.isUserSubscribed(station.key) ? (
                    <Icon name="check-circle" size={20} color="#ccc" />
                  ) : (
                    <Icon name="plus-circle" size={20} color="#ccc" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    aqi: state.aqi,
    insight: state.insight,
    device: state.device,
  };
};

export default connect(
  mapStateToProps,
  {
    registerDevice,
    updateSubscribedStations,
    updateStations,
    updateRealtimeData,
  },
)(Home);
