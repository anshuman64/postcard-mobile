// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont } from '../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: scale(100),
    backgroundColor: '#fafafa'
  },
});
