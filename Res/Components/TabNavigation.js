import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../Screens/Buyer/Home';
import Profile from '../Screens/Buyer/Profile';
import colors from '../res/config/colors';
import Icons from 'react-native-vector-icons/Ionicons';
import JobPost from '../Screens/Buyer/JobPost';
import Jobs from '../Screens/Buyer/Jobs';
import Gigs from '../Screens/Buyer/Gigs';

const TabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: colors.white}}
      activeColor={colors.primary}
      backBehavior="history">
      <Tab.Screen
        name="Home"
        component={Home}
        options={({route}) => ({
          title: 'Home',
          tabBarIcon: ({color}) => (
            <Icons name="home-outline" color={color} size={25} />
          ),
        })}
      />
      <Tab.Screen
        name="JobPost"
        component={JobPost}
        options={{
          tabBarIcon: ({color}) => (
            <Icons name="create-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          tabBarIcon: ({color}) => (
            <Icons name="briefcase-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Gigs"
        component={Gigs}
        options={{
          tabBarIcon: ({color}) => (
            <Icons name="list-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Icons name="person-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default TabNavigation;
