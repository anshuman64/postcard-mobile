// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View }   from 'react-native';
import { connect }                          from 'react-redux';

// Local Imports
import { toBackScreen }                     from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

class NewPostScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>NewPost Screen</Text>
        <Button title={'Go Back'} onPress={() => this.props.navigation.dispatch(toBackScreen())} />
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
