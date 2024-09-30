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
import font from '../../res/config/font';
import Icons from '../../res/icons/icon';
import colors from '../../res/config/colors';
import {toTitleCase} from '../../res/config/Capitalize';
import {listGigs} from '../../Redux/Actions';

const Gigs = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const Data = useSelector(state => state.gigs.gigs);
  const dispatch = useDispatch();
  console.log('gigs in gigs list', Data?.data);
  useEffect(() => {
    dispatch(listGigs());
  }, []);

  const Category = route.params?.GigsCategory;
  console.log('Category in GIGs', Category);

  const selectedGig = Data?.data.filter(element => {
    return Category === element.gig?.category;
  });
  console.log('selected', selectedGig);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(listGigs());
    Category == undefined;
    console.log('category in Refresh', Category);
    setRefreshing(false);
  };

  const GigsCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GigsDetail', {GigsId: item.gig._id});
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
            source={{uri: item.gig.images[0]}}
            alt="image"
          />
          <HStack justifyContent="space-between" margin="15px">
            <HStack>
              <Icon as={Icons} name="person-circle-sharp" size="3xl" />
              <VStack marginTop="4px">
                <Heading fontFamily={font.primary} fontSize="14px">
                  {item.user.firstName} {item.user.lastName}
                </Heading>
                <Text fontSize="12px" fontFamily={font.primary}>
                  {toTitleCase(item.gig.category ?? '')}
                </Text>
              </VStack>
            </HStack>
          </HStack>
          <HStack justifyContent="space-between" margin="10px">
            <VStack marginLeft="10px" w="50%">
              <Heading fontFamily={font.primary} fontSize="20px">
                {item.gig.title}
              </Heading>
              <HStack>
                <Progress
                  width="150px"
                  backgroundColor={colors.darkgrey}
                  _filledTrack={{
                    bg: colors.yellow,
                  }}
                  value={10 * item.user.rating.overallRating}
                  marginTop="10px"
                />
                <Text marginTop="5px" marginLeft="5px">
                  {item.user.rating.overallRating}/{item.user.rating.totalRated}
                </Text>
              </HStack>
            </VStack>
            <VStack>
              <Text>Starts From</Text>
              <Text
                color={colors.green}
                fontSize="24px"
                fontFamily={font.primary}>
                {item.gig.price} PKR
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
        keyExtractor={item => item.gig._id}
        data={Category ? selectedGig : Data?.data}
        renderItem={GigsCard}
      />
    </Box>
  );
};

export default Gigs;
