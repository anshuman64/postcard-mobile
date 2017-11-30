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
    width: '100%',
    height: 22 * scaleFactor,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  backText: {
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  headerTitleText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleText: {
    fontFamily: 'System',
    fontSize: 7.4 * scaleFactor,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121'
  },
  subtitleText: {
    fontFamily: 'System',
    fontSize: 6 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
    marginTop: '1%'
  },
  codeInput: {
    width: 60 * scaleFactor,
    textAlign: 'center',
    fontSize: 10 * scaleFactor,
    borderBottomColor: '#212121',
    borderBottomWidth: 0.3 * scaleFactor,
  },
  borderHighlighted: {
    borderBottomColor: '#007aff',
    borderBottomWidth: 0.6 * scaleFactor
  },
  resendSMSView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120 * scaleFactor,
    height: 15 * scaleFactor,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#212121',
    borderBottomWidth: 0.3 * scaleFactor,
  },
  resendSMSText: {
    height: 15 * scaleFactor,
    fontSize: 7 * scaleFactor,
    color: '#bdbdbd',
  }
});
