// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS, deviceWidth, deviceHeight } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = RN.StyleSheet.create({
  fullScreen: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey50
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: COLORS.grey50
  },
  icon: {
    width: 40,
    position: 'absolute'
  },
  logo: {
    fontFamily: 'SourceSansPro-Light',
    fontSize: scaleFont(40),
    position: 'absolute',
    color: COLORS.grey900
  },
  countrySelectorView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.6 * deviceWidth,
    height: 40,
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: 1,
    marginTop: 75
  },
  borderHighlighted: {
    borderBottomColor: COLORS.appleBlue,
    borderBottomWidth: 1,
  },
  countrySelectorText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: scaleFont(16),
    textAlign: 'center',
    color: COLORS.grey900,
  },
  dropdownIcon: {
    position: 'absolute',
    left: 0.53 * deviceWidth,
    fontSize: scaleFont(14),
    color: COLORS.grey900
  },
  phoneNumberView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 0.6 * deviceWidth,
    height: 40,
    marginTop: 5
  },
  countryCodeTextView: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 0.17 * deviceWidth,
    height: 40,
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: 1,
  },
  countryCodeText: {
    width: 0.17 * deviceWidth,
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(16),
    textAlign: 'center',
    color: COLORS.grey900,
  },
  phoneNumberInput: {
    width: 0.4 * deviceWidth,
    height: 40,
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(16),
    textAlign: 'center',
    color: COLORS.grey900,
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: 1,
  },
  borderRed: {
    borderBottomColor: COLORS.appleRed,
    borderBottomWidth: 2
  },
  invalidNumberText: {
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 0.275 * deviceWidth,
    fontSize: scaleFont(14),
    textAlign: 'center',
    color: COLORS.appleRed,
  },
  invalidNumberTextTransparent: {
    color: 'transparent'
  },
  nextButtonBackground: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 0.6 * deviceWidth,
    height: 33,
    borderRadius: 3,
    marginTop: 30,
    backgroundColor: COLORS.appleBlue,
  },
  nextButtonBackgroundDisabled: {
    backgroundColor: COLORS.appleBlue + '33',
  },
  nextButtonText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(16),
    fontWeight: '100',
    textAlign: 'center',
    color: 'white',
  },
  nextButtonTextDisabled: {
    color: '#ffffffb3',
  },
  smsNoticeText: {
    width: 0.6 * deviceWidth,
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(12),
    fontWeight: '100',
    textAlign: 'center',
    color: COLORS.grey600,
    textAlign: 'left',
    marginTop: '3%',
  },
});
