// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
  codeInput: {
    width: 150,
    height: 50,
    textAlign: 'center',
    fontSize: StyleUtility.scaleFont(24),
    color: StyleUtility.COLORS.grey900,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
    marginTop: 50
  },
  invalidCodeText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
    marginTop: 4
  },
  resendSMSView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 280,
    height: 30,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomColor: StyleUtility.COLORS.grey300,
    borderBottomWidth: 1,
  },
  resendSMSText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey400,
  },
  smsTextActive: {
    color: StyleUtility.COLORS.grey900,
  },
});
