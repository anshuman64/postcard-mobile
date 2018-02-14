// Library Imports
import React                    from 'react';
import { StyleSheet, Platform } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 15;

export const styles = StyleSheet.create({
  messageList: {
    width: '100%',
    backgroundColor: StyleUtility.COLORS.grey50,
    marginBottom: 20,
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  textInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: StyleUtility.getUsableDimensions().width,
    borderTopWidth: 1,
    borderTopColor: StyleUtility.COLORS.grey200
  },
  textInput: {
    flex: 1,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'top',
    marginTop: 4,
    marginLeft: 5,
    marginRight: 5
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
    backgroundColor: StyleUtility.COLORS.grey900
  },
  imageButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  imageButtonIcon: {
    textAlign: 'center',
    fontSize: StyleUtility.scaleFont(25),
    color: StyleUtility.COLORS.appleBlue
  },
  sendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  sendButtonIcon: {
    textAlign: 'center',
    fontSize: StyleUtility.scaleFont(20),
    color: StyleUtility.COLORS.appleRed
  },
});
