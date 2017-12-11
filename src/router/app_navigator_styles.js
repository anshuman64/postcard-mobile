// Library Imports
import React                                 from 'react';
import { Platform, StyleSheet }  from 'react-native';

// Local Imports
import { scale, scaleFont } from '../utilities/style_utility.js';


//--------------------------------------------------------------------//


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
    width: scale(100),
  },
  optionsIcon: {
    height: '100%',
    width: scale(20),
    fontSize: scaleFont(7),
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  noteIcon: {
    height: '100%',
    width: scale(22),
    fontSize: scaleFont(8),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#007aff',
  },
  backIcon: {
    height: '100%',
    width: scale(22),
    fontSize: scaleFont(15),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
  },
   shareButtonText: {
     height: '100%',
     width: scale(32),
     fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
     fontSize: scaleFont(6),
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
    fontSize: scaleFont(8),
    color: '#212121',
  },
  iconFocused: {
    color: '#007aff'
  }
})
