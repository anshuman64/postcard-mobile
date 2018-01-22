// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
  menuItemView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    width: 0.95 * StyleUtility.USABLE_DIM.width,
    marginTop: 15,
    backgroundColor: 'white',
    elevation: 2,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      x: 0,
      y: 0
    }
  },
  menuItemIcon: {
    fontSize: StyleUtility.scaleFont(20),
    marginLeft: 15,
    marginRight: 15,
    color: StyleUtility.COLORS.grey900
  },
  menuItemText: {
    fontSize: StyleUtility.scaleFont(16),
    color: StyleUtility.COLORS.grey900
  },
});
