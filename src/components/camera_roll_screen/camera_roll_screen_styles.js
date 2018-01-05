// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50,
  },
  cameraRoll: {
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50,
    position: 'absolute'
  },
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: StyleUtility.DEVICE_DIM.width / 3,
    height: StyleUtility.DEVICE_DIM.width / 3,
  },
  iconBackground: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: StyleUtility.DEVICE_DIM.width / 3 - 2 * 1,
    height: StyleUtility.DEVICE_DIM.width / 3 - 2 * 1,
    backgroundColor: StyleUtility.COLORS.grey900
  },
  imageIcon: {
    fontSize: 40,
    color: StyleUtility.COLORS.grey500,
  },
  image: {
    width: StyleUtility.DEVICE_DIM.width / 3 - 2 * 1,
    height: StyleUtility.DEVICE_DIM.width / 3 - 2 * 1,
    margin: 1
  },
});
