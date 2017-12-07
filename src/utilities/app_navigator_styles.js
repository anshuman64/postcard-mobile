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
    backgroundColor: '#007aff'
  },
  labelStyle: {
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
  },
})

export var homeStackNavigatorStyles = StyleSheet.create({
  headerTitle: {
    alignSelf: 'center',
    width: 100,
  },
  optionsIcon: {
    height: '100%',
    width: 20 * scaleFactor,
    fontSize: 7 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  noteIcon: {
    height: '100%',
    width: 22 * scaleFactor,
    fontSize: 8 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#007aff',
  },
  backIcon: {
    height: '100%',
    width: 22 * scaleFactor,
    fontSize: 15 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
  },
   shareButtonText: {
     height: '100%',
     width: 32 * scaleFactor,
     fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
     fontSize: 6 * scaleFactor,
     textAlign: 'center',
     textAlignVertical: 'center',
     color: '#007aff',
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
    color: '#212121',
  },
  iconFocused: {
    color: '#007aff'
  }
})
