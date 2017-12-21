// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50,
  },
  menuItemView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 200,
    width: '100%',
    height: 20,
  },
  menuItemIcon: {
    fontSize: StyleUtility.scaleFont(20),
    marginRight: 15,
    color: StyleUtility.COLORS.grey900
  },
  menuItemText: {
    fontSize: StyleUtility.scaleFont(16),
    color: StyleUtility.COLORS.grey900
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue
  },
});
