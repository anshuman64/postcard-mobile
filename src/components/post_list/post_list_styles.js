// Library Imports
import React                    from 'react';
import { StyleSheet, Platform } from 'react-native';

// Local Imports
import { PROFILE_HEADER_HEIGHT } from '../profile_header/profile_header_styles';
import { HEADER_HEIGHT }         from '../header/header_styles';
import { FOOTER_HEIGHT }         from '../footer/footer_styles';
import * as StyleUtility         from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const FOOTER_TEXT_WIDTH = StyleUtility.scaleFont(190);

export const styles = StyleSheet.create({
  postList: {
    width: '100%',
    flex: 1,
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
});
