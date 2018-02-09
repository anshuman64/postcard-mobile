// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  userView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  frame: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    marginRight: 7
  },
  frameBorder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderWidth: 1.1,
    borderColor: StyleUtility.COLORS.grey800,
    borderRadius: 37 / 2,
  },
  userIcon: {
    fontSize: 17,
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: StyleUtility.getImageBorderRadius(40),
  },
  usernameText: {
    maxWidth: StyleUtility.scaleImage(60),
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
  },
});
