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
  textInput: {
    width: 240,
    height: 50,
    textAlign: 'left',
    fontSize: StyleUtility.scaleFont(20),
    color: StyleUtility.COLORS.grey900,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
    marginTop: 80
  },
  borderHighlighted: {
    borderBottomColor: StyleUtility.COLORS.appleBlue,
  },
  borderRed: {
    borderBottomColor: StyleUtility.COLORS.appleRed,
  },
  usernameTakenText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
    marginTop: 4
  },
  usernameTakenTextTransparent: {
    color: 'transparent'
  },
  textHighlighted: {
   color: StyleUtility.COLORS.appleBlue,
 },
 nextButtonBackground: {
   flexDirection: 'column',
   justifyContent: 'center',
   width: 240,
   height: 40,
   borderRadius: 4,
   backgroundColor: StyleUtility.COLORS.appleBlue,
   marginTop: 75
 },
 nextButtonBackgroundDisabled: {
   backgroundColor: StyleUtility.COLORS.appleBlue + '33',
 },
 nextButtonText: {
   fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
   fontSize: StyleUtility.scaleFont(18),
   fontWeight: '100',
   textAlign: 'center',
   color: 'white',
 },
 nextButtonTextDisabled: {
   color: '#ffffffb3',
 },
});