import { Platform } from 'react-native';
import { isTablet } from 'react-native-device-info';

export const isMobile = !isTablet() && !Platform.isTV;
