import { isTablet } from 'react-native-device-info';

type Icons = 'favorite' | 'ondemand-video' | 'sports-football';

const getQualityIcon = (quality: string): Icons => {
  switch (true) {
    case quality.includes('SD'):
      return {
        name: 'sd',
        size: setIconSize(32, 26),
      };
    case quality.includes('4K'):
      return {
        name: '4k',
        size: setIconSize(32, 26),
      };
    case quality.includes('HD'):
      return {
        name: 'hd',
        size: setIconSize(32, 26),
      };
    case quality.includes('HEVC'):
      return {
        name: 'hdr-on',
        size: setIconSize(35, 28),
      };
    case quality.includes('BACK UP'):
      return {
        name: 'save',
        size: setIconSize(28, 25),
      };
    case quality.includes('CINEMA'):
      return {
        name: 'ondemand-video',
        size: setIconSize(28, 25),
      };
    case quality.includes('Sports'):
      return {
        name: 'sports-soccer',
        size: setIconSize(30, 25),
      };
    default:
      return {
        name: 'favorite',
        size: 28,
      };
  }
};

const setIconSize = (tabletSize: number, mobileSize: number): number =>
  isTablet() ? tabletSize : mobileSize;

export default getQualityIcon;
