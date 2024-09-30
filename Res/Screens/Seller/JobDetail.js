import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Progress,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {JobAction} from '../../Redux/Actions';
import colors from '../../res/config/colors';
import Icons from '../../res/icons/icon';
import font from '../../res/config/font';
import AppButton from '../../Components/AppButton';

const JobDetail = ({navigation, route}) => {
  const AllJobData = useSelector(state => state.alljobs.alljob);
  const userData = useSelector(state => state.userProfile.profile);
  const dispatch = useDispatch();
  console.log('all jobs', AllJobData?.jobs);
  useEffect(() => {
    dispatch(JobAction());
  }, []);

  const id = route.params.JobsId;
  const userid = route.params.Userid;
  console.log('id of job in detail', id);
  console.log('id of user in detail', userid);
  console.log('id of user in detail', userData);

  const selectedJob = AllJobData?.jobs.find(element => {
    return id === element?._id;
  });
  // const selectedUser = userData?.find(element => {
  //   return userid === element?.id;
  // });
  return (
    <Box h="full">
      <Box height="50px" width="100%" backgroundColor={colors.primary} />
      <Box
        h="full"
        w="90%"
        marginTop="25px"
        margin="10px"
        position="absolute"
        alignSelf="center">
        <ScrollView>
          <VStack borderRadius="xl" backgroundColor={colors.white}>
            <Heading margin="15px" size="xl">
              Job Description
            </Heading>
            <Divider width="90%" alignSelf="center" />
            <HStack justifyContent="space-between" margin="10px">
              <VStack width="68%">
                <Heading>{selectedJob.Title}</Heading>
                <Text
                  color={colors.green}
                  fontSize="16px"
                  fontFamily={font.primary}>
                  ${selectedJob.Budget}
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
            borderRadius="lg"
            marginTop="20px">
            <Heading margin="10px">Agent</Heading>
            <HStack margin="10px" marginBottom="20px">
              <Icon as={Icons} name="person-circle-sharp" size="5xl" />
              <VStack marginTop="4px">
                <Heading fontFamily={font.primary} fontSize="18px">
                  Junaid Jahan
                  {/* {selectedUser.firstName} {selectedUser.lastName} */}
                </Heading>
                <Text
                  fontSize="14px"
                  fontFamily={font.primary}
                  color={colors.darkgrey}>
                  {selectedJob.Type}
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <AppButton
            margin="30px"
            width="72%"
            title="Send Proposal"
            TextColor={colors.white}
            color={colors.primary}
            onPress={() => {
              navigation.navigate('AddProposal');
            }}
          />
        </ScrollView>
      </Box>
    </Box>
  );
};

export default JobDetail;
