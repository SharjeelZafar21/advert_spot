import {Box, Heading, HStack, Icon, Pressable} from 'native-base';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import colors from '../res/config/colors';

const ChildCard = ({onPress, IconName, HeadingName}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        width="90%"
        marginLeft="15px"
        marginBottom="10px"
        justifyContent="space-between"
        marginTop="10px">
        <HStack>
          <Icon as={Icons} name={IconName} size="lg" alignSelf="center" />
          <Heading size="md" marginLeft={4} alignSelf="center">
            {HeadingName}
          </Heading>
        </HStack>
        <Icon as={Icons} name="chevron-forward" size="md" alignSelf="center" />
      </HStack>
    </Pressable>
  );
};

export default ChildCard;
