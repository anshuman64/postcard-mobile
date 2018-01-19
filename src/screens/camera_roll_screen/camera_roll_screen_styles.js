// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//

const IMAGE_PADDING = 2;

export const styles = StyleSheet.create({
  cameraRoll: {
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50,
  },
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'wrap'
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: StyleUtility.DEVICE_DIM.width / 3,
    height: StyleUtility.DEVICE_DIM.width / 3,
    borderWidth: 0,
  },
  iconBackground: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: StyleUtility.DEVICE_DIM.width / 3 - 2 * IMAGE_PADDING,
    height: StyleUtility.DEVICE_DIM.width / 3 - 2 * IMAGE_PADDING,
    backgroundColor: StyleUtility.COLORS.grey800
  },
  imageIcon: {
    fontSize: 40,
    color: StyleUtility.COLORS.grey500,
  },
  image: {
    width: StyleUtility.DEVICE_DIM.width / 3 - 2 * IMAGE_PADDING,
    height: StyleUtility.DEVICE_DIM.width / 3 - 2 * IMAGE_PADDING,
    margin: 1,
    position: 'absolute',
  },
  imageHighlighted: {
    borderWidth: 2,
    borderColor: StyleUtility.COLORS.appleBlue
  },
});
