// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
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
