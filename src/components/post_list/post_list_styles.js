// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { PROFILE_HEADER_HEIGHT } from '../profile_header/profile_header_styles.js';
import * as StyleUtility         from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50,
  },
  minusHeader: {
    height: StyleUtility.DEVICE_DIM.height - 50 - StyleUtility.STATUSBAR_HEIGHT - 24, // Total height - header - statusBar - random value
  },
  postList: {
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50,
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
    width: 120,
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey500
  },
  horizontalLine: {
    alignSelf: 'flex-start',
    width: (StyleUtility.DEVICE_DIM.width - 120) / 2 - 10 - 15, // Device width minus footerText width over 2, minus post padding, minus aesthetic value
    height: '50%',
    borderBottomWidth: 1,
    borderBottomColor: StyleUtility.COLORS.grey200
  },
});
