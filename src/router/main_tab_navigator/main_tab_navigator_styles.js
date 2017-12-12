// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS } from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//

export var styles = RN.StyleSheet.create({
  style: {
    backgroundColor: 'white'
  },
  icon: {
    fontSize: scaleFont(8),
    color: COLORS.grey900,
  },
  iconFocused: {
    color: COLORS.appleBlue
  }
})
