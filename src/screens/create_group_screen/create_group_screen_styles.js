// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 15;

export const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
  },
  sectionHeaderText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey600,
    marginLeft: 20
  },
  plusButton: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Bold'),
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  }
});
