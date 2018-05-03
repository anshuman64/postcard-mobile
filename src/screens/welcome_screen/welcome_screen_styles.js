// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  icon: {
    width: 45,
    height: 45,
    position: 'absolute'
  },
  logo: {
    fontFamily: 'SourceSansPro-ExtraLight',
    fontSize: StyleUtility.scaleFont(42),
    position: 'absolute',
    transform: [{translateX: 24}],
    color: StyleUtility.COLORS.grey900
  },
  animatableView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 162
  },
  checkbox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 33,
    height: 33,
    marginRight: 13,
    borderWidth: 1,
    borderColor: StyleUtility.COLORS.grey700
  },
  checkboxHighlighted: {
    borderColor: StyleUtility.COLORS.appleBlue
  },
  checkboxFilled: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    backgroundColor: StyleUtility.COLORS.appleBlue
  },
  checkboxText: {
    width: 220,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey700,
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
    translateX: -75,
    translateY: -5
  }
}

export const translateIcon = {
  0: {
    translateY: -5,
    translateX: -75,
  },
  1: {
    translateY: -200,
    translateX: -75,
  }
}

export const translateLogo = {
  0: {
    translateY: 0,
    translateX: 24,
  },
  1: {
    translateY: -195,
    translateX: 24,
  }
}
