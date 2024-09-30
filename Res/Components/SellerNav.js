import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../res/config/colors';
import SellerTabNav from './SellerTabNav';
import JobDetail from '../Screens/Seller/JobDetail';
import AddProposal from '../Screens/Seller/AddProposal';
import SellerGigsDetail from '../Screens/Seller/SellerGigsDetail';
import SellerGigs from '../Screens/Seller/SellerGigs';
import MyJobs from '../Screens/Seller/MyJobs';
import AllGigsDetail from '../Screens/Seller/AllGigsDetail';
import SellerChat from '../Screens/Seller/SellerChat';
import UserChat from '../Screens/Seller/UserChat';
import {useSelector} from 'react-redux';

const SellerNav = () => {
  const myTitle = useSelector(state => state.UserName.UserName);
  console.log('my title', myTitle);
  const Stack = createNativeStackNavigator();
  // const myTitle = 'Cheema';
  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'Profile':
        return 'Profile';
      case 'AddGig':
        return 'Create Gig';
      case 'AllGigs':
        return 'Gigs';
      //   case 'Gigs':
      //     return 'Gigs';
    }
  }
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={SellerTabNav}
        options={({route}) => ({
          headerTitle: getHeaderTitle(route),
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        })}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetail}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'Job Details',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <Stack.Screen
        name="AddProposal"
        component={AddProposal}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'Add Proposal',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <Stack.Screen
        name="SellerGigsDetail"
        component={SellerGigsDetail}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'Gig Details',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <Stack.Screen
        name="SellerGigs"
        component={SellerGigs}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'My Gigs',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <Stack.Screen
        name="My Jobs"
        component={MyJobs}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'My Jobs',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <Stack.Screen
        name="AllGigsDetail"
        component={AllGigsDetail}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'Gig Details',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <Stack.Screen
        name="SellerChat"
        component={SellerChat}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'Chat',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <Stack.Screen
        name="UserChat"
        component={UserChat}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: myTitle ? myTitle : 'User Chat',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default SellerNav;
