// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import { scaleImage, scaleFont, COLORS } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  icon: {
    width: 45,
    height: 45
  },
});

export const pulseIcon = {
  from: {
    opacity: 0.4,
    scale: 0.9,
  },
  to: {
    opacity: 1,
    scale: 1,
  },
};
