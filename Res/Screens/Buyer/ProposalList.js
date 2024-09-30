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
import {userJobAction, userJobProposalsAction} from '../../Redux/Actions';
import colors from '../../res/config/colors';
import font from '../../res/config/font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProposalList = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const userProposalData = useSelector(
    state => state.proposalsList.userjobproposal,
  );
  const dispatch = useDispatch();
  console.log('user proposal in jobs', userProposalData);
  useEffect(() => {
    dispatch(userJobProposalsAction());
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(userJobProposalsAction());
    setRefreshing(false);
  };

  const id = route.params?.UserJobId;
  console.log('id of user job in detail', id);

  module.exports.id = id;
  // const selectedJob = Proposals.find(element => {
  //   return id === element?._id;
  // });

  const JobCard = ({item}) => {
    const handleChat = async id => {
      const tokenData = await AsyncStorage.getItem('token');
      const data = {
        people: [id],
      };
      console.log('id in handle chat', id);
      try {
        const response = await fetch(
          `http://localhost:5000/conversation/get-conversation`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Accept: '/',
              Authorization: `bearer ${tokenData}`,
            },
            body: JSON.stringify(data),
          },
        );
        const result = await response.json();
        console.log('result in action', result.data[0].people);
        navigation.navigate('BUserChat', {
          conversationId: result.data[0]._id,
          receiverId: id,
        });
      } catch (err) {
        console.log(err);
      }
    };
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
            {item.user.firstName} {item.user.lastName}
          </Heading>
          <Text color={colors.green} fontSize="2xl" fontFamily={font.primary}>
            {item.proposal.Amount} PKR
          </Text>
        </HStack>
        {/* <HStack
          marginLeft="10px"
          marginRight="10px"
          justifyContent="space-between">
          <Heading size="md">
            Proposals:<Text fontWeight="light">{item.Proposals}</Text>
          </Heading>
          <Heading size="md">
            Status:<Text fontWeight="light">{item.Status}</Text>
          </Heading>
        </HStack> */}
        <HStack margin="20px" justifyContent="space-between">
          <AppButton
            onPress={() => {
              navigation.navigate('ProposalDetail', {
                ProposalId: item.proposal._id,
              });
            }}
            title="View"
            color={colors.primary}
            TextColor={colors.white}
            width="35%"
          />
          <AppButton
            width="55%"
            title="Send Message"
            variant="outline"
            borderColor={colors.logoColor}
            TextColor={colors.primary}
            colorScheme="purple"
            onPress={() => handleChat(userProposalData[0].user._id)}
          />
        </HStack>
      </VStack>
    );
  };
  return (
    <Box h="100%">
      <Heading size="2xl" margin="20px" fontFamily={font.primary}>
        Proposals
      </Heading>
      {userProposalData ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={item => item.proposal._id}
          data={userProposalData}
          renderItem={JobCard}
        />
      ) : (
        <Text>There is no Proposal yet.</Text>
      )}
    </Box>
  );
};

export default ProposalList;
