import {Box, Heading, HStack, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../Components/AppButton';
import JobCard from '../../Components/JobCard';
import {JobAction} from '../../Redux/Actions';
import colors from '../../res/config/colors';
import font from '../../res/config/font';

const SellerHome = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const AllJobData = useSelector(state => state.alljobs.alljob);
  const dispatch = useDispatch();
  console.log('all jobs', AllJobData?.jobs);
  useEffect(() => {
    dispatch(JobAction());
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(JobAction());
    setRefreshing(false);
  };
  const AllJobCard = ({item}) => {
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
            ${item.Budget}
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
              navigation.navigate('JobDetail', {
                JobsId: item._id,
                Userid: item.UserId,
              });
            }}
            title="View"
            // variant="subtle"
            // colorScheme="secondary"
            color={colors.primary}
            TextColor={colors.white}
            width="35%"
          />
          <AppButton
            onPress={() => {
              navigation.navigate('AddProposal', {JobsId: item._id});
            }}
            // margin="20px"
            width="55%"
            title="Send Proposal"
            variant="outline"
            // color={colors.white}
            borderColor={colors.logoColor}
            TextColor={colors.primary}
            colorScheme="purple"
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
        data={AllJobData?.jobs}
        renderItem={AllJobCard}
      />
    </Box>
  );
};

export default SellerHome;
