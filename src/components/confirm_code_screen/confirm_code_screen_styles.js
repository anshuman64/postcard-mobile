// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS } from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey50
  },
  titleText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Regular',
    fontSize: scaleFont(18),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey900
  },
  subtitleText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(16),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey900,
    marginTop: '1%'
  },
  codeInput: {
    width: scale(60),
    textAlign: 'center',
    fontSize: scaleFont(24),
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: scale(0.3),
  },
  borderHighlighted: {
    borderBottomColor: COLORS.appleBlue,
    borderBottomWidth: scale(0.6)
  },
  borderRed: {
    borderBottomColor: COLORS.appleRed,
    borderBottomWidth: scale(0.6)
  },
  invalidCodeText: {
    height: scale(12),
    width: scale(60),
    fontSize: scaleFont(16),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.appleRed
  },
  resendSMSView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(120),
    height: scale(15),
    paddingLeft: scale(10),
    paddingRight: scale(10),
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: scale(0.3),
  },
  resendSMSText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    height: scale(15),
    fontSize: scaleFont(18),
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: '1%',
    color: COLORS.grey400,
  },
  smsTextActive: {
    color: COLORS.grey900,
  },
  textHighlighted: {
   color: COLORS.appleBlue,
 },
});
