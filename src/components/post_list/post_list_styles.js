// Library Imports
import React                    from 'react';
import { StyleSheet, Platform } from 'react-native';

// Local Imports
import { PROFILE_HEADER_HEIGHT } from '../profile_header/profile_header_styles.js';
import { HEADER_HEIGHT }         from '../nav_bar_header/header_styles.js';
import { FOOTER_HEIGHT }         from '../nav_bar_footer/footer_styles.js';
import * as StyleUtility         from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//

const FOOTER_TEXT_WIDTH = StyleUtility.scaleFont(200);

export const styles = StyleSheet.create({
  postList: {
    width: '100%',
    height: StyleUtility.getUsableDimensions().height - HEADER_HEIGHT - FOOTER_HEIGHT - StyleUtility.getStatusBarHeight(),
    backgroundColor: StyleUtility.COLORS.grey50,
  },
  postListLongHeight: {
    height: StyleUtility.getUsableDimensions().height - HEADER_HEIGHT - StyleUtility.getStatusBarHeight()
  },
  headerView: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: PROFILE_HEADER_HEIGHT,
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  footerText: {
    width: FOOTER_TEXT_WIDTH,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: 14,
    textAlign: 'center',
    color: StyleUtility.COLORS.grey500
  },
  horizontalLine: {
    alignSelf: 'flex-start',
    width: (StyleUtility.getUsableDimensions().width - FOOTER_TEXT_WIDTH) / 2 - 20, // Device width minus footerText width over 2 minus aesthetic value
    height: '50%',
    borderBottomWidth: 1,
    borderBottomColor: StyleUtility.COLORS.grey200
  },
});
