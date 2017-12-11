// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont } from '../utilities/style_utility.js';


//--------------------------------------------------------------------//


export var styles = RN.StyleSheet.create({
  backIcon: {
    height: '100%',
    width: scale(22),
    fontSize: scaleFont(15),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
  },
  optionsIcon: {
    height: '100%',
    width: scale(20),
    fontSize: scaleFont(7),
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  noteIcon: {
    height: '100%',
    width: scale(22),
    fontSize: scaleFont(8),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#007aff',
  },
})
