// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50
  },
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
  borderHighlighted: {
    borderBottomColor: StyleUtility.COLORS.appleBlue,
    borderBottomWidth: 1,
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
    position: 'absolute',
    left: 210,
    fontSize: 16,
    color: StyleUtility.COLORS.grey900
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue
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
  countryCodeText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(18),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
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
  borderRed: {
    borderBottomColor: StyleUtility.COLORS.appleRed,
  },
  invalidNumberTextView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 30,
    width: 240,
  },
  invalidNumberText: {
    width: 165,
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
  },
  transparentText: {
    color: 'transparent'
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
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: StyleUtility.scaleFont(18),
    fontWeight: '100',
    textAlign: 'center',
    color: 'white',
  },
  nextButtonTextDisabled: {
    color: '#ffffffb3',
  },
  smsNoticeText: {
    width: 240,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: StyleUtility.scaleFont(14),
    fontWeight: '100',
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
