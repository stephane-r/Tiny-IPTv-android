import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Channel from '../components/Channel';
import Layout from '../components/Layout';
import Spacer from '../components/Spacer';
import { useFavoris } from '../hooks/useFavoris';
import { useApp } from '../states/app';
import { useNavigation } from '@react-navigation/native';
import { isTablet } from 'react-native-device-info';
import { isMobile } from '../constants';
import Subheading from '../components/Subheading';

const FavorisScreen = () => {
  const { addOrRemoveFromFavoris, clearFavoris } = useFavoris();
  const app = useApp();
  const navigation = useNavigation();
  const favoris = app.favoris.data;

  return (
    <Layout title="Favoris">
      <Spacer height={isTablet() ? 30 : 10} />
      {favoris.length === 0 ? (
        <FavorisEmpty title="Favoris is empty" />
      ) : (
        <ScrollView>
          <View style={styles.content}>
            <Subheading>All</Subheading>
            <View style={styles.list}>
              {favoris.map((f) => (
                <View key={f.name}>
                  <Channel
                    item={f}
                    isFavoris
                    addOrRemoveFromFavoris={addOrRemoveFromFavoris}
                    navigation={navigation}
                  />
                  <Spacer height={30} />
                </View>
              ))}
            </View>
            <Spacer width={15} />
            <View style={styles.footer}>
              <Spacer height={20} />
              <Button
                onPress={clearFavoris}
                icon="heart-remove"
                color="white"
                mode="contained">
                Remove all favoris
              </Button>
              <Spacer height={30} />
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textVersion: {
    color: 'white',
  },
  emptyContainer: {
    paddingLeft: 15,
  },
  emptyText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    paddingLeft: isTablet() ? 0 : 5,
  },
  list: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
  },
  footer: {
    width: isMobile ? '100%' : 300,
    paddingLeft: isMobile ? 10 : 15,
    paddingRight: isMobile ? 20 : 0,
  },
});

export default FavorisScreen;
