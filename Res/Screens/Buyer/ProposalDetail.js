import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Divider, Heading, HStack, Icon, Text, VStack} from 'native-base';
import {
  PaymentAction,
  createOrderAction,
  userJobAction,
} from '../../Redux/Actions';
import colors from '../../res/config/colors';
import font from '../../res/config/font';
import Icons from '../../res/icons/icon';
import AppButton from '../../Components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStripe} from '@stripe/stripe-react-native';

const ProposalDetail = ({route, navigation}) => {
  const userProposalData = useSelector(
    state => state.proposalsList.userjobproposal,
  );
  const userData = useSelector(state => state.userProfile.profile);
  const PaymentResponse = useSelector(state => state.Payment.payment);
  const dispatch = useDispatch();
  console.log('user job in jobs', userProposalData);
  console.log('user data', userData);
  // useEffect(() => {
  //   dispatch(userJobAction());
  // }, []);

  const id = route.params?.ProposalId;
  console.log('id of proposal in detail', id);

  const selectedProposal = userProposalData.find(element => {
    return id === element?.proposal._id;
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
      Amount: selectedProposal.proposal.Amount,
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
      sellerId: selectedProposal.proposal.UserId,
      buyerId: userData.id,
      status: 'In Progress',
      amount: selectedProposal.proposal.Amount,
      gigId: null,
      jobId: selectedProposal.proposal.JobId,
    });
    await dispatch(createOrderAction(orderData));
    // console.log('order response', PaymentResponse.client_secret);
    navigation.navigate('Job Orders');
  };
  return (
    <Box>
      <Box height="50px" width="100%" backgroundColor={colors.primary} />
      <Box
        position="absolute"
        w="90%"
        marginTop="25px"
        alignSelf="center"
        margin="10px">
        <VStack backgroundColor={colors.white} borderRadius="xl">
          <Heading margin="15px" size="xl">
            Cover Letter
          </Heading>
          <Divider width="90%" alignSelf="center" />
          <HStack justifyContent="space-between" margin="10px">
            {/* <VStack width="68%"> */}
            {/* <Heading>{selectedProposal?.proposal?.CoverLetter}</Heading> */}
            <Text w="60%">{selectedProposal?.proposal.CoverLetter}</Text>
            <Text
              color={colors.green}
              fontSize="16px"
              fontFamily={font.primary}>
              {selectedProposal?.proposal.Amount} PKR
            </Text>
            {/* </VStack> */}
            {/* <VStack margin="10px">
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
              {selectedJob.Dimensions}
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
          </VStack> */}
          </HStack>
        </VStack>
        <VStack
          backgroundColor={colors.white}
          marginTop="20px"
          borderRadius="lg">
          <Heading margin="10px">Agent</Heading>
          <Divider width="90%" alignSelf="center" />
          <HStack margin="10px" marginBottom="20px">
            <Icon as={Icons} name="person-circle-sharp" size="5xl" />
            <VStack marginTop="4px">
              <Heading fontFamily={font.primary} fontSize="18px">
                {selectedProposal?.user.firstName}{' '}
                {selectedProposal?.user.lastName}
              </Heading>
              <Text
                fontSize="14px"
                fontFamily={font.primary}
                color={colors.darkgrey}>
                {selectedProposal?.user.email}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <HStack margin="20px" justifyContent="space-between">
          <AppButton
            onPress={onCheckout}
            title="Hire"
            color={colors.primary}
            TextColor={colors.white}
            width="35%"
          />
          <AppButton
            width="55%"
            title="Send Message"
            variant="outline"
            borderColor={colors.primary}
            TextColor={colors.primary}
            colorScheme="purple"
            onPress={() => handleChat(userProposalData[0].user._id)}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProposalDetail;
