// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';
import { HEADER_HEIGHT } from '../nav_bar_header/header_styles.js';


//--------------------------------------------------------------------//

export const TAB_BAR_HEIGHT = 30;

export const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: TAB_BAR_HEIGHT,
    backgroundColor: 'white',
  },
  header: {
    height: HEADER_HEIGHT,
    borderBottomColor: StyleUtility.COLORS.grey500,
    borderBottomWidth: 0.5,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
})
