// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
  },
  sectionHeaderText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: StyleUtility.scaleFont(16),
    fontWeight: '400',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey700,
    marginLeft: 20
  },
  icon: {
    width: 30,
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
  },
  textInput: {
    width: 150,
    height: 30,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
    marginLeft: 15,
    padding: 0,
  },
});
