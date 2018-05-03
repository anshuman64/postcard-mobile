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
  usernameView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 7
  },
  messageText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: 15,
    fontWeight: '100',
    textAlign: 'left',
    color: StyleUtility.COLORS.grey700,
  },
});
