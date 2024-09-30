import {View, Text} from 'react-native';
import React from 'react';
import {Input} from 'native-base';

const AppInput = ({...otherProps}) => {
  return (
    <Input
      {...otherProps}
      //   autoCapitalize={Capitalize}
      //   placeholder={placeholder}
      //   keyboardType={keyboardType}
      //   backgroundColor={backgroundColor}
      //   value={value}
      //   onChangeText={value => setEmail(value)}
      //   focusOutlineColor={colors.logoColor}
      borderRadius="8px"
      height="45px"
      //   marginTop="21px"
      width="80%"
      alignSelf="center"
      fontSize="md"
      fontFamily="Poppins-Regular"
    />
  );
};

export default AppInput;
