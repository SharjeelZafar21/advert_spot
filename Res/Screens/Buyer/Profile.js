import React from 'react';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import colors from '../../res/config/colors';
import Icons from 'react-native-vector-icons/Ionicons';
import ChildCard from '../../Components/ChildCard';
import {LoginAction, LogOutAction, profileData} from '../../Redux/Actions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {actionTypes} from '../../Redux/Action-type';
import JobPost from './JobPost';
import Jobs from './Jobs';
import Gigs from './Gigs';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userProfile.profile);
  const token = useSelector(state => state.Logout.token);

  const logOut = async () => {
    const token = await AsyncStorage.removeItem('token');
    // dispatch(LoginAction());
    console.log('token after remove', token);
    dispatch({type: actionTypes.PROFILEDATA, payload: null});
    dispatch({type: actionTypes.LOGIN, payload: null});
    // navigation.navigate('User Empty');
  };

  return (
    <Box height="100%">
      <Box height="35%" justifyContent="center" alignItems="center">
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
                {userData.firstName} {userData.lastName}
              </Heading>
              <Text>{userData.email}</Text>
            </VStack>
          </HStack>
          <ChildCard
            onPress={() => {
              navigation.navigate('JobPost');
            }}
            IconName="create"
            HeadingName="Add Job"
          />
          <Divider my="4" width="90%" alignSelf="center" />
          <ChildCard
            onPress={() => {
              navigation.navigate('Jobs');
            }}
            IconName="briefcase"
            HeadingName="My Jobs"
          />
          <Divider my="4" width="90%" alignSelf="center" />
          <ChildCard
            onPress={() => {
              navigation.navigate('Job Orders');
            }}
            IconName="briefcase"
            HeadingName="Job Orders"
          />
          <Divider my="4" width="90%" alignSelf="center" />
          <ChildCard
            onPress={() => {
              navigation.navigate('Gigs');
            }}
            IconName="list"
            HeadingName="All Gigs"
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
              navigation.navigate('BuyerChat');
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

export default Profile;
