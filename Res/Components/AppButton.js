import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'native-base';
import colors from '../res/config/colors';

const AppButton = ({
  onPress,
  color,
  title,
  TextColor,
  width,
  ...otherProps
}) => {
  return (
    <Button
      {...otherProps}
      onPress={onPress}
      bgColor={color}
      borderRadius="8px"
      height="45px"
      marginTop="15px"
      width={width}
      alignSelf="center"
      _text={{
        fontSize: 18,
        color: TextColor,
        fontFamily: 'Poppins-Regular',
      }}>
      {title}
    </Button>
  );
};

export default AppButton;
