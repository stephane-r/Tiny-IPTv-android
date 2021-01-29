import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useApp, AppState } from '../states/app';
import { setFavoris } from '../states/favoris';
import AsyncStorage from '@react-native-community/async-storage';
import { Playlist } from '../enums/Playlist';
import Player from '../components/Player';
import Menu from '../components/Menu';
import HomeTv from './Home.tv';
import HomeTouch from './Home.touch';

const GRADIENT_COLORS = ['#1d1d1d', '#5a5a5a'];

const HomeScreen: React.FC = ({ navigation }) => {
  const app: AppState = useApp();

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(Playlist.Favoris),
      AsyncStorage.getItem(Playlist.FavorisIds),
    ]).then(([favoris, favorisIds]) => {
      setFavoris({
        ids: JSON.parse(favorisIds) ?? [],
        data: JSON.parse(favoris) ?? [],
      });
    });
  }, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
      colors={GRADIENT_COLORS}>
      <Menu />
      {app?.categories ? (
        Platform.isTV ? (
          <HomeTv data={app.data} categoriesFiltered={app.categoriesFiltered} />
        ) : (
          <HomeTouch
            data={app.data}
            categoriesFiltered={app.categoriesFiltered}
          />
        )
      ) : (
        <Text>Loading data...</Text>
      )}
      <Player navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { flex: 1 },
});

export default HomeScreen;
