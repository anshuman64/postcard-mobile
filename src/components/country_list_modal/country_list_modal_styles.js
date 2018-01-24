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
    width: 0.85 * StyleUtility.getUsableDimensions().width,
    height: 0.85 * StyleUtility.getUsableDimensions().height,
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
  cancelButtonView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderTopWidth: 1,
    borderTopColor: StyleUtility.COLORS.grey200
  },
});
