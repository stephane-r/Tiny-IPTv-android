import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { IconButton, Menu as AppMenu } from 'react-native-paper';
import { Screen } from '../enums/Screen';
import useAuth from '../hooks/useAuth';

const Menu = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const { logout } = useAuth();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const goToSettings = () => {
    closeMenu();
    return navigation.navigate(Screen.Settings);
  };

  return (
    <View style={isTablet() ? styles.containerMedium : styles.containerSmall}>
      <AppMenu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            accessibilityStates={[]}
            icon="dots-vertical"
            color="white"
            size={isTablet() ? 40 : 30}
            onPress={openMenu}
          />
        }>
        <AppMenu.Item
          onPress={goToSettings}
          icon="account-settings"
          title="Settings"
        />
        <AppMenu.Item onPress={logout} icon="logout" title="Logout" />
      </AppMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSmall: {
    position: 'absolute',
    top: 15,
    right: 0,
    zIndex: 2,
  },
  containerMedium: {
    position: 'absolute',
    top: 24,
    right: 15,
    zIndex: 2,
  },
});

export default Menu;
