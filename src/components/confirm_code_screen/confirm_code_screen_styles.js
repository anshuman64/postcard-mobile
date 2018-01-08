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
  codeInput: {
    width: 150,
    height: 50,
    textAlign: 'center',
    fontSize: StyleUtility.scaleFont(24),
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
  invalidCodeText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
    marginTop: 4
  },
  transparentText: {
    color: 'transparent'
  },
  resendSMSView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 280,
    height: 30,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomColor: StyleUtility.COLORS.grey300,
    borderBottomWidth: 1,
  },
  resendSMSText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey400,
  },
  smsTextActive: {
    color: StyleUtility.COLORS.grey900,
  },
  textHighlighted: {
   color: StyleUtility.COLORS.appleBlue,
 },
});
