import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import formatDistance from '../helpers/formatDistanceCustom';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTweets();
  }, []);

  function getAllTweets() {
    axios
      .get('http://8414-88-147-48-141.ngrok.io/api/tweets')
      .then(response => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const renderItem = ({ item: tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => gotoProfile()}>
        <Image style={styles.avatar} source={{ uri: tweet.user.avatar }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => gotoSigleTweet()}
        >
          <Text numberOfLines={1} style={styles.tweetName}>
            {tweet.user.name}
          </Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            @{tweet.user.username}
          </Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            {/* {formatDistanceToNowStrict(new Date(tweet.created_at))} */}
            {formatDistanceToNowStrict(new Date(tweet.created_at), {
              locale: {
                ...locale,
                formatDistance,
              },
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tweetContentContainer}
          onPress={() => gotoSigleTweet()}
        >
          <Text style={styles.tweetContent}>{tweet.body}</Text>
        </TouchableOpacity>
        <View style={styles.tweetEngagement}>
          <TouchableOpacity style={styles.flexRow}>
            <EvilIcons
              name="comment"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>456</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons
              name="retweet"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>32</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons
              name="heart"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>4,456</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons
              name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.tweetSeparator}></View>
        )}
      />
      <AntDesign
        name="pluscircle"
        size={60}
        style={styles.floatingButton}
        onPress={() => gotoNewTweet()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexRow: {
    flexDirection: 'row',
  },
  tweetContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tweetSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    borderRadius: 21,
  },
  tweetName: {
    fontWeight: 'bold',
    color: '#222222',
  },
  tweetHandle: {
    marginHorizontal: 8,
    color: 'gray',
  },
  tweetContentContainer: {
    marginTop: 4,
  },
  tweetContent: {
    lineHeight: 20,
  },
  textGray: {
    color: 'gray',
  },
  tweetEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  floatingButton: {
    color: '#1d9bf1',
    position: 'absolute',
    bottom: 40,
    right: 12,
  },
  ml4: {
    marginLeft: 16,
  },
});
