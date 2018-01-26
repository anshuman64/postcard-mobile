// Library Imports
import React                    from 'react';
import { StyleSheet, Platform } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: (Platform.OS === 'ios') ? 50 + StyleUtility.getStatusBarHeight() : 50,
    paddingTop: (Platform.OS === 'ios') ? StyleUtility.getStatusBarHeight() : 0,
    backgroundColor: 'white',
    zIndex: 1
  },
  backView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  border: {
    borderBottomColor: StyleUtility.COLORS.grey500,
    borderBottomWidth: 0.5,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  backIcon: {
    fontSize: 35,
    color: StyleUtility.COLORS.grey900
  },
  settingsIcon: {
    fontSize: 22,
    textAlign: 'center',
    color: StyleUtility.COLORS.grey800
  },
  logo: {
    height: 30,
    width: 150
  },
  noteIcon: {
    fontSize: 21,
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
  },
  shareButton: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: 16,
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
  },
})
