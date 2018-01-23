// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
  frame: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    marginTop: 25,
  },
  userIcon: {
    fontSize: 160,
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: StyleUtility.getImageBorderRadius(200),
  },
  changePhotoText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(15),
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
   fontSize: StyleUtility.scaleFont(15),
   textAlign: 'center',
   color: StyleUtility.COLORS.appleBlue,
 },
});
