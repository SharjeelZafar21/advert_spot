import {View, Text} from 'react-native';
import React from 'react';
import {
  Box,
  FormControl,
  Icon,
  Input,
  ScrollView,
  Select,
  TextArea,
} from 'native-base';
import AppButton from '../../Components/AppButton';
import colors from '../../res/config/colors';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import Icons from '../../res/icons/icon';
import {postProposalAction} from '../../Redux/Actions';

const AddProposal = ({navigation, route}) => {
  const [amount, setAmount] = useState();
  const [coverletter, setCoverLetter] = useState();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userProfile.profile);

  const id = route.params?.JobsId;
  console.log('job id', id);
  console.log('user id', userData.id);

  const Submit = () => {
    if (amount === undefined) {
      alert('Job Title is required');
    } else if (coverletter === undefined) {
      alert('Description is required');
    } else {
      // console.log();
      const data = JSON.stringify({
        Amount: +amount,
        CoverLetter: coverletter,
        JobId: id,
        UserId: userData.id,
      });
      console.log(data);
      dispatch(postProposalAction(data));

      navigation.navigate('Home');
    }
  };
  return (
    // <ScrollView h="full">
    <Box
      backgroundColor={colors.white}
      shadow="9"
      h="93%"
      margin="20px"
      borderRadius="12px">
      <FormControl isRequired>
        <FormControl.Label
          _text={{
            bold: true,
            marginLeft: '40px',
            fontFamily: 'Poppins-Regular',
          }}>
          Amount
        </FormControl.Label>
        <Input
          placeholder="5000"
          value={amount}
          onChangeText={value => setAmount(value)}
          focusOutlineColor={colors.logoColor}
          _focus={{
            backgroundColor: 'purple.100',
          }}
          borderRadius="8px"
          height="45px"
          width="80%"
          alignSelf="center"
          fontSize="md"
          fontFamily="Poppins-Regular"
        />
        <FormControl.ErrorMessage
          _text={{
            fontSize: 'xs',
          }}>
          Error Name
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormControl.Label
          _text={{
            bold: true,
            marginLeft: '40px',
          }}>
          Cover Letter
        </FormControl.Label>
        <TextArea
          placeholder="john"
          value={coverletter}
          onChangeText={value => setCoverLetter(value)}
          focusOutlineColor={colors.logoColor}
          _focus={{
            backgroundColor: 'purple.100',
          }}
          borderRadius="8px"
          h={115}
          width="80%"
          alignSelf="center"
          fontSize="md"
          fontFamily="Poppins-Regular"
        />
        <FormControl.ErrorMessage
          _text={{
            fontSize: 'xs',
          }}>
          Error Name
        </FormControl.ErrorMessage>
      </FormControl>
      <AppButton
        marginBottom="20px"
        width="80%"
        title="Submit"
        color={colors.primary}
        onPress={Submit}
        TextColor={colors.white}
      />
    </Box>
    // </ScrollView>
  );
};

export default AddProposal;
