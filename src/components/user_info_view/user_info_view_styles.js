// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 15;

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
    marginRight: 5
  },
  userIcon: {
    fontSize: 24,
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: StyleUtility.getImageBorderRadius(40),
  },
});
