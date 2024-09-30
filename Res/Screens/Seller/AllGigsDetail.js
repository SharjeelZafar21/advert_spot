import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {listGigs} from '../../Redux/Actions';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Progress,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import font from '../../res/config/font';
import colors from '../../res/config/colors';
import Icons from '../../res/icons/icon';
import AppButton from '../../Components/AppButton';

const AllGigsDetail = ({route}) => {
  const GigsData = useSelector(state => state.gigs.gigs);
  const dispatch = useDispatch();
  console.log('gigs', GigsData);
  useEffect(() => {
    dispatch(listGigs());
  }, []);

  const id = route.params.GigsId;
  console.log('id of gig in detail', id);

  const selectedGig = GigsData.data.find(element => {
    return id === element.gig._id;
  });
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
            <Image
              borderTopRadius="xl"
              height="137px"
              width="100%"
              source={{uri: selectedGig.gig.images[0]}}
              alt="image"
            />
            <HStack justifyContent="space-between" margin="15px">
              <HStack>
                <Icon as={Icons} name="person-circle-sharp" size="3xl" />
                <VStack marginTop="4px">
                  <Heading fontFamily={font.primary} fontSize="14px">
                    {selectedGig.user.firstName}
                    {selectedGig.user.lastName}
                  </Heading>
                  <Text fontSize="12px" fontFamily={font.primary}>
                    {selectedGig.gig.category}
                  </Text>
                </VStack>
              </HStack>
              <VStack>
                {/* <Text>Starts From</Text> */}
                <Text
                  color={colors.green}
                  fontSize="24px"
                  fontFamily={font.primary}>
                  ${selectedGig.gig.price}
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
                <Text textAlign="center">{selectedGig.user.status}</Text>
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
                  {selectedGig.gig.delivery} {selectedGig.gig.duration}
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
            marginTop="20px"
            borderRadius="lg">
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
                <Text marginLeft="10px">
                  Quantity:{selectedGig.gig.quantity}
                </Text>
              </HStack>
              <HStack margin="10px">
                <Icon
                  as={Icons}
                  name="ios-move-sharp"
                  size="md"
                  color={colors.primary}
                />
                <Text marginLeft="10px">
                  Dimensions: {selectedGig.gig.height} x {selectedGig.gig.width}{' '}
                  {selectedGig.gig.unit}
                </Text>
              </HStack>
              {/* <HStack margin="10px">
            <Icon
              as={Icons}
              name="location-sharp"
              size="md"
              color={colors.primary}
            />
            <Text marginLeft="10px">Images:</Text>
            <Link
              onPress={() => {
                selectedGig.gig.images[0];
              }}>
              {selectedGig.gig.images[0]}
            </Link>
          </HStack> */}
            </VStack>
          </VStack>
          {/* <ScrollView h="25%"> */}
          <Divider my="4" width="90%" alignSelf="center" />
          <Heading fontFamily={font.primary} fontSize="20px" marginLeft="20px">
            Description
          </Heading>
          <Text marginLeft="20px" marginRight="20px">
            {selectedGig.gig.description}
          </Text>
          <Divider my="6" width="90%" alignSelf="center" />
        </ScrollView>
      </Box>
    </Box>
  );
};

export default AllGigsDetail;
