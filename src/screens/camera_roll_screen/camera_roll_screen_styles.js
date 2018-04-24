// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const IMAGE_PADDING = 2;
const IMAGE_WIDTH   = StyleUtility.getUsableDimensions().width / 3;

export const styles = StyleSheet.create({
  cameraRoll: {
    width: StyleUtility.getUsableDimensions().width,
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50,
  },
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    width: '100%'
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderWidth: 0,
  },
  iconBackground: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: IMAGE_WIDTH - 2 * IMAGE_PADDING,
    height: IMAGE_WIDTH - 2 * IMAGE_PADDING,
    backgroundColor: StyleUtility.COLORS.grey800
  },
  imageIcon: {
    fontSize: 40,
    color: StyleUtility.COLORS.grey500,
  },
  image: {
    width: IMAGE_WIDTH - 2 * IMAGE_PADDING,
    height: IMAGE_WIDTH - 2 * IMAGE_PADDING,
    margin: 1,
    position: 'absolute',
  },
  imageHighlighted: {
    borderWidth: 2,
    borderColor: StyleUtility.COLORS.appleBlue
  },
});
