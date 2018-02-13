// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 10;
const IMAGE_SIZE = 50;

export const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: StyleUtility.getUsableDimensions().width - 2 * DEFAULT_MARGIN,
    height: 70,
    marginLeft: DEFAULT_MARGIN,
    marginRight: DEFAULT_MARGIN,
    borderBottomWidth: 1,
    borderBottomColor: StyleUtility.COLORS.grey200
  },
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
