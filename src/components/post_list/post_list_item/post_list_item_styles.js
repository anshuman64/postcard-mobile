// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../../utilities/style_utility.js';


//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 13;

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
  frame: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  userIcon: {
    fontSize: 24,
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
    marginRight: 8,
    marginLeft: 2
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: StyleUtility.getImageBorderRadius(40),
  },
  usernameView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
  },
  closeOrFlagButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
    width: 80,
  },
  closeIcon: {
    fontSize: 20,
    color: StyleUtility.COLORS.grey900,
    marginRight: 18
  },
  flagIcon: {
    fontSize: StyleUtility.scaleFont(28),
    color: StyleUtility.COLORS.grey700,
    marginRight: 18
  },
  bodyText: {
    width: StyleUtility.getUsableDimensions().width - DEFAULT_MARGIN * 2,
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: 18,
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
    marginLeft: DEFAULT_MARGIN,
    marginRight: DEFAULT_MARGIN,
    marginTop: DEFAULT_MARGIN,
  },
  smallBodyText: {
    fontSize: 15,
  },
  bodyImageView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyImage: {
    height: StyleUtility.getUsableDimensions().width,
    width: StyleUtility.getUsableDimensions().width,
    marginTop: DEFAULT_MARGIN,
    zIndex: 1,
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
  }
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
