// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//

const IMAGE_PADDING = 2;
const IMAGE_WIDTH   = StyleUtility.getUsableDimensions().width / 3;
const FOOTER_TEXT_WIDTH = StyleUtility.scaleFont(120);

export const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
  },
  sectionHeaderText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey600,
    marginLeft: 20
  },
});
