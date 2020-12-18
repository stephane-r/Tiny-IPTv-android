type Icons = 'favorite' | 'ondemand-video' | 'sports-football';

const getQualityIcon = (quality: string): Icons => {
  switch (true) {
    case quality.includes('SD'):
      return {
        name: 'sd',
        size: 32,
      };
    case quality.includes('4K'):
      return {
        name: '4k',
        size: 32,
      };
    case quality.includes('HD'):
      return {
        name: 'hd',
        size: 32,
      };
    case quality.includes('HEVC'):
      return {
        name: 'hdr-on',
        size: 35,
      };
    case quality.includes('BACK UP'):
      return {
        name: 'save',
        size: 28,
      };
    case quality.includes('CINEMA'):
      return {
        name: 'ondemand-video',
        size: 28,
      };
    case quality.includes('Sports'):
      return {
        name: 'sports-soccer',
        size: 30,
      };
    default:
      return {
        name: 'favorite',
        size: 28,
      };
  }
};

export default getQualityIcon;
