import React from 'react';
import {
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  Select,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import AppButton from '../../Components/AppButton';
import colors from '../../res/config/colors';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import Icons from '../../res/icons/icon';
import {postGigAction} from '../../Redux/Actions';
import {launchImageLibrary} from 'react-native-image-picker';

const AddGig = ({navigation}) => {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [unit, setUnit] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [delivery, setDelivery] = useState();
  const [duration, setDuration] = useState();
  const [images, setImages] = useState();
  const dispatch = useDispatch();
  console.log('images', images);

  const Submit = () => {
    if (title === undefined) {
      alert('Job Title is required');
    } else if (category === undefined) {
      alert('Job Type is required');
    } else if (quantity === undefined) {
      alert('Quantity is required');
    } else if (height === undefined) {
      alert('Dimensions is required');
    } else if (price === undefined) {
      alert('Budget is required');
    } else if (delivery === undefined) {
      alert('Delivery is required');
    } else if (width === undefined) {
      alert('Width is required');
    } else if (unit === undefined) {
      alert('Unit is required');
    } else if (duration === undefined) {
      alert('Duration is required');
    } else {
      uploadImage().then(res => {
        console.log(res);
        const data = JSON.stringify({
          title: title,
          category: category,
          quantity: quantity,
          height: height,
          width: width,
          unit: unit,
          duration: duration,
          price: price,
          description: description,
          delivery: delivery,
          images: res,
        });
        dispatch(postGigAction(data));
        console.log(data);

        navigation.navigate('SellerGigs');
        Reset();
      });
    }
  };
  const Reset = () => {
    setPrice();
    setDescription();
    setHeight();
    setTitle();
    setCategory();
    setDelivery();
    setQuantity();
    setImages();
  };
  const openGallery = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('user Cancelled image picker');
      } else if (response.errorMessage) {
        console.log('image picker error', response.errorMessage);
      } else {
        const source = {
          uri: response.assets[0].uri,
          fileName: response.assets[0].fileName,
          type: response.assets[0].type,
        };
        console.log('source', source);
        setImages(source);
      }
    });
  };
  const uploadImage = async => {
    console.log('images in uploadimage', images);
    const image_url = [];
    const data = new FormData();
    return new Promise((resolve, reject) => {
      data.append('upload_preset', 'advertspot');
      data.append('cloud_name', 'dwdozndtq');
      data.append('file', {
        uri: images.uri,
        type: images.type,
        name: images.fileName,
      });
      fetch('https://api.cloudinary.com/v1_1/dwdozndtq/image/upload', {
        method: 'post',
        body: data,
      })
        .then(resp => resp.json())
        .then(data => {
          console.log('Inside upload');
          image_url.push(data.url);
          console.log(data);
          resolve(image_url);
        })
        .catch(err => console.log(err));
    });
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
          Title
        </FormControl.Label>
        <Input
          placeholder="I will create flexes for you"
          value={title}
          onChangeText={value => setTitle(value)}
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
          Category
        </FormControl.Label>
        <Select
          selectedValue={category}
          onValueChange={Value => setCategory(Value)}
          accessibilityLabel="Choose Category"
          placeholder="Choose Category"
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
          placeholder="20"
          value={quantity}
          onChangeText={value => setQuantity(value)}
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
          Price
        </FormControl.Label>
        <Input
          placeholder="12000"
          value={price}
          onChangeText={value => setPrice(value)}
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
          Image
        </FormControl.Label>
        <HStack justifyContent="center">
          <Input
            isDisabled
            placeholder={images?.fileName ? images.fileName : 'Choose Image'}
            focusOutlineColor={colors.logoColor}
            _focus={{
              backgroundColor: 'purple.100',
            }}
            borderRadius="8px"
            height="45px"
            width="60%"
            fontSize="md"
            fontFamily="Poppins-Regular"
          />
          <Button w="20%" h="45px" onPress={openGallery}>
            Select
          </Button>
        </HStack>
      </FormControl>
      {/* <Text margin="20px" textAlign="center">
        {images?.fileName}
      </Text> */}
      <FormControl>
        <FormControl.Label
          _text={{
            bold: true,
            marginLeft: '40px',
          }}>
          Description
        </FormControl.Label>
        <TextArea
          placeholder="Description"
          value={description}
          onChangeText={value => setDescription(value)}
          focusOutlineColor={colors.logoColor}
          _focus={{
            backgroundColor: 'purple.100',
          }}
          borderRadius="8px"
          h={95}
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
        width="80%"
        title="Add Gig"
        color={colors.primary}
        onPress={Submit}
        TextColor={colors.white}
      />
    </ScrollView>
  );
};

export default AddGig;
