// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility  from '../../utilities/style_utility';
import { DEFAULT_MARGIN } from '../post_list_item/post_list_item_styles';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediumContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DEFAULT_MARGIN
  },
});
