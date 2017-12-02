// Library Imports
import React                       from 'react';
import { StyleSheet, PixelRatio }  from 'react-native';


//--------------------------------------------------------------------//


export const scaleFactor = PixelRatio.get();

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 22 * scaleFactor,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  backIcon: {
    height: 22 * scaleFactor,
    width: 22 * scaleFactor,
    fontSize: 18 * scaleFactor,
    textAlign: 'left',
    textAlignVertical: 'center',
    marginLeft: 6 * scaleFactor,
    color: '#212121',
  },
  textHighlighted: {
   color: '#007aff',
 },
  postButtonText: {
    height: 22 * scaleFactor,
    width: 22 * scaleFactor,
    fontSize: 6 * scaleFactor,
    textAlign: 'right',
    textAlignVertical: 'center',
    marginRight: 8 * scaleFactor,
    color: '#007aff',
  },
  textInput: {
    flex: 1,
    width: '100%',
    textAlignVertical: 'top',
    fontSize: 8 * scaleFactor,
  },
});
