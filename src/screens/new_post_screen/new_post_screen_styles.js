// Library Imports
import React                    from 'react';
import { StyleSheet, Platform } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


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
    backgroundColor: StyleUtility.COLORS.grey50
  },
  smallBodyText: {
    fontSize: 15,
  },
  closeButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  closeButtonBackground: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25,
    backgroundColor: StyleUtility.COLORS.grey900 + 'bf',
    borderRadius: 30 / 2,
    marginLeft: 2,
    marginTop: 2
  },
  closeIcon: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: StyleUtility.DEVICE_DIM.width * 0.9,
    height: StyleUtility.DEVICE_DIM.width * 0.9,
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
    fontSize: StyleUtility.scaleFont(25),
    marginLeft: 20,
    color: StyleUtility.COLORS.appleBlue
  },
  imageButtonText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: 16,
    marginLeft: 15,
    color: StyleUtility.COLORS.grey900
  },
});
