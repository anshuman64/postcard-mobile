// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scaleImage, scaleFont, COLORS } from '../utilities/style_utility.js';


//--------------------------------------------------------------------//


export var styles = RN.StyleSheet.create({
  headerTitle: {
    height: '100%'
  },
  backIcon: {
    height: '100%',
    width: scaleImage(22),
    fontSize: scaleFont(15),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey900,
  },
  optionsIcon: {
    height: '100%',
    width: scaleImage(20),
    fontSize: scaleFont(14),
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  noteIcon: {
    height: '100%',
    width: scaleImage(22),
    fontSize: scaleFont(14),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.appleBlue,
  },
})
