import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChildCard from '../../Components/ChildCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'native-base';
import {actionTypes} from '../../Redux/Action-type';

const BuyerChat = ({navigation}) => {
  const userData = useSelector(state => state.userProfile.profile);
  const [conversations, setConversations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const getMyConversations = async () => {
    const tokenData = await AsyncStorage.getItem('token');
    console.log(tokenData);
    try {
      const response = await fetch(
        `http://localhost:5000/conversation/get-conversations`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: '/',
            Authorization: `bearer ${tokenData}`,
          },
        },
      );
      const result = await response.json();
      console.log('my conversation', result.data);
      setConversations(result.data);
    } catch (err) {
      console.log('error in chat', err);
    }
  };
  useEffect(() => {
    getMyConversations();
  }, []);

  const getName = item => {
    const p = item.filter(i => i._id != userData.id);
    return p[0]?.firstName + ' ' + p[0]?.lastName;
  };
  const getReceiver = item => {
    const p = item.filter(i => i._id != userData.id);
    return p[0]?._id;
  };

  return (
    <View>
      {conversations.length > 0 ? (
        <FlatList
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          keyExtractor={item => item._id}
          data={conversations}
          renderItem={({item}) => (
            <ChildCard
              onPress={() => {
                dispatch({
                  type: actionTypes.SETUSERNAME,
                  payload: getName(item.people),
                });
                navigation.navigate('BUserChat', {
                  conversationId: item._id,
                  receiverId: getReceiver(item.people),
                });
              }}
              IconName="person-circle"
              HeadingName={getName(item.people)}
            />
          )}
        />
      ) : (
        <Text>There is no conversation</Text>
      )}
    </View>
  );
};

export default BuyerChat;
