// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 270,
    backgroundColor: 'white',
    borderBottomColor: StyleUtility.COLORS.grey300,
    borderBottomWidth: (RN.Platform.OS === 'ios') ? 1 : 0,
    elevation: 2,
  },
  frame: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    borderWidth: 2,
    borderColor: StyleUtility.COLORS.grey900,
    borderRadius: 200 / 2,
    marginBottom: 10,
  },
  placeholderImage: {
    fontSize: StyleUtility.scaleFont(40),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  },
  image: {
    width: 150,
    height: 150,
  },
  usernameButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 200,
    marginBottom: 20,
  },
  usernameText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Regular',
    fontWeight: '400',
    fontSize: StyleUtility.scaleFont(20),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
    left: 10
  },
  pencil: {
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
    marginLeft: 15,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 30,
    backgroundColor: 'white',
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 30,
  },
  text: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey600,
    marginBottom: 5,
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue,
  }
})
