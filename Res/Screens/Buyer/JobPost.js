import React, {useEffect, useState} from 'react';
import {
  CheckIcon,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  Select,
  TextArea,
} from 'native-base';
import colors from '../../res/config/colors';
import AppButton from '../../Components/AppButton';
import Icons from '../../res/icons/icon';
import {cityList, postJobAction} from '../../Redux/Actions';
import {useDispatch, useSelector} from 'react-redux';

const JobPost = ({navigation}) => {
  const [job_title, setJob_Title] = useState();
  const [job_type, setJob_Type] = useState();
  const [quantity, setQuantity] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [unit, setUnit] = useState();
  const [delivery, setDelivery] = useState();
  const [duration, setDuration] = useState();
  const [budget, setBudget] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [isloading, setIsloading] = useState(false);

  const Citydata = useSelector(state => state.citiesData.cities);
  const dispatch = useDispatch();

  // const cityData = Citydata.map(data => {
  //   return (id = data.id);
  // });
  // console.log('cities map data', cityData);
  const data = Citydata;
  console.log('cities in api', data[0]?.cities[1]);

  useEffect(() => {
    dispatch(cityList());
  }, []);

  const Submit = async () => {
    if (job_title.length < 3) {
      alert('Job Title must be greater than 3 characters');
    } else if (job_type === undefined) {
      alert('Job Type is required');
    } else if (quantity === undefined) {
      alert('Quantity is required');
    } else if (height === undefined) {
      alert('Dimensions is required');
    } else if (delivery === undefined) {
      alert('Delivery is required');
    } else if (width === undefined) {
      alert('Width is required');
    } else if (unit === undefined) {
      alert('Unit is required');
    } else if (duration === undefined) {
      alert('Duration is required');
    } else if (budget === undefined) {
      alert('Budget is required');
    } else {
      // console.log();
      setIsloading(true);
      const data = JSON.stringify({
        Title: job_title,
        Type: job_type,
        Quantity: +quantity,
        Height: height,
        Width: width,
        Unit: unit,
        Delivery: delivery,
        Duration: duration,
        Budget: +budget,
        Description: description,
        Location: location,
      });
      console.log(data);
      await dispatch(postJobAction(data));
      setIsloading(false);
      navigation.navigate('Jobs');
      Reset();
    }
  };
  const Reset = () => {
    setBudget();
    setDescription();
    setJob_Title();
    setJob_Type();
    setLocation();
    setQuantity();
    setIsloading(false);
  };
  return (
    <ScrollView
      backgroundColor={colors.white}
      shadow="9"
      height="96%"
      margin="20px"
      contentContainerStyle={{
        justifyContent: 'center',
      }}
      borderRadius="12px">
      <FormControl isRequired>
        <FormControl.Label
          _text={{
            bold: true,
            marginLeft: '40px',
            fontFamily: 'Poppins-Regular',
          }}>
          Job Title
        </FormControl.Label>
        <Input
          placeholder="I need Flex"
          value={job_title}
          onChangeText={value => setJob_Title(value)}
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
        <FormControl.HelperText
          _text={{
            fontSize: 'xs',
            marginLeft: '40px',
          }}>
          Name should contain atleast 3 characters.
        </FormControl.HelperText>
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
          Job Type
        </FormControl.Label>
        <Select
          selectedValue={job_type}
          onValueChange={Value => setJob_Type(Value)}
          accessibilityLabel="Choose JobType"
          placeholder="Choose JobType"
          dropdownIcon={<Icon as={Icons} name="chevron-down" size="lg" />}
          borderRadius="8px"
          height="45px"
          width="80%"
          alignSelf="center"
          fontSize="md"
          fontFamily="Poppins-Regular">
          <Select.Item label="Flex" value="flex" />
          <Select.Item label="Banner" value="banner" />
          <Select.Item label="Digital Marketing" value="digital-marketing" />
          <Select.Item label="Brouchure" value="brochure" />
          <Select.Item label="Flyer" value="flyer" />
          <Select.Item label="Poster" value="poster" />
        </Select>
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
          Quantity
        </FormControl.Label>
        <Input
          _focus={{
            backgroundColor: 'purple.100',
          }}
          placeholder="10"
          value={quantity}
          onChangeText={value => setQuantity(value)}
          focusOutlineColor={colors.logoColor}
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
          Dimensions
        </FormControl.Label>
        <HStack justifyContent="center" w="80%">
          <Input
            placeholder="Height"
            value={height}
            onChangeText={value => setHeight(value)}
            focusOutlineColor={colors.logoColor}
            _focus={{
              backgroundColor: 'purple.100',
            }}
            borderRadius="8px"
            height="45px"
            width="25%"
            marginRight="10px"
            alignSelf="center"
            fontSize="md"
            fontFamily="Poppins-Regular"
          />
          <Input
            placeholder="Width"
            value={width}
            onChangeText={value => setWidth(value)}
            focusOutlineColor={colors.logoColor}
            _focus={{
              backgroundColor: 'purple.100',
            }}
            borderRadius="8px"
            height="45px"
            width="25%"
            marginRight="10px"
            alignSelf="center"
            fontSize="md"
            fontFamily="Poppins-Regular"
          />
          <Select
            selectedValue={unit}
            onValueChange={Value => setUnit(Value)}
            accessibilityLabel="Choose Category"
            placeholder="Unit"
            dropdownIcon={<Icon as={Icons} name="chevron-down" size="lg" />}
            borderRadius="8px"
            height="45px"
            width="247%"
            alignSelf="center"
            fontSize="md"
            fontFamily="Poppins-Regular">
            <Select.Item label="Inches" value="inch" />
            <Select.Item label="Feet" value="foot" />
          </Select>
        </HStack>

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
          Delivery Time
        </FormControl.Label>
        <HStack justifyContent="center" w="80%">
          <Input
            placeholder="3"
            value={delivery}
            onChangeText={value => setDelivery(value)}
            focusOutlineColor={colors.logoColor}
            _focus={{
              backgroundColor: 'purple.100',
            }}
            borderRadius="8px"
            height="45px"
            width="55%"
            marginRight="10px"
            alignSelf="center"
            fontSize="md"
            fontFamily="Poppins-Regular"
          />
          <Select
            selectedValue={duration}
            onValueChange={Value => setDuration(Value)}
            accessibilityLabel="Choose Category"
            placeholder="Duration"
            dropdownIcon={<Icon as={Icons} name="chevron-down" size="lg" />}
            borderRadius="8px"
            height="45px"
            width="250%"
            alignSelf="center"
            fontSize="md"
            fontFamily="Poppins-Regular">
            <Select.Item label="Hours" value="hours" />
            <Select.Item label="Days" value="days" />
            <Select.Item label="Months" value="months" />
            <Select.Item label="Years" value="years" />
          </Select>
        </HStack>
      </FormControl>

      <FormControl isRequired>
        <FormControl.Label
          _text={{
            bold: true,
            marginLeft: '40px',
          }}>
          Estimated Budget
        </FormControl.Label>
        <Input
          _focus={{
            backgroundColor: 'purple.100',
          }}
          placeholder="15000"
          value={budget}
          onChangeText={value => setBudget(value)}
          focusOutlineColor={colors.logoColor}
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
          Location
        </FormControl.Label>
        <Select
          selectedValue={location}
          onValueChange={Value => setLocation(Value)}
          accessibilityLabel="Choose Location"
          placeholder="Choose Location"
          dropdownIcon={<Icon as={Icons} name="chevron-down" size="lg" />}
          borderRadius="8px"
          height="45px"
          width="80%"
          alignSelf="center"
          fontSize="md"
          fontFamily="Poppins-Regular">
          {data[0]?.cities.map(item => (
            <Select.Item
              // key={item.id}
              label={item.label}
              value={item.value}
            />
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormControl.Label
          _text={{
            bold: true,
            marginLeft: '40px',
          }}>
          Description
        </FormControl.Label>
        <TextArea
          _focus={{
            backgroundColor: 'purple.100',
          }}
          placeholder="Detail about Job"
          value={description}
          onChangeText={value => setDescription(value)}
          focusOutlineColor={colors.logoColor}
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
        marginBottom="10px"
        isLoading={isloading}
        isLoadingText="Submitting"
        TextColor={colors.white}
        width="80%"
        title="Post Job"
        color={colors.primary}
        onPress={Submit}
      />
    </ScrollView>
  );
};

export default JobPost;
