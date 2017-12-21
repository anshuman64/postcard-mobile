// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scaleImage, scaleFont, COLORS } from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//

export var styles = RN.StyleSheet.create({
  style: {
    backgroundColor: 'white'
  },
  icon: {
    fontSize: scaleFont(16),
    color: COLORS.grey900,
  },
  iconFocused: {
    color: COLORS.appleBlue
  }
})
