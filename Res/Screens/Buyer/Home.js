import {Box, HStack, Input, ScrollView, Text, VStack} from 'native-base';
import React, {useEffect} from 'react';
import colors from '../../res/config/colors';
import Icons from 'react-native-vector-icons/Ionicons';
import BaseCard from '../../Components/BaseCard';
import {useDispatch, useSelector} from 'react-redux';
import {listGigs} from '../../Redux/Actions';

const Home = ({navigation}) => {
  // const Data = useSelector(state => state.gigs.gigs?.data);
  // const dispatch = useDispatch();
  // console.log('gigs in gigs list', Data);
  // useEffect(() => {
  //   dispatch(listGigs());
  // }, []);
  return (
    <Box height="100%" width="100%">
      <Box height="40px" width="100%" backgroundColor={colors.primary} />
      <Input
        alignSelf="center"
        InputLeftElement={
          <Icons name="search-outline" size={20} style={{marginLeft: 10}} />
        }
        placeholder="What do you need"
        backgroundColor={colors.white}
        focusOutlineColor={colors.logoColor}
        borderRadius="12px"
        height="45px"
        marginTop="18px"
        width="90%"
        fontSize="md"
        fontFamily="Poppins-Regular"
        position="absolute"
        shadow="8"
      />
      <Text
        marginTop="40px"
        fontSize="18px"
        marginLeft="10px"
        fontFamily="Poppins-Regular">
        Categories
      </Text>
      <Text marginLeft="10px" fontFamily="Poppins-Regular">
        You can find everything you're looking for here!
      </Text>
      <ScrollView h="100%" w="100%">
        <VStack space={3}>
          <HStack space={1}>
            <BaseCard
              onPress={() => {
                navigation.navigate('Gigs', {
                  GigsCategory: 'flex',
                });
              }}
              title="Flex"
              image_url={require('../../res/pics/Flexes.png')}
              color={colors.secondary}
            />
            <BaseCard
              onPress={() => {
                navigation.navigate('Gigs', {
                  GigsCategory: 'banner',
                });
              }}
              title="Banner"
              image_url={require('../../res/pics/Banner.png')}
              color={colors.skyblue}
            />
          </HStack>
          <HStack space={1}>
            <BaseCard
              onPress={() => {
                navigation.navigate('Gigs', {
                  GigsCategory: 'digital-marketing',
                });
              }}
              title="Digital Marketing"
              image_url={require('../../res/pics/Digital.png')}
              color={colors.blue}
            />
            <BaseCard
              onPress={() => {
                navigation.navigate('Gigs', {
                  GigsCategory: 'flyer',
                });
              }}
              title="Flyer"
              image_url={require('../../res/pics/Flyer.png')}
              color={colors.darkgreen}
            />
          </HStack>
          <HStack space={1}>
            <BaseCard
              onPress={() => {
                navigation.navigate('Gigs', {
                  GigsCategory: 'broucher',
                });
              }}
              title="Brochure"
              image_url={require('../../res/pics/Broucher.png')}
              color={colors.yellow}
            />
            <BaseCard
              onPress={() => {
                navigation.navigate('Gigs', {
                  GigsCategory: 'poster',
                });
              }}
              title="Posters"
              image_url={require('../../res/pics/Posters.png')}
              color={colors.primary}
            />
          </HStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Home;
