import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {listGigs, sellerGigAction} from '../../Redux/Actions';
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
import font from '../../res/config/font';
import colors from '../../res/config/colors';
import Icons from '../../res/icons/icon';
import AppButton from '../../Components/AppButton';

const SellerGigsDetail = ({route}) => {
  const GigsData = useSelector(state => state.sellergigs.sellergigs);
  const userData = useSelector(state => state.userProfile.profile);
  const dispatch = useDispatch();
  console.log('gigs', GigsData);
  useEffect(() => {
    dispatch(sellerGigAction());
  }, []);

  const id = route.params.GigsId;
  console.log('id of gig in detail', id);

  const selectedGig = GigsData.find(element => {
    return id === element._id;
  });
  return (
    <Box>
      <Box height="50px" width="100%" backgroundColor={colors.primary} />
      <VStack
        backgroundColor={colors.white}
        // h="211px"
        w="90%"
        // shadow="5"
        marginTop="25px"
        margin="10px"
        borderRadius="xl"
        position="absolute"
        alignSelf="center">
        <Image
          borderTopRadius="xl"
          height="137px"
          width="100%"
          source={{uri: selectedGig.images[0]}}
          alt="image"
        />
        <HStack justifyContent="space-between" margin="15px">
          <HStack>
            <Icon as={Icons} name="person-circle-sharp" size="3xl" />
            <VStack marginTop="4px">
              <Heading fontFamily={font.primary} fontSize="14px">
                {userData.firstName}
                {userData.lastName}
              </Heading>
              <Text fontSize="12px" fontFamily={font.primary}>
                {selectedGig.category}
              </Text>
            </VStack>
          </HStack>
          <VStack>
            {/* <Text>Starts From</Text> */}
            <Text
              color={colors.green}
              fontSize="24px"
              fontFamily={font.primary}>
              {selectedGig.price} PKR
            </Text>
          </VStack>
        </HStack>
        <HStack justifyContent="space-between" margin="10px">
          <VStack marginLeft="10px">
            <Icon
              as={Icons}
              name="eye-sharp"
              size="lg"
              alignSelf="center"
              color={colors.primary}
            />
            <Text>Status</Text>
            <Text textAlign="center">{userData.status}</Text>
          </VStack>
          <VStack>
            <Icon
              as={Icons}
              name="time-sharp"
              size="lg"
              alignSelf="center"
              color={colors.primary}
            />
            <Text>Job Delivery Time</Text>
            <Text textAlign="center">
              {selectedGig.delivery} {selectedGig.duration}
            </Text>
          </VStack>
          <VStack marginRight="10px">
            <Icon
              as={Icons}
              name="star-sharp"
              size="lg"
              alignSelf="center"
              color={colors.primary}
            />
            <Text>Rating</Text>
            <Text textAlign="center">4.3/5</Text>
          </VStack>
        </HStack>
      </VStack>
      <VStack
        backgroundColor={colors.white}
        // h="211px"
        w="90%"
        // shadow="5"
        marginTop="67%"
        margin="10px"
        borderRadius="lg"
        alignSelf="center">
        <VStack margin="10px">
          <Heading fontFamily={font.primary} fontSize="20px">
            Pakages Included
          </Heading>
          <HStack margin="10px">
            <Icon
              as={Icons}
              name="ios-bar-chart-sharp"
              size="md"
              color={colors.primary}
            />
            <Text marginLeft="10px">Quantity:{selectedGig.quantity}</Text>
          </HStack>
          <HStack margin="10px">
            <Icon
              as={Icons}
              name="ios-move-sharp"
              size="md"
              color={colors.primary}
            />
            <Text marginLeft="10px">
              Dimensions:{selectedGig.height} x {selectedGig.width}{' '}
              {selectedGig.unit}{' '}
            </Text>
          </HStack>
          {/* <HStack margin="10px">
            <Icon
              as={Icons}
              name="location-sharp"
              size="md"
              color={colors.primary}
            />
            <Text marginLeft="10px">Location:{selectedGig.Location}</Text>
          </HStack> */}
        </VStack>
      </VStack>
      <Divider my="2" width="90%" alignSelf="center" />
      <ScrollView height="30%">
        <Heading fontFamily={font.primary} fontSize="20px" marginLeft="20px">
          Description
        </Heading>
        <Text marginLeft="20px" marginRight="20px">
          {selectedGig.description}
        </Text>
      </ScrollView>
      {/* <HStack justifyContent="space-around">
        <AppButton
          margin="30px"
          width="33%"
          title="Hire"
          TextColor={colors.white}
          color={colors.primary}
          // onPress={Submit}
        />
        <AppButton
          margin="30px"
          width="45%"
          title="Send Message"
          variant="outline"
          colorScheme="purple"
          borderColor={colors.primary}
          TextColor={colors.primary}
          // onPress={Submit}
        />
      </HStack> */}
    </Box>
  );
};

export default SellerGigsDetail;
