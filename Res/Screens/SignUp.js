import React, {useEffect, useState} from 'react';
import {
  Box,
  Icon,
  Image,
  Input,
  Link,
  ScrollView,
  Select,
  Text,
} from 'native-base';
import colors from '../res/config/colors';
import AppButton from '../Components/AppButton';
import Icons from '../res/icons/icon';
import {SignUpAction} from '../Redux/Actions';
import {useDispatch, useSelector} from 'react-redux';
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhone] = useState();
  const [userType, setUserType] = useState();
  const dispatch = useDispatch();
  const user = useSelector(state => state.registerUser.users);
  const [isloading, setIsloading] = useState(false);

  const Submit = async () => {
    if (email === undefined) {
      alert('Email is required');
    } else if (password === undefined) {
      alert('Password is required');
    } else if (firstName === undefined) {
      alert('First Name is required');
    } else if (lastName === undefined) {
      alert('Last Name is required');
    } else if (userType === undefined) {
      alert('User Type is required');
    } else if (phoneNumber === undefined) {
      alert('Phone is required');
    } else if (password !== confirmpassword) {
      alert('Password not match');
    } else {
      setIsloading(true);
      console.log(email, password, firstName, lastName, userType, phoneNumber);
      const data = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userType: userType,
        phoneNumber: phoneNumber,
      });
      await dispatch(SignUpAction(data));
      setIsloading(false);
      console.log('sign up return', user);
      navigation.navigate('Login');
    }
  };
  return (
    <Box style={{height: '100%', width: '100%'}}>
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
      <ScrollView
        height="100%"
        width="100%"
        backgroundColor={colors.primary}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        borderTopLeftRadius="38px"
        borderTopRightRadius="38px">
        <Text
          fontSize="50px"
          fontFamily="Poppins-Regular"
          color={colors.white}
          textAlign="center">
          Sign Up
        </Text>
        <Input
          placeholder="First Name"
          value={firstName}
          onChangeText={value => setFirstName(value)}
          autoFocus
          focusOutlineColor={colors.logoColor}
          backgroundColor={colors.white}
          borderRadius="8px"
          height="45px"
          marginTop="21px"
          width="72%"
          fontSize="md"
          fontFamily="Poppins-Regular"
        />
        <Input
          placeholder="Last Name"
          backgroundColor={colors.white}
          value={lastName}
          onChangeText={value => setLastName(value)}
          focusOutlineColor={colors.logoColor}
          borderRadius="8px"
          height="45px"
          marginTop="21px"
          width="72%"
          fontSize="md"
          fontFamily="Poppins-Regular"
        />
        <Input
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
          placeholder="Phone Number"
          keyboardType="number-pad"
          backgroundColor={colors.white}
          value={phoneNumber}
          onChangeText={value => setPhone(value)}
          focusOutlineColor={colors.logoColor}
          borderRadius="8px"
          height="45px"
          marginTop="21px"
          width="72%"
          fontSize="md"
          fontFamily="Poppins-Regular"
        />
        <Select
          selectedValue={userType}
          onValueChange={Value => setUserType(Value)}
          accessibilityLabel="Choose User Type"
          placeholder="Choose User Type"
          dropdownIcon={<Icon as={Icons} name="chevron-down" size="lg" />}
          borderRadius="8px"
          height="45px"
          width="72%"
          marginTop="21px"
          backgroundColor={colors.white}
          alignSelf="center"
          fontSize="md"
          fontFamily="Poppins-Regular">
          <Select.Item label="Buyer" value="buyer" />
          <Select.Item label="Seller" value="seller" />
        </Select>
        <Input
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
        <Input
          placeholder="Confirm Password"
          secureTextEntry
          backgroundColor={colors.white}
          value={confirmpassword}
          onChangeText={value => setConfirmPassword(value)}
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
          isLoadingText="Signing Up"
          TextColor={colors.white}
          title="SignUp"
          width="72%"
          color={colors.secondary}
          onPress={Submit}
        />
        <Box flexDirection="row">
          <Text
            color={colors.white}
            fontSize="md"
            fontFamily="Poppins-Regular"
            marginTop="10px">
            Already have an account?
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
              navigation.navigate('Login');
            }}>
            Login
          </Link>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SignUp;
