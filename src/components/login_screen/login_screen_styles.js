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
    backgroundColor: StyleUtility.COLORS.grey50
  },
  icon: {
    width: 40,
    position: 'absolute'
  },
  logo: {
    fontFamily: 'SourceSansPro-Light',
    fontSize: 40,
    position: 'absolute',
    transform: [{translateX: 25}],
    color: '#333333'
  },
  countrySelectorView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 40,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
    marginTop: 75
  },
  borderHighlighted: {
    borderBottomColor: StyleUtility.COLORS.appleBlue,
    borderBottomWidth: 1,
  },
  countrySelectorText: {
    width: 150,
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  },
  dropdownIcon: {
    position: 'absolute',
    left: 180,
    fontSize: 14,
    color: StyleUtility.COLORS.grey900
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue
  },
  phoneNumberView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    height: 40,
    marginTop: 5
  },
  countryCodeTextView: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 50,
    height: 40,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
  },
  countryCodeText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  },
  phoneNumberInput: {
    width: 140,
    height: 40,
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
  },
  borderRed: {
    borderBottomColor: StyleUtility.COLORS.appleRed,
  },
  invalidNumberText: {
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 150,
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
  },
  invalidNumberTextTransparent: {
    color: 'transparent'
  },
  nextButtonBackground: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 200,
    height: 34,
    borderRadius: 4,
    backgroundColor: StyleUtility.COLORS.appleBlue,
  },
  nextButtonBackgroundDisabled: {
    backgroundColor: StyleUtility.COLORS.appleBlue + '33',
  },
  nextButtonText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: StyleUtility.scaleFont(16),
    fontWeight: '100',
    textAlign: 'center',
    color: 'white',
  },
  nextButtonTextDisabled: {
    color: '#ffffffb3',
  },
  smsNoticeText: {
    width: 200,
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: StyleUtility.scaleFont(12),
    fontWeight: '100',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey600,
    textAlign: 'left',
    marginTop: 10,
  },
});
