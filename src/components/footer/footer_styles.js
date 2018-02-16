// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const FOOTER_HEIGHT = 45;

export const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: FOOTER_HEIGHT,
    backgroundColor: 'white',
    borderTopColor: StyleUtility.COLORS.grey300,
    borderTopWidth: 1,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '19%',
    height: FOOTER_HEIGHT,
  },
  icon: {
    fontSize: StyleUtility.scaleFont(19),
    color: StyleUtility.COLORS.grey900
  },
  iconBig: {
    fontSize: StyleUtility.scaleFont(27),
    color: StyleUtility.COLORS.appleRed,
  },
})
