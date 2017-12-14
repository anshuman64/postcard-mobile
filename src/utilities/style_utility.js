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
  grey600:    '#757575',
  grey400:    '#bdbdbd',
  grey300:    '#e0e0e0',
  grey50:     '#fafafa',
}
