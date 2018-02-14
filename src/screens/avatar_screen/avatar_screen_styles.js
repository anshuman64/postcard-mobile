// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  changePhotoText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: 15,
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
  },
 skipButton: {
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   height: 50,
   width: 100,
 },
 skipButtonText: {
   fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
   fontWeight: '100',
   fontSize: 15,
   textAlign: 'center',
   color: StyleUtility.COLORS.appleBlue,
 },
});
