// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const DEFAULT_MARGIN = 13;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: StyleUtility.COLORS.grey50,
  },
  postContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: StyleUtility.getUsableDimensions().width,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 4,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      x: 0,
      y: 0
    }
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: DEFAULT_MARGIN,
  },
  userView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: DEFAULT_MARGIN,
  },
  usernameView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeOrFlagButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    width: 50,
  },
  closeIcon: {
    fontSize: StyleUtility.scaleFont(21),
    color: StyleUtility.COLORS.grey700,
    marginLeft: 10
  },
  flagIcon: {
    fontSize: StyleUtility.scaleFont(16),
    color: StyleUtility.COLORS.grey700,
    marginLeft: 10,
    marginTop: 1
  },
  shareButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
    width: 50,
  },
  shareIcon: {
    fontSize: StyleUtility.scaleFont(17.5),
    color: StyleUtility.COLORS.grey700,
    marginRight: 5
  },
  bodyView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  bodyTextView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: DEFAULT_MARGIN,
    marginRight: DEFAULT_MARGIN,
    marginTop: DEFAULT_MARGIN,
  },
  bodyText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: 18,
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
  },
  smallBodyText: {
    fontSize: 15,
  },
  mediumContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DEFAULT_MARGIN
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  likesView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  heartIcon: {
    fontSize: StyleUtility.scaleFont(28),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
    marginLeft: DEFAULT_MARGIN,
    marginRight: 8
  },
  likeCountText: {
    fontSize: 15,
    textAlign: 'left',
    color: StyleUtility.COLORS.grey600
  },
  dateText: {
    textAlign: 'right',
    fontSize: 14,
    color: StyleUtility.COLORS.grey400,
    marginRight: 18
  },
  playIcon: {
    fontSize: StyleUtility.scaleFont(8),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
    marginTop: 1
  },
});

export const scaleHeart = {
  0: {
    scale: 0.3
  },
  0.5: {
    scale: 1.2
  },
  1: {
    scale: 1
  }
}
