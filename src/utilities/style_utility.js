// Library Imports
import { PixelRatio } from 'react-native';


export const scale = (size) => {
  return PixelRatio.getPixelSizeForLayoutSize(size)
}

export const scaleFont = (fontSize) => {
  return fontSize * PixelRatio.getFontScale();
}
