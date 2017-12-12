// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS } from '../utilities/style_utility.js';


//--------------------------------------------------------------------//


export var styles = RN.StyleSheet.create({
  headerTitle: {
    height: '100%'

  },
  backIcon: {
    height: '100%',
    width: scale(22),
    fontSize: scaleFont(15),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey900,
  },
  optionsIcon: {
    height: '100%',
    width: scale(20),
    fontSize: scaleFont(14),
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  noteIcon: {
    height: '100%',
    width: scale(22),
    fontSize: scaleFont(14),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.appleBlue,
  },
})
