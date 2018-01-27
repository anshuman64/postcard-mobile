// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  icon: {
    width: StyleUtility.scaleFont(45),
    height: StyleUtility.scaleFont(45)
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
