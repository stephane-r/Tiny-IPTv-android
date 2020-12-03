import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { AppState, Button, StyleSheet, View } from 'react-native';
import { Screen } from '../enums/Screen';
import useAuth from '../hooks/useAuth';
import { useApp } from '../states/app';

const Navigation: React.FC = () => {
  const app: AppState = useApp();
  const { logout } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.body}>
      <Button
        title="All"
        onPress={() => navigation.navigate(app.categories[0])}
      />
      <View style={{ width: 15 }} />
      <Button
        title="Sport"
        onPress={() =>
          navigation.navigate(app.categories[app.categories.length - 1])
        }
      />
      <View style={{ width: 15 }} />
      <Button
        title="Favoris"
        onPress={() => navigation.navigate(Screen.Favoris)}
      />
      <View style={{ width: 15 }} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default Navigation;
