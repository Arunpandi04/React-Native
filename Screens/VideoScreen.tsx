import { ScrollView, View, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '../Store/hooks';
import { getAllVidoAsync } from '../Store/Action/video';
import { Video } from '../Types/video';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigator';
import Loading from '../Components/Loader';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const YouTubeScreen = () => {
  const selector = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    dispatch(getAllVidoAsync())
  }, [])
  return (
    <>
      {selector.loading && <Loading />}
      <ScrollView >
        <View style={styles.container}>
          {selector.videos.map((e: Video, index: number) => (
            <Pressable key={index} onPress={() => { navigation.navigate('YouTube', { video: e }) }}>
              <View style={styles.videoContainer}>
                {e.snippet.thumbnails.default.url !== '' && <Image style={styles.logo} source={{ uri: e.snippet.thumbnails.default.url }} />}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>

  )
}

export default YouTubeScreen;

const styles = StyleSheet.create({
  container: {
    //  width:windowWidth,

  },
  videoContainer: {
    backgroundColor: "blue",
    margin: 10

  },
  logo: {
    width: windowWidth - 20,
    height: 250,
    resizeMode: "contain",
  },
});