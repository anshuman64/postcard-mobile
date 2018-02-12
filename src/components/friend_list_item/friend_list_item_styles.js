// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 10;
const IMAGE_SIZE = 40;

export const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: StyleUtility.getUsableDimensions().width - 2 * DEFAULT_MARGIN,
    height: 60,
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
  frame: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE
  },
  frameBorder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderWidth: 1.1,
    borderColor: StyleUtility.COLORS.grey800,
    borderRadius: 36 / 2,
  },
  userIcon: {
    fontSize: 17,
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
  },
  avatarImage: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: StyleUtility.getImageBorderRadius(IMAGE_SIZE),
  },
  usernameView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  messageText: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: 15,
    fontWeight: '100',
    textAlign: 'center',
    color: COLORS.grey700,
  },
  dateText: {
    fontFamily: setAndroidFont('Roboto-Light'),
    fontSize: 15,
    fontWeight: '100',
    textAlign: 'center',
    color: COLORS.grey700,
  },
});
