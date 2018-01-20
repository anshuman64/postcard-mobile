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
    fontFamily: 'SourceSansPro-ExtraLight',
    fontSize: 45,
    position: 'absolute',
    transform: [{translateX: 26}],
    color: '#333333'
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
    borderColor: StyleUtility.COLORS.grey600
  },
  checkboxFilled: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 23,
    width: 23,
    backgroundColor: StyleUtility.COLORS.appleBlue
  },
  checkboxText: {
    width: 220,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey600,
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
    translateX: -51,
    translateY: -5
  }
}

export const translateIcon = {
  0: {
    translateY: -5,
    translateX: -51,
  },
  1: {
    translateY: -213,
    translateX: -51,
  }
}

export const translateLogo = {
  0: {
    translateY: 0,
    translateX: 26,
  },
  1: {
    translateY: -208,
    translateX: 26,
  }
}