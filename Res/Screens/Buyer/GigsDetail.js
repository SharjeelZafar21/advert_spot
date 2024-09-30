import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PaymentAction, createOrderAction, listGigs} from '../../Redux/Actions';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStripe} from '@stripe/stripe-react-native';

const GigsDetail = ({route, navigation}) => {
  const GigsData = useSelector(state => state.gigs.gigs);
  const PaymentResponse = useSelector(state => state.Payment.payment);
  const userData = useSelector(state => state.userProfile.profile);
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

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const onCheckout = async () => {
    // 1. Create a payment intent
    // const response = await createPaymentIntent({
    //   amount: Math.floor(total * 100),
    // });
    // if (response.error) {
    //   Alert.alert('Something went wrong');
    //   return;
    // }
    const data = JSON.stringify({
      Amount: selectedGig.gig.price,
      Currency: 'usd',
    });
    await dispatch(PaymentAction(data));
    console.log('payment response', PaymentResponse.client_secret);

    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'notJust.dev',
      paymentIntentClientSecret: PaymentResponse.client_secret,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message,
      );
      return;
    }

    // 4. If payment ok -> create the order
    // onCreateOrder();
    // {"sellerId":"63a38bc7c6ac62ccc47772bd","status":"In Progress","amount":"6000","gigId":"63a97f4aec5ae4016999817e","jobId":null}
    const orderData = JSON.stringify({
      sellerId: selectedGig.gig.sellerId,
      buyerId: userData.id,
      status: 'In Progress',
      amount: selectedGig.gig.price,
      gigId: id,
      jobId: null,
    });
    await dispatch(createOrderAction(orderData));
    // console.log('order response', PaymentResponse.client_secret);
    navigation.navigate('Job Orders');
  };
  console.log('rating', selectedGig.user.rating);

  return (
    <Box h="full">
      <Box height="50px" width="100%" backgroundColor={colors.primary} />
      <Box h="full" w="90%" position="absolute" alignSelf="center">
        <ScrollView>
          <VStack
            backgroundColor={colors.white}
            borderRadius="xl"
            marginTop="15px"
            // h="211px"
          >
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
                  {selectedGig.gig.price} PKR
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
                <Text textAlign="center">
                  {selectedGig.user.rating.overallRating}/
                  {selectedGig.user.rating.totalRated}
                </Text>
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
                  Dimensions: {selectedGig.gig.height}x{selectedGig.gig.width}{' '}
                  {selectedGig.gig.unit}
                </Text>
              </HStack>
              <HStack margin="10px">
                <Icon
                  as={Icons}
                  name="location-sharp"
                  size="md"
                  color={colors.primary}
                />
                <Text marginLeft="10px">
                  Location:{selectedGig.gig.Location}
                </Text>
              </HStack>
            </VStack>
          </VStack>
          <Divider my="6" width="90%" alignSelf="center" />
          <Heading fontFamily={font.primary} fontSize="20px">
            Description
          </Heading>
          <Text marginLeft="20px" marginRight="20px">
            {selectedGig.gig.description}
          </Text>
          <Divider my="6" width="90%" alignSelf="center" />

          <HStack justifyContent="space-around">
            <AppButton
              margin="30px"
              width="33%"
              title="Hire"
              TextColor={colors.white}
              color={colors.primary}
              onPress={onCheckout}
            />
            <AppButton
              margin="30px"
              width="45%"
              title="Send Message"
              variant="outline"
              colorScheme="purple"
              borderColor={colors.primary}
              TextColor={colors.primary}
              onPress={() => handleChat(selectedGig.user._id)}
            />
          </HStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default GigsDetail;
