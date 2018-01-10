// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50
  },
  titleText: {
    fontFamily: 'System',
    fontSize: StyleUtility.scaleFont(18),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
    marginTop: 0.08 * StyleUtility.DEVICE_DIM.height
  },
  subtitleText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
    marginTop: 5
  },
  frame: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    borderWidth: 2,
    borderColor: StyleUtility.COLORS.grey900,
    borderRadius: 200 / 2,
    marginTop: 25,
    zIndex: 1,
  },
  placeholderImage: {
    fontSize: StyleUtility.scaleFont(40),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  },
  image: {
    width: 196,
    height: 196,
    borderRadius: 200 / 2,
  },
  changePhotoText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
    marginTop: 4
  },
  transparentText: {
    color: 'transparent'
  },
 nextButtonBackground: {
   flexDirection: 'column',
   justifyContent: 'center',
   width: 240,
   height: 40,
   borderRadius: 4,
   backgroundColor: StyleUtility.COLORS.appleBlue,
   marginTop: 25
 },
 nextButtonText: {
   fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
   fontSize: StyleUtility.scaleFont(17),
   fontWeight: '100',
   textAlign: 'center',
   color: 'white',
 },
 skipButton: {
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   height: 50,
   width: 100,
 },
 skipButtonText: {
   width: 240,
   fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
   fontSize: StyleUtility.scaleFont(15),
   fontWeight: '100',
   textAlign: 'center',
   color: StyleUtility.COLORS.appleBlue,
 },
});
