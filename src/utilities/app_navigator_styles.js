// Library Imports
import React                                 from 'react';
import { Platform, StyleSheet, PixelRatio }  from 'react-native';


//--------------------------------------------------------------------//


export const scaleFactor = PixelRatio.get();


export var userTabNavigatorStyles = StyleSheet.create({
  style: {
    backgroundColor: '#ffffff'
  },
  indicatorStyle: {
    backgroundColor: '#212121'
  },
  labelStyle: {
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    color: '#212121'
  },
})

export var mainNavigatorStyles = StyleSheet.create({
  style: {
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    backgroundColor: '#ffffff',
  },
  iconStyle: {
    fontSize: 8 * scaleFactor,
    color: '#222222',
  }
})
