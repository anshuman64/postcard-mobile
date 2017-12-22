// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50
  },
  textInput: {
    width: '100%',
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: StyleUtility.scaleFont(18),
    padding: 20,
    marginTop: (RN.Platform.OS === 'ios') ? 20 : 0, // paddingTop on iOS isn't working for some reason
    backgroundColor: StyleUtility.COLORS.grey50
  },
  smallBodyText: {
    fontSize: StyleUtility.scaleFont(14),
  },
});
