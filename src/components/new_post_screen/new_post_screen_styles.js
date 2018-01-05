// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50
  },
  textInput: {
    flex: 1,
    width: '100%',
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: StyleUtility.scaleFont(18),
    textAlign: 'left',
    textAlignVertical: 'top',
    padding: 20,
    marginTop: (RN.Platform.OS === 'ios') ? 20 : 0, // paddingTop on iOS isn't working for some reason
    backgroundColor: StyleUtility.COLORS.grey50
  },
  smallBodyText: {
    fontSize: StyleUtility.scaleFont(14),
  },
  image: {
    flex: 1,
    width: StyleUtility.DEVICE_DIM.width * 0.8,
    height: StyleUtility.DEVICE_DIM.width * 0.8,
    backgroundColor: StyleUtility.COLORS.grey800
  },
  imageButtonView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: StyleUtility.COLORS.grey200
  },
  imageButtonIcon: {
    fontSize: 25,
    marginLeft: 20,
    color: StyleUtility.COLORS.appleBlue
  },
  imageButtonText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: StyleUtility.scaleFont(16),
    marginLeft: 15,
    color: StyleUtility.COLORS.appleBlue
  },
});
