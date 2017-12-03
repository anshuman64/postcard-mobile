// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View, TouchableWithoutFeedback }   from 'react-native';
import { connect }                          from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// Local Imports
import { styles, scaleFactor }                     from './posts_screen_styles.js';
import { toAllPostsTab, toMyPostsTab, toMenuTab }  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

class TabNavigatorHeader extends React.Component {


  render() {
    return (
      <View style={[styles.headerView]}>
        <Icon name='people' style={[styles.headerIcon, styles.headerIconPeople]} />
        <Icon name='user' style={[styles.headerIcon, styles.headerIconUser]} />
        <Icon name='menu' style={[styles.headerIcon, styles.headerIconMenu]} />
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default TabNavigatorHeader;
