// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS } from '../utilities/style_utility.js';


//--------------------------------------------------------------------//


export var styles = RN.StyleSheet.create({
  style: {
    backgroundColor: 'white'
  },
  indicatorStyle: {
    backgroundColor: COLORS.appleBlue
  },
  labelStyle: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
  },
})
