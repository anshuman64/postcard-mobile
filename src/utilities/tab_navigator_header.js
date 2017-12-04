// Library Imports
import React                                from 'react';
import { PixelRatio, Button, StyleSheet, Text, View, TouchableWithoutFeedback }   from 'react-native';
import { connect }                          from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// Local Imports
import { toHomeScreen, toMyPostsTab }  from '../actions/navigation_actions.js';


//--------------------------------------------------------------------//

class TabNavigatorHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHomeIconPressed: false,
      isUserIconPressed: false,
    };
  }

  // Callback function for setting state in animation frame; recommended by React Native docs for animations
  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  _onPressHome() {
    this.props.navigation.dispatch(toHomeScreen());
  }

  _onPressUser() {
    this.props.navigation.dispatch(toMyPostsTab());
  }

  render() {
    return (
      <View style={[styles.container]}>
        <TouchableWithoutFeedback
          onPressIn={this._setStateInAnimationFrame({ isHomeIconPressed: true})}
          onPressOut={this._setStateInAnimationFrame({ isHomeIconPressed: false})}
          onPress={() => this._onPressHome()}
          >
          <Icon name='home' style={[styles.icon, this.props.navigation.state.routeName === 'HomeScreen' ? styles.iconHighlighted : '']} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPressIn={this._setStateInAnimationFrame({ isUserIconPressed: true})}
          onPressOut={this._setStateInAnimationFrame({ isUserIconPressed: false})}
          onPress={() => this._onPressUser()}
          >
          <Icon name='user' style={[styles.icon, this.state.isUserIconPressed && styles.iconHighlighted]} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

//--------------------------------------------------------------------//


export const scaleFactor = PixelRatio.get();

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 22 * scaleFactor,
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  icon: {
    height: 22 * scaleFactor,
    fontSize: 9 * scaleFactor,
    width: '50%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#222222',
  },
  iconHighlighted: {
    color: '#007aff'
  }
});

export default TabNavigatorHeader;
