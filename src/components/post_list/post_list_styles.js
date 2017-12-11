// Library Imports
import React                     from 'react';
import { Platform, StyleSheet }  from 'react-native';

// Local Imports
import { scale, scaleFont } from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
  },
  postList: {
    width: '100%',
    height: '100%'
  },
  activityIndicator: {
    marginTop: scale(8),
    marginBottom: scale(8),
  }
});
