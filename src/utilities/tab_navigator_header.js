// Library Imports
import React                                from 'react';
import { PixelRatio, Button, StyleSheet, Text, View, TouchableWithoutFeedback }   from 'react-native';
import { connect }                          from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// Local Imports

//--------------------------------------------------------------------//

class TabNavigatorHeader extends React.Component {


  render() {
    return (
      <View style={[styles.headerView]}>
        <Icon name='home' style={[styles.headerIcon, styles.headerIconPeople]} />
        <Icon name='user' style={[styles.headerIcon, styles.headerIconUser]} />
      </View>
    )
  }
}

//--------------------------------------------------------------------//


export const scaleFactor = PixelRatio.get();

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
    paddingLeft: '8%',
    paddingTop: '1%'
  },
  menuItemView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 20 * scaleFactor,
  },
  menuItemIcon: {
    height: 20 * scaleFactor,
    fontSize: 12 * scaleFactor,
    textAlignVertical: 'center',
    marginRight: '7%',
    color: '#212121'
  },
  menuItemText: {
    height: 20 * scaleFactor,
    fontSize: 6.5 * scaleFactor,
    textAlignVertical: 'center',
    color: '#212121'
  },
  logo: {
    width: 70 * scaleFactor,
    height: 70 * scaleFactor
  },
  highlight: {
    color: '#007aff'
  },

  headerView: {
    flexDirection: 'row',
    width: '100%',
    height: 22 * scaleFactor,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  headerIcon: {
    height: 22 * scaleFactor,
    fontSize: 8 * scaleFactor,
    textAlignVertical: 'center',
    color: '#212121',
  },
  headerIconPeople: {
    width: '46%',
    textAlign: 'center',
    marginLeft: '2.5%'
  },
  headerIconUser: {
    width: '46%',
    textAlign: 'center',
    marginRight: '2.5%'
  },
  headerIconMenu: {
    width: '8%',
    textAlign: 'center',
    marginRight: '3%',
    marginLeft: '3%',
  },
});

export default TabNavigatorHeader;
