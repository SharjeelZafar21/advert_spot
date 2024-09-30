import React, {useState} from 'react';
import {Box, Button, Image, Input, Link, Text} from 'native-base';
import colors from '../res/config/colors';
import AppButton from '../Components/AppButton';
import {LoginAction, profileData} from '../Redux/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  // const user = useSelector(state => state.userProfile.profile);

  const Submit = async () => {
    if (email === undefined) {
      alert('Email is required');
    } else if (password === undefined) {
      alert('Password is required');
    } else {
      setIsloading(true);
      console.log(email, password);
      const data = JSON.stringify({
        email: email,
        password: password,
      });
      await dispatch(LoginAction(data));
      // dispatch(profileData());
      // navigation.navigate('Empty');
      setIsloading(false);
    }
  };
  return (
    <Box>
      <Box height="22%" width="100%">
        <Image
          resizeMode="contain"
          height="90%"
          width="50%"
          alignSelf="center"
          marginTop="15px"
          source={require('../res/icons/ColoredLogo.png')}
          alt="Image"
        />
      </Box>
      <Box
        height="78%"
        width="100%"
        backgroundColor={colors.primary}
        alignItems="center"
        justifyContent="center"
        borderTopLeftRadius="38px"
        borderTopRightRadius="38px">
        <Text
          fontSize="50px"
          fontFamily="Poppins-Regular"
          color={colors.white}
          textAlign="center">
          Login
        </Text>
        <Input
          autoCapitalize="none"
          autoFocus
          placeholder="Email"
          keyboardType="email-address"
          backgroundColor={colors.white}
          value={email}
          onChangeText={value => setEmail(value)}
          focusOutlineColor={colors.logoColor}
          borderRadius="8px"
          height="45px"
          marginTop="21px"
          width="72%"
          fontSize="md"
          fontFamily="Poppins-Regular"
        />
        <Input
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          backgroundColor={colors.white}
          value={password}
          onChangeText={value => setPassword(value)}
          focusOutlineColor={colors.logoColor}
          borderRadius="8px"
          height="45px"
          marginTop="21px"
          width="72%"
          fontSize="md"
          fontFamily="Poppins-Regular"
        />
        <AppButton
          isLoading={isloading}
          isLoadingText="Signing In"
          title="Login"
          width="72%"
          TextColor={colors.white}
          color={colors.secondary}
          onPress={Submit}
        />
        <Link
          // alignSelf="flex-end"
          // marginRight="60px"
          isExternal
          _text={{
            color: colors.white,
            fontSize: 'md',
            marginTop: '9px',
            fontFamily: 'Poppins-Regular',
          }}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          Forgot Password
        </Link>
        <Box flexDirection="row">
          <Text
            color={colors.white}
            fontSize="md"
            marginTop="10px"
            fontFamily="Poppins-Regular">
            Are you a new user?
          </Text>
          <Link
            isExternal
            _text={{
              color: colors.white,
              fontSize: 'md',
              marginTop: '9px',
              marginLeft: '2px',
              fontFamily: 'Poppins-Regular',
            }}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            Register here
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
