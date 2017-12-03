// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View }   from 'react-native';
import { connect }                          from 'react-redux';

// Local Imports
import { toNewPostScreen }                  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

class MyPostsTab extends React.Component {
  render() {
    return (
      <View>
        <Text>My Posts Screen</Text>
        <Button title={'To NewPost Screen'} onPress={() => this.props.navigation.dispatch(toNewPostScreen())} />
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default MyPostsTab;
