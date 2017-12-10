// Library Imports
import React                                 from 'react';
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
    backgroundColor: '#fafafa',
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 2 * scaleFactor,
    paddingRight: 2 * scaleFactor,
    paddingTop: 2 * scaleFactor,
    backgroundColor: '#fafafa',
  },
  body: {
    width: '100%',
    padding: 8 * scaleFactor,
    backgroundColor: '#ffffff',
    // borderColor: '#656565',
    // borderWidth: 0.1 * scaleFactor,
  },
  dateText: {
    alignSelf: 'flex-end',
    textAlign: 'left',
    textAlignVertical: 'center',
    marginBottom: 5 * scaleFactor
  },
  bodyText: {
    width: '100%',
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: 6 * scaleFactor,
    textAlign: 'left',
    textAlignVertical: 'center',
    marginBottom: 5 * scaleFactor
  },
  largeBodyText: {
    fontSize: 8 * scaleFactor,
  },
  detailsView: {
    flexDirection: 'row',
    width: '100%'
  },
  heartIcon: {
    fontSize: 9 * scaleFactor,
    marginRight: 4 * scaleFactor,
    color: '#007aff'
  },
  likeCountText: {
    fontSize: 6 * scaleFactor,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  activityIndicator: {
    marginTop: 8 * scaleFactor,
    marginBottom: 8 * scaleFactor,
  }
});
