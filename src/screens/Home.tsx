import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Screen } from '../enums/Screen';
import TabScreen from './Tab';
import useAuth from '../hooks/useAuth';
import { useApp } from '../states/app';

const Tab = createMaterialTopTabNavigator();

const TAB_BAR_OPTIONS = {
  scrollEnabled: true,
  tabStyle: {
    width: 100,
  },
  showIcon: true,
  showLabel: false,
};

const HomeScreen: React.FC = ({ navigation }) => {
  const app = useApp();
  const { logout } = useAuth();

  return (
    <View style={styles.body}>
      <Button title="Logout" onPress={logout} />
      <Button
        title="Favoris"
        onPress={() => navigation.navigate(Screen.Favoris)}
      />
      {app?.categories ? (
        <Tab.Navigator lazy tabBarOptions={TAB_BAR_OPTIONS}>
          {app.categories.map((c) => (
            <Tab.Screen
              key={c}
              name={c}
              component={TabScreen}
              options={{
                tabBarIcon: () => <Icon name="api" size={25} color="#000" />,
              }}
              initialParams={{
                data: app.data[c],
              }}
            />
          ))}
        </Tab.Navigator>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  video: {
    width: 300,
    height: 200,
  },
});

export default HomeScreen;
