// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  icon: {
    width: 45,
    height: 45,
    position: 'absolute'
  },
  logo: {
    fontFamily: 'SourceSansPro-Light',
    fontSize: 45,
    position: 'absolute',
    transform: [{translateX: 28}],
    color: '#333333'
  },
  countrySelectorView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    height: 45,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
    marginTop: 150
  },
  countrySelectorText: {
    width: 180,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(18),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
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
    height: 45,
    marginTop: 10
  },
  countryCodeTextView: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 60,
    height: 45,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
  },
  phoneNumberInput: {
    width: 165,
    height: 45,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(18),
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
    height: 30,
  },
  invalidNumberText: {
    width: 165,
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
  },
  smsNoticeText: {
    width: 240,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey600,
    marginTop: 15,
  },
});


export const fadeInIcon = {
  0: {
    opacity: 0,
    translateX: 0,
    translateY: -5
  },
  0.5: {
    opacity: 1,
    translateX: 0,
  },
  1: {
    opacity: 1,
    translateX: -52,
    translateY: -5
  }
}

export const translateIcon = {
  0: {
    translateY: -5,
    translateX: -52,
  },
  1: {
    translateY: -195,
    translateX: -52,
  }
}

export const translateLogo = {
  0: {
    translateY: 0,
    translateX: 28,
  },
  1: {
    translateY: -190,
    translateX: 28,
  }
}
