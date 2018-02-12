// Library Imports
import React                    from 'react';
import { StyleSheet, Platform } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';
import { HEADER_HEIGHT } from '../header/header_styles.js';

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
    borderBottomColor: StyleUtility.COLORS.grey500,
    borderBottomWidth: 0.5,
  },
  header: {
    height: (Platform.OS === 'ios') ? HEADER_HEIGHT + StyleUtility.getStatusBarHeight() : HEADER_HEIGHT,
    paddingTop: (Platform.OS === 'ios') ? StyleUtility.getStatusBarHeight() : 0,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
})
