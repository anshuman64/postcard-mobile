// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont } from '../utilities/style_utility.js';


//--------------------------------------------------------------------//


export var styles = RN.StyleSheet.create({
  style: {
    backgroundColor: '#ffffff'
  },
  indicatorStyle: {
    backgroundColor: '#007aff'
  },
  labelStyle: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
  },
})
