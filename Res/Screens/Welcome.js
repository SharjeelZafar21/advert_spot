import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Box, Button, Text} from 'native-base';
import colors from '../res/config/colors';
import AppButton from '../Components/AppButton';

const Welcome = ({navigation}) => {
  return (
    <Box>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require('../res/icons/Logo.png')}
        />
        <Text
          fontFamily="body"
          fontSize="30px"
          color={colors.white}
          textAlign="center"
          style={styles.heading}>
          Welcome!
        </Text>
      </View>

      <View style={styles.button_container}>
        <Text style={styles.ortext}>Sign Up to Create new Account</Text>
        <AppButton
          TextColor={colors.white}
          title="Sign Up"
          width="72%"
          color={colors.primary}
          onPress={() => navigation.navigate('SignUp')}
        />
        <Text style={styles.ortext}>Or</Text>
        <AppButton
          TextColor={colors.white}
          title="Log In"
          width="72%"
          color={colors.primary}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </Box>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: '30%',
    width: '100%',
    borderBottomEndRadius: 104,
  },
  logo: {
    height: '65%',
    width: '50%',
    alignSelf: 'center',
    marginTop: 27,
  },
  heading: {
    fontSize: 30,
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  button_container: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ortext: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    color: colors.black,
    fontFamily: 'Poppins-Regular',
  },
});
