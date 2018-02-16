// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  userView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  usernameText: {
    maxWidth: StyleUtility.scaleImage(60),
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
    marginLeft: 7
  },
});
