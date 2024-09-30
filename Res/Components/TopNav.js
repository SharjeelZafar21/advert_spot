import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ActiveJobs from '../Screens/Seller/ActiveJobs';
import CompletedJobs from '../Screens/Seller/CompletedJobs';
import MyAllJobs from '../Screens/Seller/MyAllJobs';
import {NavigationContainer} from '@react-navigation/native';

const TopNav = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Active Jobs" component={ActiveJobs} />
      <Tab.Screen name="Completed Jobs" component={CompletedJobs} />
      <Tab.Screen name="My All Jobs" component={MyAllJobs} />
    </Tab.Navigator>
  );
};

export default TopNav;
