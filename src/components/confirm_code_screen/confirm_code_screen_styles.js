// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS, deviceWidth, deviceHeight, STATUSBAR_HEIGHT } from '../../utilities/style_utility.js';


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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderBottomColor: COLORS.grey400,
    borderBottomWidth: 1,
    marginTop: STATUSBAR_HEIGHT
  },
  backIcon: {
    fontSize: 28,
    marginLeft: 10
  },
  titleText: {
    fontFamily: 'System',
    fontSize: scaleFont(16),
    textAlign: 'center',
    color: COLORS.grey900,
    marginTop: 50
  },
  subtitleText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: scaleFont(14),
    textAlign: 'center',
    color: COLORS.grey900,
    marginTop: 5
  },
  codeInput: {
    width: 150,
    height: 50,
    textAlign: 'center',
    fontSize: scaleFont(20),
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: 1,
    marginTop: 30
  },
  borderHighlighted: {
    borderBottomColor: COLORS.appleBlue,
  },
  borderRed: {
    borderBottomColor: COLORS.appleRed,
  },
  invalidCodeText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: scaleFont(14),
    textAlign: 'center',
    color: COLORS.appleRed,
    marginTop: 4
  },
  invalidCodeTextTransparent: {
    color: 'transparent'
  },
  resendSMSView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 270,
    height: scale(15),
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomColor: COLORS.grey300,
    borderBottomWidth: 1,
  },
  resendSMSText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: scaleFont(16),
    textAlign: 'center',
    color: COLORS.grey400,
  },
  smsTextActive: {
    color: COLORS.grey900,
  },
  textHighlighted: {
   color: COLORS.appleBlue,
 },
});
