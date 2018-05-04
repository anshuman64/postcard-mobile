// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  dateText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: StyleUtility.scaleFont(15),
    fontWeight: '100',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey700,
  },
});
