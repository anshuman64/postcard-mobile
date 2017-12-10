// Library Imports
import React                       from 'react';
import * as RN from 'react-native';


//--------------------------------------------------------------------//


export const scaleFactor = RN.PixelRatio.get();

export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
    paddingLeft: '8%',
    paddingTop: '1%'
  },
  menuItemView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 20 * scaleFactor,
  },
  menuItemIcon: {
    height: 20 * scaleFactor,
    fontSize: 10 * scaleFactor,
    textAlignVertical: 'center',
    marginRight: '7%',
    color: '#212121'
  },
  menuItemText: {
    height: 20 * scaleFactor,
    fontSize: 6.5 * scaleFactor,
    textAlignVertical: 'center',
    color: '#212121'
  },
  highlight: {
    color: '#007aff'
  },
});
