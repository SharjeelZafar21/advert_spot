import React from 'react';
import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Text,
} from 'native-base';
import colors from '../res/config/colors';
import {Pressable} from 'react-native';

const BaseCard = ({title, color, image_url, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <Center
        h="210px"
        w="186px"
        backgroundColor={color}
        rounded="xl"
        shadow="5"
        marginLeft="11px">
        <Image
          resizeMode="contain"
          height="80px"
          width="80px"
          source={image_url}
          alt="Image"
        />
        <Heading
          textAlign="center"
          fontFamily="Poppins-Regular"
          color={colors.white}
          marginTop="5px">
          {title}
        </Heading>
        {/* <Text
          textAlign="center"
          fontFamily="Poppins-Regular"
          color={colors.white}>
          {n_freelancer} Freelancer
        </Text>
        <Text
          textAlign="center"
          fontFamily="Poppins-Regular"
          color={colors.white}>
          {n_jobs} Active Jobs
        </Text> */}
      </Center>
    </Pressable>
  );
};

export default BaseCard;
