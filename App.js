import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import colors from './Res/res/config/colors';
import Navigation from './Res/Components/Navigation';
import Welcome from './Res/Screens/Welcome';
import SignUp from './Res/Screens/SignUp';
import Login from './Res/Screens/Login';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './Res/Redux/Store';
import {profileData} from './Res/Redux/Actions';
import SellerNav from './Res/Components/SellerNav';
import {StripeProvider} from '@stripe/stripe-react-native';

const AppWrapper = () => {
  const STRIPE_KEY =
    'pk_test_51MrI82AmbpoZqKjE6t7WDa5x03C01SzQyJ7ncERRkwau7n5J1txbsYUVIyBrPewucTvAwm7wGoE0AHDbvB9P0Jeu00tYDQ24TU';

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <App />
      </StripeProvider>
    </Provider>
  );
};
const App = () => {
  // const [token, setToken] = useState();
  const Stack = createNativeStackNavigator();
  const user = useSelector(state => state.userProfile.profile);
  const token = useSelector(state => state.userStatus.user?.accessToken);
  const dispatch = useDispatch();
  console.log('user in app.js', user);
  console.log('token in app.js', token);
  // const Auth = async () => {
  //   const tokenData = await AsyncStorage.getItem('token');
  //   setToken(tokenData);
  //   console.log('token in App', tokenData);
  // };

  useEffect(() => {
    dispatch(profileData());
    // Auth();
    // token;
    user;
  }, []);
  // console.log('token state in app', token);

  if (!token && !user) {
    return (
      <NativeBaseProvider>
        <StatusBar backgroundColor={colors.primary} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            {/* <Stack.Screen
              name="Empty"
              component={Empty}
              options={{headerShown: false}}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider>
        <StatusBar backgroundColor={colors.primary} />
        <NavigationContainer>
          {user?.userTypes == 'buyer' ? <Navigation /> : <SellerNav />}
          {/* <Stack.Navigator initialRouteName="Empty">
            <Stack.Screen
              name="Empty"
              component={Empty}
              options={{headerShown: false}}
            />
          </Stack.Navigator> */}
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
};

export default AppWrapper;
