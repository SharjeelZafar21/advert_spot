import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import colors from '../../res/config/colors';
import Icons from '../../res/icons/icon';
import font from '../../res/config/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {formatDistanceToNowStrict} from 'date-fns';
import Pusher from 'pusher-js/react-native';

const UserChat = ({route}) => {
  const [message, setMessage] = useState('');
  console.log('id from params', route.params.conversationId);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const userData = useSelector(state => state.userProfile.profile);
  const receiverId = route.params.receiverId;
  const scrollViewRef = useRef(null);
  console.log('receiver id in chat', receiverId);

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
  };

  const getMessages = async id => {
    const tokenData = await AsyncStorage.getItem('token');
    console.log(tokenData);
    try {
      const response = await fetch(`http://localhost:5000/message/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: '/',
          Authorization: `bearer ${tokenData}`,
        },
      });
      const result = await response.json();
      console.log('result in action', result);
      setMessages(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // if(cid){
    //   getMessages(cid);
    //   console.log("get messages from url cid", user);
    // }
    if (route.params.conversationId) {
      setConversationId(route.params.conversationId);
      getMessages(route.params.conversationId);
      // console.log('get messages from conversationId', user);
    }
  }, []);
  useEffect(() => {
    console.log('pusher');
    if (conversationId) {
      const pusher = new Pusher('48573c6fb91ca49c9d45', {
        cluster: 'ap2',
        encrypted: true,
      });

      const channel = pusher.subscribe(conversationId);
      channel.bind('message-received', data => {
        setMessages([...messages, data]);
        console.log('pusher new ', data);
        console.log(messages);
        scrollToBottom();
      });

      // const scrollMessagesToBottom = () => {
      //   if (scrollRef.current) {
      //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      //   }
      // };
      // scrollMessagesToBottom();

      return () => {
        pusher.unsubscribe(conversationId);
      };
    }
  }, [messages]);
  const handleSendMessage = async () => {
    if (message) {
      const m = {
        conversationId: conversationId,
        message: message,
        sender: userData.id,
        receiver: receiverId,
      };
      console.log(m);
      const tokenData = await AsyncStorage.getItem('token');
      console.log(tokenData);
      try {
        const response = await fetch(`http://localhost:5000/message`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Accept: '/',
            Authorization: `bearer ${tokenData}`,
          },
          body: JSON.stringify(m),
        });
        const result = await response.json();
        setMessage('');
        console.log('result in action', result);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <VStack h="100%">
      <Box h="88%">
        {messages.length > 0 ? (
          <ScrollView ref={scrollViewRef}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                style={{
                  alignSelf:
                    msg.sender?._id == userData.id ? 'flex-end' : 'flex-start',
                }}>
                <HStack
                  justifyContent="space-between"
                  borderRadius="xl"
                  background={
                    msg.sender?._id == userData.id
                      ? colors.secondary
                      : 'gray.400'
                  }
                  margin="10px">
                  <Text
                    fontSize="lg"
                    fontFamily={font.primary}
                    // minH="35px"
                    maxW="60%"
                    margin="5px"
                    color={colors.white}>
                    {msg.message}
                  </Text>
                  <Text
                    fontFamily={font.primary}
                    fontSize="sm"
                    // color="gray.500"
                    alignSelf="flex-end"
                    margin="5px">
                    {formatDistanceToNowStrict(new Date(msg.createdAt), {
                      addSuffix: true,
                    })}
                  </Text>
                </HStack>
              </Box>
            ))}
          </ScrollView>
        ) : (
          <Text>There is no message</Text>
        )}
      </Box>
      {/* <Box h="15%" backgroundColor={colors.white}> */}
      <HStack justifyContent="space-between">
        <Input
          fontSize="lg"
          fontFamily={font.primary}
          margin="10px"
          w="82%"
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          focusOutlineColor={colors.logoColor}
          _focus={{
            backgroundColor: 'purple.100',
          }}
          borderRadius="2xl"
        />
        <Button
          onPress={handleSendMessage}
          marginRight="10px"
          borderRightRadius="2xl"
          backgroundColor="gray.100">
          <Icon as={Icons} name="send" size="2xl" />
        </Button>
      </HStack>
      {/* </Box> */}
    </VStack>
  );
};

export default UserChat;
