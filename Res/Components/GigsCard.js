import React from 'react';
import {Heading, HStack, Icon, Image, Text, VStack} from 'native-base';
import AppButton from './AppButton';
import Icons from '../res/icons/icon';
import font from '../res/config/font';
import colors from '../res/config/colors';
import {TouchableOpacity} from 'react-native';

const GigsCard = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('GigsDetail', {GigsId: item._id});
      }}>
      <VStack
        backgroundColor={colors.white}
        h="211px"
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
                {item.title}
              </Heading>
              <Text fontSize="12px" fontFamily={font.primary}>
                {item.category}
              </Text>
            </VStack>
          </HStack>
          <Text color={colors.green} fontSize="24px" fontFamily={font.primary}>
            {item.price} PKR
          </Text>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
};
export default GigsCard;
