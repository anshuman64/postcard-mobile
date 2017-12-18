// Library Imports
import { PixelRatio } from 'react-native';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


export const scale = (size) => {
  return PixelRatio.getPixelSizeForLayoutSize(size)
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
