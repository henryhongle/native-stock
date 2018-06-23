import { StyleSheet, Dimensions } from 'react-native';

// base on 5'' screen
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
export const { width, height } = Dimensions.get('window');

export const scale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => size + ((scale(size) - size) * factor);

export const colors = {
  primary: '#226B74',
  secondary: '#254B5A',
  tertiary: '#5DA6A7',
  gray: '#dddddd',
  blue: '#48BBEC',
  red: '#cc0000'
};

export const padding = {
  xs: scale(5),
  sm: scale(10),
  md: scale(20),
  lg: scale(30),
  xl: scale(40)
};

export const fonts = {
  sm: scale(12),
  md: scale(14),
  lg: scale(16),
  primary: 'Cochin'
};

const baseStyles = {
  container: {
    paddingHorizontal: padding.sm,
    paddingVertical: padding.sm,
    width
  },
  header: {
    backgroundColor: 'transparent',
    fontSize: fonts.lg,
    fontFamily: fonts.primary,
    fontWeight: 'bold'
  },
  section: {
    paddingVertical: padding.lg,
    paddingHorizontal: padding.xl
  }
};

export function createStyles(overrides = {}) {
  return StyleSheet.create({ ...baseStyles, ...overrides });
}