import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  poster,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {addMovie, updateMovie} from '../redux/action';

const DetailsScreen = ({route, navigation}) => {
  const id = route?.params?.id;
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [plot, setPlot] = useState('');
  const [poster, setPoster] = useState('');
  const [trailerLink, setTrailerLink] = useState('');

  const movieList = useSelector(state => state.film.dataList, shallowEqual);

  // Örnek İçerik detayı eklendi.
  // Konu: Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır.
  // image https://orhangazitv.com/wp-content/uploads/2020/04/kpax-izle-47-819x1024-1.jpg
  // video https://www.youtube.com/watch?v=b98rYy66Idk

  const dispatch = useDispatch();
  const handleSave = () => {
    if (id) {
      dispatch(updateMovie({ID: id, title, year, plot, poster, trailerLink}));
    } else {
      const ID = Date.now();
      dispatch(addMovie({ID, title, year, plot, poster, trailerLink}));
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (!id) return;
    const movie = movieList.find(movie => movie.ID == id);
    setTitle(movie.title);
    setYear(movie.year);
    setPlot(movie.plot);
    setPoster(movie.poster);
    setTrailerLink(movie.trailerLink);
  }, [id]);

  return (
    <View style={styles.root}>
      <Text>Detay</Text>
      <TextInput
        placeholderTextColor="gray"
        placeholder={'Baslik'}
        style={styles.input}
        value={title}
        onChangeText={title => setTitle(title)}
      />
      <TextInput
        placeholderTextColor="gray"
        placeholder={'Yil'}
        style={styles.input}
        value={year}
        onChangeText={year => setYear(year)}
      />
      <TextInput
        placeholderTextColor="gray"
        placeholder={'Konu'}
        style={styles.textArea}
        multiline={true}
        numberOfLines={4}
        value={plot}
        onChangeText={plot => setPlot(plot)}
      />
      <TextInput
        placeholderTextColor="gray"
        placeholder={'Resim'}
        style={styles.input}
        value={poster}
        onChangeText={poster => setPoster(poster)}
      />
      <TextInput
        placeholderTextColor="gray"
        placeholder={'trailerLink'}
        style={styles.input}
        value={trailerLink}
        onChangeText={trailerLink => setTrailerLink(trailerLink)}
      />
      {/* <Button onPress={() => handleSave()} title={'Kaydet'} /> */}
      <Pressable style={styles.buttonPressable} onPress={() => handleSave()}>
        <Text style={styles.textPressable}>Kaydet</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'black',
    flex: 1,
    padding: 32,
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    backgroundColor: '#1a1a1a',
    padding: 8,
    marginBottom: 8,
    borderColor: '#1a1a1a',
    borderWidth: 1,
    borderRadius: 4,
  },
  textArea: {
    color: 'white',
    height: 150,
    backgroundColor: '#1a1a1a',
    justifyContent: 'flex-start',
    borderColor: '#1a1a1a',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
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
    borderColor: 'white',
  },
  textPressable: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DetailsScreen;
