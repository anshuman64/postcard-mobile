// Library Imports
import { Platform, Dimensions, PixelRatio, StyleSheet } from 'react-native';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const DEVICE_DIM = Dimensions.get('window');
export const MAX_TABLET_DIM = { width: 480, height: 960 };
export const USABLE_DIM = isTablet ? MAX_TABLET_DIM : DEVICE_DIM; // Determines a usable area depending on if the device is a tablet or not
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0;

//--------------------------------------------------------------------//
// Helper Functions
//--------------------------------------------------------------------//

// Determines if the phone is an iPhone X
let isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (DEVICE_DIM.height === 812 || DEVICE_DIM.width === 812)
  );
}

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Determines if the device is a tablet or not
export const isTablet = () => {
  if (DEVICE_DIM.width < 480 || DEVICE_DIM.height < 960) {
    return false;
  } else {
    return true;
  }
}

// Scales image by PixelSize
export const scaleImage = (size) => {
  return PixelRatio.getPixelSizeForLayoutSize(size);
}

// Scales font by fontScale
export const scaleFont = (fontSize) => {
  return fontSize * PixelRatio.getFontScale();
}

// Sets Android font but uses System for iOS
export const setAndroidFont = (fontFamily) => {
  return Platform.OS === 'ios'? 'System' : fontFamily;
}

// Sets image border radius with correction for Android
export const getImageBorderRadius = (dimensions) => {
  return Platform.OS === 'ios' ? dimensions / 2 : 10000;
}

// Apple Color Palette: https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
// Google Color Palette: https://material.io/guidelines/style/color.html#color-color-palette
export const COLORS = {
  appleRed:   '#ff313a',
  appleBlue:  '#007aff',
  grey900:    '#212121',
  grey800:    '#424242',
  grey700:    '#616161',
  grey600:    '#757575',
  grey500:    '#9E9E9E',
  grey400:    '#BDBDBD',
  grey300:    '#e0e0e0',
  grey200:    '#EEEEEE',
  grey100:    '#F5F5F5',
  grey50:     '#fafafa',
}

export const UTILITY_STYLES = StyleSheet.create({
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
    fontSize: scaleFont(18),
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.grey900,
  },
  regularBlackText16: {
    fontFamily: setAndroidFont('Roboto-Regular'),
    fontSize: scaleFont(16),
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.grey900,
  },
  regularBlackText15: {
    fontFamily: setAndroidFont('Roboto-Regular'),
    fontSize: scaleFont(15),
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.grey900,
  },

  // Light Black Text Styles
  lightBlackText18: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: scaleFont(18),
    fontWeight: '100',
    textAlign: 'center',
    color: COLORS.grey900,
  },
  lightBlackText16: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: scaleFont(16),
    fontWeight: '100',
    textAlign: 'center',
    color: COLORS.grey900,
  },
  lightBlackText14: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: scaleFont(14),
    fontWeight: '100',
    textAlign: 'center',
    color: COLORS.grey900,
  },

  // Light White Text StyleSheet
  lightWhiteText18: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: scaleFont(18),
    fontWeight: '100',
    textAlign: 'center',
    color: 'white',
  },
  lightWhiteText16: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: scaleFont(18),
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
   backgroundColor: COLORS.appleBlue + '33',
 },
 nextButtonTextDisabled: {
   color: '#ffffffb3',
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
