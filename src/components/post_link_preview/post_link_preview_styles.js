// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility  from '../../utilities/style_utility';
import { DEFAULT_MARGIN } from '../post_list_item/post_list_item_styles';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: StyleUtility.getUsableDimensions().width,
    backgroundColor: StyleUtility.COLORS.grey100,
    marginTop: DEFAULT_MARGIN
  },
  mediumContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: DEFAULT_MARGIN
  },
  titleText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: StyleUtility.scaleFont(16),
    fontWeight: '400',
    textAlign: 'left',
    color: StyleUtility.COLORS.grey800,
  },
  urlText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: StyleUtility.scaleFont(13),
    fontWeight: '100',
    textAlign: 'left',
    color: StyleUtility.COLORS.grey800,
    marginTop: 3
  },
});
