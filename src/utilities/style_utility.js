// Library Imports
import RN from 'react-native';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Helpers
//--------------------------------------------------------------------//

// Determines if the phone is an iPhone X
let isIphoneX = () => {
  return RN.Platform.OS === 'ios' && !RN.Platform.isPad && !RN.Platform.isTVOS &&
    (DEVICE_DIM.height === 812 || DEVICE_DIM.width === 812);
};

// Determines if the device is a tablet or not
let isTablet = () => {
  return (DEVICE_DIM.width >= 520 || DEVICE_DIM.height >= 960);
};

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

export const DEFAULT_MARGIN = 10;
export const DEVICE_DIM     = RN.Dimensions.get('window');
export const MAX_TABLET_DIM = { width: 480, height: 960 };

// Apple Color Palette: https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
// Google Color Palette: https://material.io/guidelines/style/color.html#color-color-palette
export const COLORS = {
  appleRed:  '#ff313a',
  appleBlue: '#007aff',
  grey900:   '#212121',
  grey800:   '#424242',
  grey700:   '#616161',
  grey600:   '#757575',
  grey500:   '#9E9E9E',
  grey400:   '#BDBDBD',
  grey300:   '#e0e0e0',
  grey200:   '#EEEEEE',
  grey100:   '#F5F5F5',
  grey50:    '#fafafa'
};

// Determines a usable area depending on if the device is a tablet or not
export const getUsableDimensions = () => {
  return isTablet() ? MAX_TABLET_DIM : DEVICE_DIM;
};

export const getStatusBarHeight = () => {
  return RN.Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 24;
};

// Scales image by PixelSize
export const scaleImage = (size) => {
  return RN.PixelRatio.getPixelSizeForLayoutSize(size);
};

// Scales font by fontScale
export const scaleFont = (fontSize) => {
  return fontSize * RN.PixelRatio.getFontScale();
};

// Sets Android font but uses System for iOS
export const setAndroidFont = (fontFamily) => {
  return RN.Platform.OS === 'ios'? 'System' : fontFamily;
};

// Sets image border radius with correction for Android
export const getImageBorderRadius = (dimensions) => {
  return RN.Platform.OS === 'ios' ? dimensions / 2 : 10000;
};

export const UTILITY_STYLES = RN.StyleSheet.create({
  // Container Styles
  containerCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey50
  },
  containerStart: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey50
  },

  // Highlight Styles
  textHighlighted: {
    color: COLORS.appleBlue
  },
  textRed: {
    color: COLORS.appleRed
  },
  transparentText: {
    color: 'transparent'
  },
  borderHighlighted: {
    borderBottomColor: COLORS.appleBlue,
    borderBottomWidth: 1,
  },
  borderRed: {
    borderBottomColor: COLORS.appleRed,
    borderBottomWidth: 1,
  },

  // Regular Black Text Styles
  regularBlackText18: {
    fontFamily: setAndroidFont('Roboto-Regular'),
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.grey900,
  },
  regularBlackText16: {
    fontFamily: setAndroidFont('Roboto-Regular'),
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.grey900,
  },
  regularBlackText15: {
    fontFamily: setAndroidFont('Roboto-Regular'),
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.grey900,
  },

  // Light Black Text Styles
  lightBlackText18: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: 18,
    fontWeight: '100',
    textAlign: 'center',
    color: COLORS.grey900,
  },
  lightBlackText16: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: 16,
    fontWeight: '100',
    textAlign: 'center',
    color: COLORS.grey900,
  },
  lightBlackText15: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: 15,
    fontWeight: '100',
    textAlign: 'center',
    color: COLORS.grey900,
  },

  // Light White Text RN.StyleSheet
  lightWhiteText18: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: 18,
    fontWeight: '100',
    textAlign: 'center',
    color: 'white',
  },
  lightWhiteText16: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: 16,
    fontWeight: '100',
    textAlign: 'center',
    color: 'white',
  },
  lightWhiteText15: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: 15,
    fontWeight: '100',
    textAlign: 'center',
    color: 'white',
  },

  // Next Button Styles
  nextButtonBackground: {
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   width: 240,
   height: 40,
   borderRadius: 4,
   backgroundColor: COLORS.appleBlue,
  },
  nextButtonBackgroundDisabled: {
   backgroundColor: COLORS.appleBlue + '40',
  },
  nextButtonTextDisabled: {
   color: '#ffffffb3',
  },

  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: getUsableDimensions().width - 2 * DEFAULT_MARGIN,
    height: 70,
    marginLeft: DEFAULT_MARGIN,
    marginRight: DEFAULT_MARGIN,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey200
  },

  // Margin Styles
  marginTop50: {
   marginTop: 50
  },
  marginTop5: {
   marginTop: 5
  },
  marginLeft5: {
   marginLeft: 5
  }
});
