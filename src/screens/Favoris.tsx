import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Channel from '../components/Channel';
import Layout from '../components/Layout';
import Spacer from '../components/Spacer';
import { useFavoris } from '../hooks/useFavoris';
import { useApp } from '../states/app';

const FavorisScreen = () => {
  const { clearFavoris } = useFavoris();
  const app = useApp();
  const favoris = app.favoris.data;

  return (
    <Layout
      title="Favoris"
      rightRender={
        favoris &&
        favoris.length > 0 && (
          <Button onPress={clearFavoris} color="white" mode="contained">
            Remove all favoris
          </Button>
        )
      }>
      <View style={styles.spacer} />
      {favoris.length === 0 ? (
        <FavorisEmpty title="Favoris is empty" />
      ) : (
        <ScrollView>
          <View style={styles.list}>
            {favoris.map((f) => (
              <View key={f.name}>
                <Channel item={f} isFavoris />
                <Spacer height={30} />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </Layout>
  );
};

const FavorisEmpty = ({ title }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    paddingLeft: 15,
  },
  emptyText: {
    color: 'white',
    fontWeight: 'bold',
  },
  spacer: { height: 30 },
  list: { flexDirection: 'row', flexWrap: 'wrap' },
});

export default FavorisScreen;
