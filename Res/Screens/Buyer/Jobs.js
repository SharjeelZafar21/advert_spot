import {
  Box,
  Button,
  // FlatList,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../Components/AppButton';
import JobCard from '../../Components/JobCard';
import {userJobAction} from '../../Redux/Actions';
import colors from '../../res/config/colors';
import font from '../../res/config/font';

const Jobs = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const userJobData = useSelector(state => state.userJob.userjob);
  const dispatch = useDispatch();
  console.log('user job in jobs', userJobData);
  useEffect(() => {
    dispatch(userJobAction());
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(userJobAction());
    setRefreshing(false);
  };
  const JobCard = ({item}) => {
    return (
      <VStack
        backgroundColor={colors.white}
        // h="184px"
        w="90%"
        shadow="5"
        margin="10px"
        borderRadius="lg"
        alignSelf="center">
        <HStack margin="10px" justifyContent="space-between">
          <Heading w="65%" fontFamily={font.primary}>
            {item.Title}
          </Heading>
          <Text color={colors.green} fontSize="2xl" fontFamily={font.primary}>
            {item.Budget} PKR
          </Text>
        </HStack>
        <HStack
          marginLeft="10px"
          marginRight="10px"
          justifyContent="space-between">
          <Heading size="md">
            Quantity:<Text fontWeight="light">{item.Quantity}</Text>
          </Heading>
          <Heading size="md">
            Status:<Text fontWeight="light">{item.Status}</Text>
          </Heading>
        </HStack>
        <HStack margin="20px" justifyContent="space-between">
          <AppButton
            onPress={() => {
              navigation.navigate('UserJobDetail', {UserJobId: item._id});
            }}
            title="View"
            color={colors.primary}
            TextColor={colors.white}
            width="35%"
          />
          <AppButton
            width="45%"
            title={`Proposals`}
            variant="outline"
            borderColor={colors.logoColor}
            TextColor={colors.primary}
            colorScheme="purple"
            onPress={() => {
              navigation.navigate('ProposalList', {UserJobId: item._id});
            }}
          />
        </HStack>
      </VStack>
    );
  };
  return (
    <Box h="100%">
      <Heading size="2xl" margin="20px" fontFamily={font.primary}>
        Jobs
      </Heading>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={item => item._id}
        data={userJobData}
        renderItem={JobCard}
      />
    </Box>
  );
};

export default Jobs;
