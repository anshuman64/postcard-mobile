// Library Imports
import React                    from 'react';
import { StyleSheet, Platform } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    width: '100%',
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: 18,
    textAlign: 'left',
    textAlignVertical: 'top',
    padding: 20,
    marginTop: (Platform.OS === 'ios') ? 20 : 0, // paddingTop on iOS isn't working for some reason
    backgroundColor: StyleUtility.COLORS.grey50,
  },
  smallBodyText: {
    fontSize: 15,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: StyleUtility.COLORS.grey200
  },
  buttonIcon: {
    fontSize: StyleUtility.scaleFont(21),
    marginLeft: 20,
    color: StyleUtility.COLORS.appleBlue
  },
  buttonText: {
    textAlign: 'left',
    marginLeft: 15,
    width: 120
  },
  closeIcon: {
    fontSize: StyleUtility.scaleFont(18),
    marginRight: 10,
    color: StyleUtility.COLORS.appleRed
  },
});
