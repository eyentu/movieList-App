/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
// import type { PropsWithChildren } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {setName, setDataList, deleteMovide} from '../redux/action';
import dataList from '../data.json';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
  Image,
  View,
  TouchableHighlight,
  Alert,
  Button,
  Pressable,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Main = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const data = useSelector(state => state.film.dataList, shallowEqual);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const showAlert = movieId =>
    Alert.alert('Dikkat', 'Silmek istediğinizden emin misiniz?', [
      {
        text: 'İptal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Sil',
        onPress: () => handleDelete(movieId),
        style: 'destructive',
      },
    ]);

  const handleDelete = movieId => {
    dispatch(deleteMovide(movieId));
  };

  useEffect(() => {
    dispatch(setDataList(dataList));
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <Button
        color="white"
        title="Film Ekle"
        onPress={() => navigation.navigate('DetailsScreen')}
      />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('DetailsScreen', {id: item.ID});
            }}>
            <View style={styles.container}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{uri: item.poster, height: 150, width: 200}}
              />
              <View style={styles.text}>
                <Text numberOfLines={1} style={styles.header}>
                  {item.ID}. {item.title} ({item.year})
                </Text>

                <Text style={styles.textDetail} numberOfLines={3}>
                  {'\t'}
                  {item.plot}
                </Text>
                <Pressable
                  style={styles.buttonPressable}
                  onPress={() => {
                    dispatch(setName(item.trailerLink));
                    navigation.navigate('TrailerScreen');
                  }}>
                  <Text style={styles.textPressable}>Fragman</Text>
                </Pressable>
              </View>
              <Button
                color="orange"
                style={styles.buttonStyle}
                onPress={() => showAlert(item.ID)}
                title="X"
              />
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={item => item.ID}
        refreshControl={
          <RefreshControl
            tintColor="#fff"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    marginVertical: 10,
    borderRadius: 10,
    // height: 160,
  },
  text: {
    flex: 3,
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 1,
    flexGrow: 1,
  },
  header: {
    fontFamily: 'Helvetica',
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    margin: 10,
  },
  textDetail: {
    justifyContent: 'center',
    fontFamily: 'Helvetica',
    color: 'white',
    fontSize: 12,
    margin: 10,
  },
  button: {
    borderColor: '#1a1a1a',
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonStyle: {
    color: 'red',
    marginTop: 20,
    padding: 20,
    backgroundColor: 'green',
  },
  buttonPressable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: 'black',
    marginLeft: 50,
    width: '70%',
    borderWidth: 2,
  },
  textPressable: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Main;
