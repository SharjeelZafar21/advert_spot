import {Heading, HStack, Text, VStack} from 'native-base';
import React from 'react';
import colors from '../res/config/colors';
import font from '../res/config/font';
import AppButton from './AppButton';

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
          {item.Title}
        </Heading>
        <Text color={colors.green} fontSize="2xl" fontFamily={font.primary}>
          {item.Budget} PKR
        </Text>
      </HStack>
      <HStack
        marginLeft="10px"
        marginRight="10px"
        justifyContent="space-between">
        <Heading size="md">
          Proposals:<Text fontWeight="light">{item.Proposals}</Text>
        </Heading>
        <Heading size="md">
          Status:<Text fontWeight="light">{item.Status}</Text>
        </Heading>
      </HStack>
      <HStack margin="20px" justifyContent="space-between">
        <AppButton
          title="View"
          // variant="subtle"
          // colorScheme="secondary"
          color={colors.primary}
          TextColor={colors.white}
          width="35%"
        />
        <AppButton
          // margin="20px"
          width="35%"
          title="Proposal"
          variant="outline"
          // color={colors.white}
          borderColor={colors.logoColor}
          TextColor={colors.primary}
          colorScheme="purple"
        />
      </HStack>
    </VStack>
  );
};

export default JobCard;
