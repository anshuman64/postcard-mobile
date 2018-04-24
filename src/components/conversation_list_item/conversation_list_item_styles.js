// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 10;
const IMAGE_SIZE = 50;

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
    width: 200,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: 15,
    fontWeight: '100',
    textAlign: 'left',
    color: StyleUtility.COLORS.grey700,
  },
  dateText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: 15,
    fontWeight: '100',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey700,
  },
});
