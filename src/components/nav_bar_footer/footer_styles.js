// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    borderTopColor: StyleUtility.COLORS.grey300,
    borderTopWidth: 1,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 45,
  },
  icon: {
    fontSize: 19,
    color: StyleUtility.COLORS.grey900
  },
})
