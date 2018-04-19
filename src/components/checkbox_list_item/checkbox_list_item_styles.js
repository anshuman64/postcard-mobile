// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 10;

export const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: StyleUtility.getUsableDimensions().width - 2 * DEFAULT_MARGIN,
    height: 60,
    marginLeft: DEFAULT_MARGIN,
    marginRight: DEFAULT_MARGIN,
    borderBottomWidth: 1,
    borderBottomColor: StyleUtility.COLORS.grey200
  },
  userView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: DEFAULT_MARGIN
  },
  frame: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    marginRight: 5
  },
  icon: {
    width: 36,
    fontSize: 18,
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
  },
  checkboxView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    marginRight: DEFAULT_MARGIN
  },
  checkbox: {
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    borderWidth: 1.5,
    borderColor: StyleUtility.COLORS.grey700,
  },
  checkboxHighlighted: {
    borderColor: StyleUtility.COLORS.appleBlue,
  },
  checkboxRed: {
    borderColor: StyleUtility.COLORS.appleRed,
  },
  checkIcon: {
    fontSize: 28,
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
  }
});