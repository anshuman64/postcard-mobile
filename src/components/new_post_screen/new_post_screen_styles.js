// Library Imports
import React                       from 'react';
import RN from 'react-native';


//--------------------------------------------------------------------//


export const scaleFactor = RN.PixelRatio.get();

export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa'
  },
  textInput: {
    flex: 1,
    width: '100%',
    textAlignVertical: 'top',
    fontSize: 8 * scaleFactor,
    padding: 7 * scaleFactor,
  },
});
