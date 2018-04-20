// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 10;

export const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: DEFAULT_MARGIN
  },
  confirmButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 30,
    borderRadius: 4,
    backgroundColor: StyleUtility.COLORS.appleBlue
  },
  deleteButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 30,
    marginLeft: 5,
    borderRadius: 4,
    backgroundColor: StyleUtility.COLORS.grey50,
    borderColor: StyleUtility.COLORS.grey900,
    borderWidth: 1
  },
});
