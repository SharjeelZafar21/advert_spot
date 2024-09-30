import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../res/config/colors';
import TabNavigation from './TabNavigation';
import GigsDetail from '../Screens/Buyer/GigsDetail';
import UserJobDetail from '../Screens/Buyer/UserJobDetail';
import ProposalList from '../Screens/Buyer/ProposalList';
import ProposalDetail from '../Screens/Buyer/ProposalDetail';
import BuyerChat from '../Screens/Buyer/BuyerChat';
import BUserChat from '../Screens/Buyer/BUserChat';
import JobOrders from '../Screens/Buyer/JobOrders';
import {useSelector} from 'react-redux';

const Navigation = () => {
  const myTitle = useSelector(state => state.UserName.UserName);
  const Stack = createNativeStackNavigator();
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
      case 'JobPost':
        return 'Job Post';
      case 'Jobs':
        return 'Jobs';
      case 'Gigs':
        return 'Gigs';
    }
  }

  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen
        name="Tab"
        component={TabNavigation}
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
        name="GigsDetail"
        component={GigsDetail}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'Freelancer Profile',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <Stack.Screen
        name="UserJobDetail"
        component={UserJobDetail}
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
        name="ProposalList"
        component={ProposalList}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'Proposals',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <Stack.Screen
        name="ProposalDetail"
        component={ProposalDetail}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'Proposal Details',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'Poppins-Regular',
          },
        }}
      />
      <Stack.Screen
        name="BuyerChat"
        component={BuyerChat}
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
        name="BUserChat"
        component={BUserChat}
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
      <Stack.Screen
        name="Job Orders"
        component={JobOrders}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: colors.white,
          headerTitle: 'Orders',
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

export default Navigation;
