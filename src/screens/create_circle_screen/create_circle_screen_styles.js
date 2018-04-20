// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 15;

export const styles = StyleSheet.create({
  plusButton: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Bold'),
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  }
});
