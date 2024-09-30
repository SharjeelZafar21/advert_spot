import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import SellerHome from '../Screens/Seller/SellerHome';
import AddGig from '../Screens/Seller/AddGig';
import AddProposal from '../Screens/Seller/AddProposal';
import SellerProfile from '../Screens/Seller/SellerProfile';
import colors from '../res/config/colors';
import Icons from '../res/icons/icon';
import SellerGigs from '../Screens/Seller/SellerGigs';
import Gigs from '../Screens/Buyer/Gigs';
import AllGigs from '../Screens/Seller/AllGigs';

const SellerTabNav = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="SellerHome"
      barStyle={{backgroundColor: colors.white}}
      activeColor={colors.primary}
      backBehavior="history">
      <Tab.Screen
        name="Home"
        component={SellerHome}
        options={({route}) => ({
          title: 'Home',
          tabBarIcon: ({color}) => (
            <Icons name="home-outline" color={color} size={25} />
          ),
        })}
      />
      <Tab.Screen
        name="AddGig"
        component={AddGig}
        options={{
          tabBarIcon: ({color}) => (
            <Icons name="create-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="AllGigs"
        component={AllGigs}
        options={{
          tabBarIcon: ({color}) => (
            <Icons name="list-outline" color={color} size={25} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Gigs"
        component={Gigs}
        options={{
          tabBarIcon: ({color}) => (
            <Icons name="list-outline" color={color} size={25} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={SellerProfile}
        options={{
          tabBarIcon: ({color}) => (
            <Icons name="person-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SellerTabNav;
