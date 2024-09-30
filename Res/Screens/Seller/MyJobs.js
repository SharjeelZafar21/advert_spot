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
import {
  buyerOrderAction,
  sellerOrderAction,
  userJobAction,
} from '../../Redux/Actions';
import colors from '../../res/config/colors';
import font from '../../res/config/font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyJobs = () => {
  const [refreshing, setRefreshing] = useState(false);
  const orders = useSelector(state => state.sellerOrder.sOrder);
  const dispatch = useDispatch();
  console.log('Buyer Orders', orders);
  useEffect(() => {
    dispatch(sellerOrderAction());
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(sellerOrderAction());
    setRefreshing(false);
  };
  const onHandleCompeted = async id => {
    const tokenData = await AsyncStorage.getItem('token');
    console.log(tokenData);
    try {
      const response = await fetch(
        `http://localhost:5000/order/update-status/${id}?status=${'completed'}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: '/',
            Authorization: `bearer ${tokenData}`,
          },
          // body: JSON.stringify(m),
        },
      );
      const result = await response.json();
      console.log('result in completed action', result);
      dispatch(sellerOrderAction());
    } catch (err) {
      console.log(err);
    }
  };
  const onHandleCancel = async id => {
    const tokenData = await AsyncStorage.getItem('token');
    console.log(tokenData);
    try {
      const response = await fetch(
        `http://localhost:5000/order/update-status/${id}?status=${'cancelled'}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: '/',
            Authorization: `bearer ${tokenData}`,
          },
          // body: JSON.stringify(m),
        },
      );
      const result = await response.json();
      console.log('result in action', result);
      dispatch(sellerOrderAction());
    } catch (err) {
      console.log(err);
    }
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
            {item.title}
          </Heading>
          <Text color={colors.green} fontSize="2xl" fontFamily={font.primary}>
            ${item.amount}
          </Text>
        </HStack>
        <HStack
          marginLeft="10px"
          marginRight="10px"
          justifyContent="space-between">
          <Heading size="md">
            Quantity:<Text fontWeight="light">{item.quantity}</Text>
          </Heading>
          <Heading size="md">
            Status:<Text fontWeight="light">{item.status}</Text>
          </Heading>
        </HStack>
        <HStack margin="20px" justifyContent="space-between">
          <AppButton
            onPress={() => {
              onHandleCompeted(item.id);
            }}
            title="Completed"
            color={colors.secondary}
            TextColor={colors.white}
            width="45%"
          />
          <AppButton
            width="45%"
            title="Cancel"
            variant="outline"
            borderColor={colors.red}
            TextColor={colors.lighred}
            colorScheme="red"
            onPress={() => {
              onHandleCancel(item.id);
            }}
          />
        </HStack>
      </VStack>
    );
  };
  return (
    // <NavigationContainer>
    // <TopNav />
    // </NavigationContainer>
    <Box h="100%">
      <Heading size="2xl" margin="15px" fontFamily={font.primary}>
        Orders
      </Heading>
      {orders ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={item => item.id}
          data={orders}
          renderItem={JobCard}
        />
      ) : (
        <Text>There is no order yet.</Text>
      )}
    </Box>
  );
};

export default MyJobs;
