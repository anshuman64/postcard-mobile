// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import { FOOTER_TEXT_WIDTH } from './list_footer';
import * as StyleUtility     from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  footerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  footerText: {
    width: StyleUtility.scaleFont(150),
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: 14,
    textAlign: 'center',
    color: StyleUtility.COLORS.grey500
  },
  horizontalLine: {
    alignSelf: 'flex-start',
    width: (StyleUtility.getUsableDimensions().width - StyleUtility.scaleFont(150)) / 2 - 20, // Device width minus footerText width over 2 minus aesthetic value
    height: '50%',
    borderBottomWidth: 1,
    borderBottomColor: StyleUtility.COLORS.grey200
  },
})
