// Library Imports
import { Platform, Dimensions, PixelRatio } from 'react-native';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Helper Functions
//--------------------------------------------------------------------//

const isIphoneX = () => {
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

export const DEVICE_DIM = Dimensions.get('window');
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0;
export const MAX_TABLET_DIM = { width: 480, height: 960 };

export const isTablet = () => {
  if (DEVICE_DIM.width < 480 || DEVICE_DIM.height < 960) {
    return false;
  } else {
    return true;
  }
}

export const scaleImage = (size) => {
  return PixelRatio.getPixelSizeForLayoutSize(size);
}

export const scaleFont = (fontSize) => {
  return fontSize * PixelRatio.getFontScale();
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
