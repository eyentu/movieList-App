import {React} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import YoutubePlayer from 'react-native-youtube-iframe';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {film} = useSelector(state => state);
  return (
    <View>
      <YoutubePlayer
        webViewProps={1}
        height={500}
        play={false}
        videoId={film.name.split('=')[1]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;
