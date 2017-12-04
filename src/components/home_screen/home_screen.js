// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View }   from 'react-native';
import { connect }                          from 'react-redux';

// Local Imports
import { toNewPostScreen }                  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Home Screen</Text>
        <Button title={'To NewPost Screen'} onPress={() => this.props.navigation.dispatch(toNewPostScreen())} />
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
