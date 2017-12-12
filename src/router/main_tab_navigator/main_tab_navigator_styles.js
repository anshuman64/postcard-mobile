// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont } from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//

export var styles = RN.StyleSheet.create({
  style: {
    backgroundColor: '#ffffff'
  },
  icon: {
    fontSize: scaleFont(8),
    color: '#212121',
  },
  iconFocused: {
    color: '#007aff'
  }
})
