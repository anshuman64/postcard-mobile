// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 10;

export const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerItemView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: StyleUtility.getUsableDimensions().width - 2 * DEFAULT_MARGIN,
    height: 60,
    marginLeft: DEFAULT_MARGIN,
    marginRight: DEFAULT_MARGIN,
    borderBottomWidth: 1,
    borderBottomColor: StyleUtility.COLORS.grey200
  },
  headerItemIcon: {
    fontSize: 24,
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
    marginLeft: DEFAULT_MARGIN,
    marginRight: 20
  },
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
