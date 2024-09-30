import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {userJobAction} from '../../Redux/Actions';
import colors from '../../res/config/colors';
import font from '../../res/config/font';
import Icons from '../../res/icons/icon';
import AppButton from '../../Components/AppButton';

const UserJobDetail = ({navigation, route}) => {
  const userJobData = useSelector(state => state.userJob.userjob);
  const userData = useSelector(state => state.userProfile.profile);
  const dispatch = useDispatch();
  console.log('user job in jobs', userJobData);
  useEffect(() => {
    dispatch(userJobAction());
  }, []);

  const id = route.params?.UserJobId;
  console.log('id of user job in detail', id);

  const selectedJob = userJobData.find(element => {
    return id === element?._id;
  });
  return (
    <Box h="full">
      <Box height="50px" width="100%" backgroundColor={colors.primary} />
      <Box
        w="90%"
        h="full"
        marginTop="25px"
        margin="10px"
        position="absolute"
        alignSelf="center">
        <ScrollView>
          <VStack backgroundColor={colors.white} borderRadius="xl">
            <Heading margin="15px" size="xl">
              Job Description
            </Heading>
            <Divider width="90%" alignSelf="center" />
            <HStack justifyContent="space-between" margin="10px">
              <VStack width="68%">
                <Heading>{selectedJob?.Title}</Heading>
                <Text
                  color={colors.green}
                  fontSize="16px"
                  fontFamily={font.primary}>
                  {selectedJob?.Budget} PKR
                </Text>
                <Text>{selectedJob.Description}</Text>
              </VStack>
              <VStack margin="10px">
                <Icon
                  as={Icons}
                  name="ios-bar-chart-sharp"
                  size="sm"
                  alignSelf="center"
                  color={colors.primary}
                />
                <Text textAlign="center" color={colors.darkgrey}>
                  Quantity
                </Text>
                <Text textAlign="center" fontSize="16px">
                  {selectedJob.Quantity}
                </Text>
                <Icon
                  marginTop="5px"
                  as={Icons}
                  name="ios-move-sharp"
                  size="sm"
                  alignSelf="center"
                  color={colors.primary}
                />
                <Text textAlign="center" color={colors.darkgrey}>
                  Dimensions
                </Text>
                <Text textAlign="center" fontSize="16px">
                  {selectedJob.Height} x {selectedJob.Width} {selectedJob.Unit}
                </Text>
                <Icon
                  marginTop="5px"
                  as={Icons}
                  name="location-sharp"
                  size="sm"
                  alignSelf="center"
                  color={colors.primary}
                />
                <Text textAlign="center" color={colors.darkgrey}>
                  Location
                </Text>
                <Text textAlign="center" fontSize="16px">
                  {selectedJob.Location}
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <VStack
            backgroundColor={colors.white}
            marginTop="20px"
            borderRadius="lg">
            <Heading margin="10px">Agent</Heading>
            <HStack margin="10px" marginBottom="20px">
              <Icon as={Icons} name="person-circle-sharp" size="5xl" />
              <VStack marginTop="4px">
                <Heading fontFamily={font.primary} fontSize="18px">
                  {userData.firstName} {userData.lastName}
                </Heading>
                <Text
                  fontSize="14px"
                  fontFamily={font.primary}
                  color={colors.darkgrey}>
                  {userData.email}
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <AppButton
            margin="30px"
            width="72%"
            title="View Proposals"
            TextColor={colors.white}
            color={colors.primary}
            onPress={() => {
              navigation.navigate('ProposalList', {UserJobId: selectedJob._id});
            }}
          />
        </ScrollView>
      </Box>
    </Box>
  );
};

export default UserJobDetail;
