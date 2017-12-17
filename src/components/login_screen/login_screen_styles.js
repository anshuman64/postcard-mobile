// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey50
  },
  text: {
    fontFamily: 'SourceSansPro-ExtraLight',
    fontSize: scaleFont(18),
    color: COLORS.grey900
  },
  topView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: scale(70),
  },
  countrySelectorView: {
    flexDirection: 'row',
    width: scale(100),
    height: scale(16),
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: scale(0.3),
  },
  borderHighlighted: {
    borderBottomColor: COLORS.appleBlue,
    borderBottomWidth: scale(0.6),
  },
  countrySelectorText: {
    width: scale(100),
    height: scale(16),
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey900,
  },
  dropdownIcon: {
    position: 'absolute',
    left: scale(90),
    height: scale(16),
    fontSize: scaleFont(8),
    textAlignVertical: 'center',
    color: COLORS.grey900
  },
  phoneNumberView: {
    flexDirection: 'row',
    width: scale(100),
    height: scale(16),
  },
  countryCodeText: {
    width: '20%',
    height: scale(16),
    marginRight: '3%',
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey900,
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: scale(0.3),
  },
  phoneNumberInput: {
    width: '75%',
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey900,
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: scale(0.3),
  },
  borderRed: {
    borderBottomColor: COLORS.appleRed,
    borderBottomWidth: scale(0.6)
  },
  invalidNumberText: {
    width: '75%',
    height: scale(10),
    fontSize: scaleFont(6),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.appleRed
  },
  nextButtonBackground: {
    width: scale(100),
    height: scale(16),
    borderRadius: scale(5),
    backgroundColor: COLORS.appleBlue
  },
  nextButtonBackgroundDisabled: {
    borderRadius: scale(5),
    backgroundColor: COLORS.appleBlue + '7f',
  },
  nextButtonText: {
    width: scale(100),
    height: scale(16),
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  nextButtonTextDisabled: {
    color: '#ffffff7f',
  },
  smsNoticeText: {
    width: scale(100),
    height: scale(16),
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey600,
    textAlign: 'left',
    marginTop: '3%',
  },
});
