// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

const DEFAULT_HEIGHT = 50;

export const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 55,
  },
  countrySelectorView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    height: DEFAULT_HEIGHT,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
  },
  countrySelectorTextWidth: {
    width: 180,
  },
  dropdownIcon: {
    fontSize: 16,
    position: 'absolute',
    left: 210,
    color: StyleUtility.COLORS.grey900
  },
  phoneNumberView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 240,
    height: DEFAULT_HEIGHT,
    marginTop: 10
  },
  countryCodeTextView: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 60,
    height: DEFAULT_HEIGHT,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
  },
  phoneNumberInput: {
    width: 165,
    height: DEFAULT_HEIGHT,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: 18,
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
  },
  invalidNumberTextView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 240,
    marginTop: 4,
  },
  invalidNumberText: {
    width: 165,
    fontSize: 15,
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
  },
  smsNoticeText: {
    width: 240,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: 14,
    textAlign: 'left',
    color: StyleUtility.COLORS.grey600,
    marginTop: 15,
  },
});
