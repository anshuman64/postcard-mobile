// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  topView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  logo: {
    width: 100,
  },
  bottomView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '80%'
  },
  textInput: {
    width: 240,
    fontSize: StyleUtility.scaleFont(16, true),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: StyleUtility.COLORS.grey900,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
    padding: 0,
  },
});
