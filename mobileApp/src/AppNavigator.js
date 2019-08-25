import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './screens/Home';
import Knowledge from './screens/Knowledge';
import Complaint from './screens/Complaint';
import Insight from './screens/Insight';

import AddComplaint from './screens/AddComplaint';

const ComplaintStack = createStackNavigator(
  {
    Complaint: Complaint,
    AddComplaint: AddComplaint,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Knowledge: Knowledge,
    Insight: Insight,
    Complaint: ComplaintStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Knowledge') {
          iconName = 'info';
        } else if (routeName === 'Complaint') {
          iconName = 'exclamation';
        } else if (routeName === 'Insight') {
          iconName = 'line-chart';
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

export default createAppContainer(AppNavigator);
