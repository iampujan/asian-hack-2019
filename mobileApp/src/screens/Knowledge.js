import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import {getAqiColor} from '../utils/common';

const sampleAqiScheme = [
  {
    name: 'Good',
    value: 1,
    range: '0 - 50',
  },
  {
    name: 'Moderate',
    value: 51,
    range: '51 - 100',
  },
  {
    name: 'Unhealthy for sensitive groups',
    value: 101,
    range: '101 - 150',
  },
  {
    name: 'Unhealthy',
    value: 151,
    range: '151 - 200',
  },
  {
    name: 'Very unhealthy',
    value: 201,
    range: '201 - 300',
  },
  {
    name: 'Hazardous',
    value: 301,
    range: '301 - 500',
  },
];

class Knowledge extends Component {
  render() {
    return (
      <ScrollView style={{flex: 1, padding: 5, height: '100%'}}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>
            PM stands for “Particulate Matter” which refers to the mixture of
            solid particles and liquid droplets found in the air.
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>
            PM2.5 represents those air particles which have the size of 2.5
            micrometer which are really harmful to the human body.
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitleText}>
            Air Quality Index (AQI) color scheme
          </Text>
          <View style={{padding: 10}}>
            {sampleAqiScheme.map(sample => (
              <View
                style={[
                  styles.rowContainer,
                  {
                    backgroundColor: getAqiColor(sample.value),
                  },
                ]}>
                <Text style={{color: '#fff'}}>{sample.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#fff', fontWeight: '700'}}>
                    {sample.range}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitleText}>
            Ways To Mitigate Air Pollution :
          </Text>
          <View style={{paddingLeft: 10}}>
            <Text>
              » Using public transportation helps a lot in reducing air
              pollution.
            </Text>
            <Text>
              » Give more emphasis to renewable source of energy rather than
              fossil fuels.
            </Text>
            <Text>
              » Always try to reuse and recycle things rather than burning them.
            </Text>
            <Text>
              » Reduce the use of automobiles and perform regular servicing of
              your automobiles.
            </Text>
            <Text>
              » Do remember to turn off the AC when not in use since they too
              produce ‘CFC’ which causes air pollution.
            </Text>
            <Text>
              » Walk ,bike or use public transportation for travelling short
              distances.
            </Text>
            <Text>
              » Always prefer local and organic food and never use chemical
              fertilizers.
            </Text>
            <Text>
              » Plant trees when you can, it is good for you, your family and
              the earth.
            </Text>
            <Text>
              » It’s always a good idea to use mask while going outdoors.
            </Text>
            <Text>
              » Air purifiers can help you and your family breath fresh air.
            </Text>
            <Text>» Always keep your house dust free.</Text>
            <Text>
              » Use essential natural oils instead of other synthetic room
              freshners.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    shadowColor: '#d9d9d9',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
  },
  cardText: {
    fontSize: 15,
  },
  cardTitleText: {
    fontSize: 18,
    fontWeight: '700',
  },
  rowContainer: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Knowledge;
