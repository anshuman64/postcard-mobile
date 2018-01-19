// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: StyleUtility.isTablet() ? 0.9 * StyleUtility.MAX_TABLET_DIM.width : 0.85 * StyleUtility.DEVICE_DIM.width,
    height: StyleUtility.isTablet() ? 0.9 * StyleUtility.MAX_TABLET_DIM.height : 0.85 * StyleUtility.DEVICE_DIM.height,
    elevation: 50,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: StyleUtility.COLORS.grey50,
  },
  countryListView: {
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50
  },
  selectCountryView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: StyleUtility.COLORS.grey200,
  },
  selectCountryText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontWeight: '400',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
    backgroundColor: StyleUtility.COLORS.grey50
  },
  cancelButtonView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderTopWidth: 1,
    borderTopColor: StyleUtility.COLORS.grey200
  },
  cancelButtonText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
    backgroundColor: StyleUtility.COLORS.grey50
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue
  },
});
