import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Screen } from '../enums/Screen';
import getQualityIcon from '../utils/getQualityIcon';

interface Props {
  items: string[];
}

const Navigation = ({ items }: Props) => {
  const [currentRoute, setCurrentRoute] = useState<Screen>(Screen.Favoris);
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {}, []);

  const navigate = (routeName: Screen): void => {
    setCurrentRoute(routeName);
    return navigation.navigate(routeName);
  };

  return (
    <View style={[styles.navigation, { backgroundColor: colors.primary }]}>
      {[Screen.Favoris, ...items].map((c) => (
        <IconButton
          key={`navigation-${c}`}
          style={styles.button}
          color="white"
          icon={() => (
            <Icon
              {...getQualityIcon(c)}
              color={`rgba(255, 255, 255, ${currentRoute === c ? '1' : '.2'})`}
            />
          )}
          onPress={() => navigate(c)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 20,
  },
});

export default memo(Navigation);
