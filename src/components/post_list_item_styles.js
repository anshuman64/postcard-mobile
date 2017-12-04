// Library Imports
import React                       from 'react';
import { StyleSheet, PixelRatio }  from 'react-native';


//--------------------------------------------------------------------//


export const scaleFactor = PixelRatio.get();

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 5 * scaleFactor,
    paddingRight: 5 * scaleFactor,
    paddingTop: 5 * scaleFactor,
    backgroundColor: '#fafafa',
  },
  body: {
    width: '100%',
    padding: 5 * scaleFactor,
    backgroundColor: '#ffffff',
    // borderColor: '#656565',
    // borderWidth: 0.1 * scaleFactor,
  },
  text: {
    width: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  detailsView: {
    flexDirection: 'row',
    width: '100%'
  },
  icon: {
    fontSize: 7 * scaleFactor,
  },
  likeCountText: {
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  dateText: {
    textAlign: 'left',
    textAlignVertical: 'center',
  }
});
