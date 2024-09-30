import {RefreshControl, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Icon,
  Image,
  Progress,
  Text,
  VStack,
} from 'native-base';
import colors from '../../res/config/colors';
import Icons from '../../res/icons/icon';
import font from '../../res/config/font';
import {toTitleCase} from '../../res/config/Capitalize';
import {listGigs, sellerGigAction} from '../../Redux/Actions';

const SellerGigs = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const Data = useSelector(state => state.sellergigs.sellergigs);
  const userData = useSelector(state => state.userProfile.profile);
  const dispatch = useDispatch();
  console.log('gigs in gigs list', Data);
  useEffect(() => {
    dispatch(sellerGigAction());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(sellerGigAction());
    setRefreshing(false);
  };
  const GigsCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SellerGigsDetail', {GigsId: item._id});
        }}>
        <VStack
          backgroundColor={colors.white}
          // h="211px"
          w="90%"
          shadow="5"
          margin="10px"
          borderRadius="lg"
          alignSelf="center">
          <Image
            borderTopRadius="lg"
            height="137px"
            width="100%"
            source={{uri: item.images[0]}}
            alt="image"
          />
          <HStack justifyContent="space-between" margin="15px">
            <HStack>
              <Icon as={Icons} name="person-circle-sharp" size="3xl" />
              <VStack marginTop="4px">
                <Heading fontFamily={font.primary} fontSize="14px">
                  {userData.firstName} {userData.lastName}
                </Heading>
                <Text fontSize="12px" fontFamily={font.primary}>
                  {toTitleCase(item.category ?? '')}
                </Text>
              </VStack>
            </HStack>
          </HStack>
          <HStack justifyContent="space-between" margin="10px">
            <VStack marginLeft="10px" w="50%">
              <Heading fontFamily={font.primary} fontSize="20px">
                {item.title}
              </Heading>
              <HStack>
                <Progress
                  width="150px"
                  backgroundColor={colors.darkgrey}
                  _filledTrack={{
                    bg: colors.yellow,
                  }}
                  value={75}
                  marginTop="10px"
                />
                <Text marginTop="5px" marginLeft="5px">
                  4.5/5
                </Text>
              </HStack>
            </VStack>
            <VStack>
              <Text>Starts From</Text>
              <Text
                color={colors.green}
                fontSize="24px"
                fontFamily={font.primary}>
                {item.price} PKR
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </TouchableOpacity>
    );
  };
  return (
    <Box h="100%">
      <Heading size="2xl" margin="20px" fontFamily={font.primary}>
        Ads
      </Heading>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={item => item._id}
        data={Data}
        renderItem={GigsCard}
      />
    </Box>
  );
};

export default SellerGigs;
