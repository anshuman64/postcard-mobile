// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderTopColor: StyleUtility.COLORS.grey300,
    borderTopWidth: 1,
  },
  icon: {
    fontSize: StyleUtility.scaleFont(16),
    color: StyleUtility.COLORS.grey900
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue,
  }
})
