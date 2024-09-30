import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import ChildCard from '../../Components/ChildCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../res/config/colors';
import Icons from '../../res/icons/icon';
import {LoginAction, profileData} from '../../Redux/Actions';
import {actionTypes} from '../../Redux/Action-type';

const SellerProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userProfile.profile);
  const logOut = async () => {
    const token = await AsyncStorage.removeItem('token');
    // dispatch(LoginAction());
    dispatch({type: actionTypes.LOGIN, payload: null});
    dispatch({type: actionTypes.PROFILEDATA, payload: null});
    console.log('token after remove', token);
  };
  return (
    <Box height="100%">
      <Box height="25%" justifyContent="center" alignItems="center">
        <Icon as={Icons} name="person-sharp" size="6xl" />
      </Box>
      <ScrollView height="65%">
        <VStack
          backgroundColor={colors.white}
          width="90%"
          alignSelf="center"
          borderRadius="md">
          <HStack
            width="95%"
            alignSelf="center"
            marginTop="16px"
            marginBottom={5}>
            <VStack marginLeft="10px">
              <Heading size="md">
                {userData?.firstName} {userData?.lastName}
              </Heading>
              <Text>{userData?.email}</Text>
            </VStack>
          </HStack>
          <ChildCard
            onPress={() => {
              navigation.navigate('Home');
            }}
            IconName="briefcase-sharp"
            HeadingName="All Jobs"
          />
          <Divider my="4" width="90%" alignSelf="center" />
          <ChildCard
            onPress={() => {
              navigation.navigate('SellerGigs');
            }}
            IconName="list"
            HeadingName="My Gigs"
          />
          <Divider my="4" width="90%" alignSelf="center" />
          <ChildCard
            onPress={() => {
              navigation.navigate('My Jobs');
            }}
            IconName="briefcase"
            HeadingName="My Jobs"
          />
          <Divider my="4" width="90%" alignSelf="center" />
          <ChildCard
            onPress={() => {
              navigation.navigate('AddGig');
            }}
            IconName="create"
            HeadingName="Add Gigs"
          />
        </VStack>
        <VStack
          backgroundColor={colors.white}
          width="90%"
          alignSelf="center"
          marginTop="30px"
          marginBottom="15px"
          borderRadius="md">
          <ChildCard
            onPress={() => {
              navigation.navigate('SellerChat');
            }}
            IconName="chatbox-ellipses"
            HeadingName="Messages"
          />
          <Divider my="4" width="90%" alignSelf="center" />
          <ChildCard
            onPress={logOut}
            IconName="log-out"
            HeadingName="Sign Out"
          />
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default SellerProfile;
